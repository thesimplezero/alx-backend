import { createClient } from 'redis'; // Corrected to single import statement
import { promisify } from 'util';

const client = createClient();

// Handle connection status
client.on('connect', () => console.log('Redis client connected'));
client.on('error', (err) => console.log(`Connection error: ${err}`));

/**
 * Sets a new school in Redis and logs the operation's result.
 * @param {string} key - The key representing the school's name.
 * @param {string} value - The value to be assigned.
 */
function setNewSchool(key, value) {
  client.set(key, value, redis.print); // Leveraging redis.print directly
}

/**
 * Displays the value of a given key asynchronously.
 * @param {string} key - The key to retrieve the value for.
 */
async function displaySchoolValue(key) {
  const getAsync = promisify(client.get).bind(client); // Promisify the get method
  try {
    const value = await getAsync(key); // Await the promise resolution
    console.log(value);
  } catch (err) {
    console.error(err); // Proper error handling
  }
}

// Demonstrate functionality
(async () => {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
})();
