import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicyleRoutes } from './app/modules/bicyle/bicyle.route';
import { orderRoutes } from './app/modules/order/order.route';

const app: Application = express();

//parsers
app.use(express.json());

app.use(cors());

//applications routes
app.use('/api/products', BicyleRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {

  res.send("running server ");
});

export default app;
