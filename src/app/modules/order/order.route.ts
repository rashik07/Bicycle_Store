import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// will call controller function

router.post('/', OrderControllers.createOrder);
router.get('/revenue', OrderControllers.getTotalRevenue);


export const orderRoutes = router;
