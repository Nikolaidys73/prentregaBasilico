import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFile = path.join(__dirname, '../data/productos.json');

const getAllProducts = () => {
  const productsData = fs.readFileSync(productsFile, 'utf8');
  return JSON.parse(productsData);
};

const getProductById = (pid) => {
  const products = getAllProducts();
  return products.find((product) => product.id === pid);
};

const addProduct = (product) => {
  const products = getAllProducts();
  const newProduct = { ...product, id: generateId() };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

const updateProduct = (pid, updatedProduct) => {
  const products = getAllProducts();
  const productIndex = products.findIndex((product) => product.id === pid);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    saveProducts(products);
    return products[productIndex];
  }
  return null;
};

const deleteProduct = (pid) => {
  const products = getAllProducts();
  const updatedProducts = products.filter((product) => product.id !== pid);
  saveProducts(updatedProducts);
};

const generateId = () => {
  const products = getAllProducts();
  const ids = products.map((product) => product.id);
  let newId;
  do {
    newId = Math.floor(Math.random() * 1000);
  } while (ids.includes(newId));
  return newId;
};

const saveProducts = (products) => {
  const productsData = JSON.stringify(products, null, 2);
  fs.writeFileSync(productsFile, productsData);
};

const productManager = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

export default productManager;
