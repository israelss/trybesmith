import express from 'express';
import productRoutes from './routes/product';
import userRoutes from './routes/user';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);

export default app;
