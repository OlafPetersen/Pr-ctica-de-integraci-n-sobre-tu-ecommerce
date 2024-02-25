const express = import('express');
const router = express.Router();
const Cart = import('../models/cart');
const Product = import('../models/product');

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products');
    res.json(cart);
});

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter(product => product._id.toString() !== pid);
    await cart.save();
    res.json({ status: 'success', message: 'Product removed from cart' });
});

// PUT /api/carts/:cid
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await Cart.findById(cid);
    cart.products = products;
    await cart.save();
    res.json({ status: 'success', message: 'Cart updated' });
});

// PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);
    const product = cart.products.find(product => product._id.toString() === pid);
    product.quantity = quantity;
    await cart.save();
    res.json({ status: 'success', message: 'Product quantity updated' });
});

// DELETE /api/carts/:cid
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    cart.products = [];
    await cart.save();
    res.json({ status: 'success', message: 'All products removed from cart' });
});

module.exports = router;

