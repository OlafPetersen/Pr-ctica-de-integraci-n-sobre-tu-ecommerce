const express = import('express');
const router = express.Router();
const Product = import('../models/product');

// GET /api/products
router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { price: sort === 'desc' ? -1 : 1 },
    };
    const filter = query ? { category: query } : {};

    try {
        const products = await Product.paginate(filter, options);
        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/products?page=${products.page - 1}` : null,
            nextLink: products.hasNextPage ? `/products?page=${products.page + 1}` : null,
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Otros endpoints de productos aquí...

module.exports = router;

