import express from 'express';
import productManager from '../managers/productManager.js';

const router = express.Router();

router.get('/', (req, res) => {
  const products = productManager.getAllProducts();
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(pid);
  res.json(product);
});

router.post('/', (req, res) => {
  const product = req.body;
  const newProduct = productManager.addProduct(product);
  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  const product = productManager.updateProduct(pid, updatedProduct);
  res.json(product);
});

router.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  productManager.deleteProduct(pid);
  res.sendStatus(204);
});

export default router;
