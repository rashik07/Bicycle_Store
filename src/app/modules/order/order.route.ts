import express from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

// will call controller function

router.post('/', OrderControllers.createOrder);
router.get('/revenue', OrderControllers.getTotalRevenue);
router.get('/verify/:paymentId', OrderControllers.verifyPayment);
router.get('/', auth(USER_ROLE.admin), OrderControllers.getAllOrders);
router.get(
    '/my-orders/:email',
    auth(USER_ROLE.customer, USER_ROLE.admin),
    OrderControllers.getMyOrders,
  );
export const orderRoutes = router;
