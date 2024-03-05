import { createClient } from 'redis'; // Use ES6 import exclusively

const client = createClient();

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Subscribe to a Redis channel
client.subscribe('holberton school channel');

/**
 * Handles incoming messages from the subscribed channel.
 * Unsubscribes and quits client on receiving 'KILL_SERVER'.
 */
client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  }
});
