// Import necessary modules for the web server and Redis client
import express from 'express';
import { promisify } from 'util';
import { createClient } from 'redis';

// Define an array of product items with their details
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

/**
 * Retrieves a product item by its ID.
 * @param {number} id - The ID of the item to find.
 * @returns {object|null} The found item object or null if not found.
 */
const getItemById = (id) => listProducts.find(obj => obj.itemId === id) || null;

const app = express();
const client = createClient(); // Initialize Redis client
const PORT = 1245; // Port number for the API server

/**
 * Reserves stock for an item by its ID in Redis.
 * @param {number} itemId - The ID of the item.
 * @param {number} stock - The amount of stock to reserve.
 * @returns {Promise} A promise that resolves to the result of the Redis SET operation.
 */
const reserveStockById = async (itemId, stock) => {
  return promisify(client.SET).bind(client)(`item.${itemId}`, stock);
};

/**
 * Retrieves the current reserved stock amount for an item by its ID from Redis.
 * @param {number} itemId - The ID of the item.
 * @returns {Promise<number>} A promise that resolves to the current stock amount.
 */
const getCurrentReservedStockById = async (itemId) => {
  return promisify(client.GET).bind(client)(`item.${itemId}`);
};

// Endpoint to list all products
app.get('/list_products', (_, res) => {
  res.json(listProducts);
});

// Endpoint to get details of a specific product by its ID, including current stock
app.get('/list_products/:itemId(\\d+)', (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const productItem = getItemById(itemId);

  if (!productItem) {
    res.status(404).json({ status: 'Product not found' });
    return;
  }

  getCurrentReservedStockById(itemId)
    .then((result) => Number.parseInt(result || 0))
    .then((reservedStock) => {
      productItem.currentQuantity = productItem.initialAvailableQuantity - reservedStock;
      res.json(productItem);
    });
});

// Endpoint to reserve a product by its ID
app.get('/reserve_product/:itemId', (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const productItem = getItemById(itemId);

  if (!productItem) {
    res.status(404).json({ status: 'Product not found' });
    return;
  }

  getCurrentReservedStockById(itemId)
    .then((result) => Number.parseInt(result || 0))
    .then((reservedStock) => {
      if (reservedStock >= productItem.initialAvailableQuantity) {
        res.status(400).json({ status: 'Not enough stock available', itemId });
        return;
      }

      reserveStockById(itemId, reservedStock + 1)
        .then(() => {
          res.json({ status: 'Reservation confirmed', itemId });
        });
    });
});

/**
 * Resets the stock for all products in Redis.
 * @returns {Promise} A promise that resolves when all stocks are reset.
 */
const resetProductsStock = () => {
  return Promise.all(listProducts.map(item => reserveStockById(item.itemId, 0)));
};

// Start the server and reset product stocks
app.listen(PORT, () => {
  resetProductsStock().then(() => console.log(`API available on localhost port ${PORT}`));
});

export default app;
