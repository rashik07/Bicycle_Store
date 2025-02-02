import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/bicycle/bicycle.route';
import { orderRoutes } from './app/modules/order/order.route';
import globalErrorHandler from './app/middlewares/gobalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());

app.use(cors());

//applications routes
app.use('/api/products', BicycleRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {

  res.send("running server ");
});


app.use(globalErrorHandler);

export default app;
