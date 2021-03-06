import express from 'express';
import loginRoutes from './routes/login';
import orderRoutes from './routes/order';
import productRoutes from './routes/product';
import userRoutes from './routes/user';

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

export default app;
