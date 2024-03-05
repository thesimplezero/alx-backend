import express from 'express';
import { promisify } from 'util';
import { createQueue } from 'kue';
import { createClient } from 'redis';

// Initialize Express app, Redis client, and Kue queue
const app = express();
const client = createClient({ name: 'reserve_seat' });
const queue = createQueue();
const INITIAL_SEATS_COUNT = 50;
let reservationEnabled = false;
const PORT = 1245;

/**
 * Reserves a specific number of seats.
 * @param {number} number - The number of seats to reserve.
 * @returns {Promise} A promise that resolves with the Redis SET operation.
 */
const reserveSeat = async (number) => {
  return promisify(client.SET).bind(client)('available_seats', number);
};

/**
 * Retrieves the current number of available seats.
 * @returns {Promise<number>} A promise that resolves with the number of available seats.
 */
const getCurrentAvailableSeats = async () => {
  return promisify(client.GET).bind(client)('available_seats');
};

// Endpoint to get the current number of available seats
app.get('/available_seats', (_, res) => {
  getCurrentAvailableSeats()
    .then((numberOfAvailableSeats) => {
      res.json({ numberOfAvailableSeats });
    });
});

// Endpoint to initiate a seat reservation
app.get('/reserve_seat', (_req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }
  try {
    const job = queue.create('reserve_seat');

    // Event listeners for job status
    job.on('failed', (err) => {
      console.log('Seat reservation job', job.id, 'failed:', err.message || err.toString());
    });
    job.on('complete', () => {
      console.log('Seat reservation job', job.id, 'completed');
    });
    job.save();
    res.json({ status: 'Reservation in process' });
  } catch {
    res.json({ status: 'Reservation failed' });
  }
});

// Endpoint to process the queue and update seat reservations
app.get('/process', (_req, res) => {
  res.json({ status: 'Queue processing' });
  queue.process('reserve_seat', (_job, done) => {
    getCurrentAvailableSeats()
      .then((result) => Number.parseInt(result || 0))
      .then((availableSeats) => {
        reservationEnabled = availableSeats <= 1 ? false : reservationEnabled;
        if (availableSeats >= 1) {
          reserveSeat(availableSeats - 1).then(() => done());
        } else {
          done(new Error('Not enough seats available'));
        }
      });
  });
});

/**
 * Resets the available seats to the initial count.
 * @param {number} initialSeatsCount - The initial number of seats to set.
 * @returns {Promise} A promise that resolves when the seats are reset.
 */
const resetAvailableSeats = async (initialSeatsCount) => {
  return promisify(client.SET).bind(client)('available_seats', Number.parseInt(initialSeatsCount));
};

// Start the server and reset available seats to the initial count
app.listen(PORT, () => {
  resetAvailableSeats(process.env.INITIAL_SEATS_COUNT || INITIAL_SEATS_COUNT)
    .then(() => {
      reservationEnabled = true;
      console.log(`API available on localhost port ${PORT}`);
    });
});

export default app;
