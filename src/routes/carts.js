import express from 'express';
import cartManager from '../managers/cartManager.js';

const router = express.Router();

router.post('/', (req, res) => {
  const cart = cartManager.createCart();
  res.status(201).json(cart);
});

router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = cartManager.getCartById(cid);
  res.json(cart);
});

router.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity;
  const cart = cartManager.addProductToCart(cid, pid, quantity);
  res.json(cart);
});

export default router;
