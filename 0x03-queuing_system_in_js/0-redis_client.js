import redis from 'redis'; // Use default export

const client = redis.createClient();

// Event: Client successfully connected to Redis
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event: Error during Redis connection
client.on('error', (err) => {
  console.error('Redis client not connected to the server:', err); // Use console.error for visibility
});
