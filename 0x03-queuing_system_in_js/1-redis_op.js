import { createClient } from 'redis'; // Use redis to create a client

const client = createClient(); // Initialize Redis client

// Event listeners for client connection status
client.on('connect', () => console.log('Redis client connected'));
client.on('error', (err) => console.log(`Connection error: ${err}`));

/**
 * Sets a new school in Redis.
 * @param {string} key - The school's name as the key.
 * @param {string} value - The value to assign to the key.
 */
function setNewSchool(key, value) {
  client.set(key, value, redis.print); // Set key-value and print response
}

/**
 * Displays the value of a school from Redis.
 * @param {string} key - The school's name as the key.
 */
function displaySchoolValue(key) {
  client.get(key, (err, reply) => console.log(reply)); // Get and log value
}

// Example usage
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
