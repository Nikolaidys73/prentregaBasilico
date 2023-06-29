import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartsFile = path.join(__dirname, '../data/carrito.json');

const createCart = () => {
  const newCart = { id: generateId(), products: [] };
  saveCart(newCart);
  return newCart;
};

const getCartById = (cid) => {
  const carts = getAllCarts();
  return carts.find((cart) => cart.id === cid);
};

const addProductToCart = (cid, pid, quantity) => {
  const carts = getAllCarts();
  const cartIndex = carts.findIndex((cart) => cart.id === cid);
  const product = { product: pid, quantity: quantity };
  if (cartIndex !== -1) {
    const cart = carts[cartIndex];
    const existingProductIndex = cart.products.findIndex(
      (p) => p.product === pid
    );
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push(product);
    }
    saveCarts(carts);
    return cart;
  }
  return null;
};

const generateId = () => {
  const carts = getAllCarts();
  const ids = carts.map((cart) => cart.id);
  let newId;
  do {
    newId = Math.floor(Math.random() * 1000);
  } while (ids.includes(newId));
  return newId;
};

const getAllCarts = () => {
  const cartsData = fs.readFileSync(cartsFile, 'utf8');
  return JSON.parse(cartsData);
};

const saveCarts = (carts) => {
  const cartsData = JSON.stringify(carts, null, 2);
  fs.writeFileSync(cartsFile, cartsData);
};

const saveCart = (cart) => {
  const carts = getAllCarts();
  carts.push(cart);
  saveCarts(carts);
};

const cartManager = {
  createCart,
  getCartById,
  addProductToCart,
};

export default cartManager;
