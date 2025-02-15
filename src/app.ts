/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/bicycle/bicycle.route';
import { orderRoutes } from './app/modules/order/order.route';
import globalErrorHandler from './app/middlewares/gobalErrorHandler';
import { UserRoutes } from './app/modules/User/user.route';
import { CustomerRoutes } from './app/modules/customer/customer.route';
import { AdminRoutes } from './app/modules/Admin/admin.route';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

//applications routes
app.use('/api/products', BicycleRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/customer', CustomerRoutes);
app.use('/api/admins',AdminRoutes);
app.use('/api/auth',AuthRoutes);
app.get('/', (req: Request, res: Response) => {

  res.send("running server ");
});


app.use(globalErrorHandler);

export default app;
