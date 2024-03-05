import { createClient } from 'redis'; // Use ES6 imports for consistency

const client = createClient();

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

/**
 * Publishes a message to a Redis channel after a delay.
 * @param {string} message - The message to publish.
 * @param {number} time - The delay in milliseconds before publishing.
 */
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send: ${message}`);
    client.publish('holberton school channel', message);
  }, time);
}

// Example usage
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
