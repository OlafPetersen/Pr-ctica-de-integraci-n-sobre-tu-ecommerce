const express = import('express');
const mongoose = import('mongoose');
const productRoutes = import('./routes/products');
const cartRoutes = import('./routes/carts');
const path = import('path');
const ejs = import('ejs');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));