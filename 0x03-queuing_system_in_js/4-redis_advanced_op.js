import { createClient } from 'redis'; // Standardized to ES6 import

const client = createClient();

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

/**
 * Updates a hash value in Redis.
 * @param {string} hashName - The name of the hash.
 * @param {string} fieldName - The field name within the hash.
 * @param {string|number} value - The value to set for the field.
 */
const updateHash = (hashName, fieldName, value) => {
  client.hset(hashName, fieldName, value, (err, res) => {
    if (err) console.log(err);
    else console.log(`Set ${fieldName}: ${res}`);
  });
};

/**
 * Prints the entire hash stored in Redis.
 * @param {string} hashName - The name of the hash to print.
 */
const printHash = (hashName) => {
  client.hgetall(hashName, (err, res) => {
    if (err) console.log(err);
    else console.log(res);
  });
};

// Example object with city data
const cities = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
};

// Update and print the hash
Object.entries(cities).forEach(([city, population]) => {
  updateHash('HolbertonSchools', city, population);
});

printHash('HolbertonSchools');
