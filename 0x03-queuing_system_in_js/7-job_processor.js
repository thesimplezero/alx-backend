import { createQueue } from 'kue'; // Import necessary functions from the kue library

const queue = createQueue(); // Initialize the queue to process jobs

// Define a list of blacklisted phone numbers
const blacklist = ['4153518780', '4153518781'];

/**
 * Simulates sending a notification.
 * @param {string} phoneNumber - The recipient's phone number.
 * @param {string} message - The message to be sent.
 * @param {Object} job - The job object from the queue.
 * @param {function} done - Callback to indicate job completion.
 */
const sendNotification = (phoneNumber, message, job, done) => {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done(); // Mark the job as completed
};

/**
 * Process jobs from the queue with concurrency of 2.
 */
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data; // Destructure job data

  // Check if the phone number is blacklisted
  if (blacklist.includes(phoneNumber)) {
    // If blacklisted, terminate the job with an error
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Send notification if the phone number is not blacklisted
  sendNotification(phoneNumber, message, job, done);
});
