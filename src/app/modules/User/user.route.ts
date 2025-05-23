/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { createAdminValidationSchema } from '../Admin/admin.validation';

import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { upload } from '../../utils/sendImageToCloudinary';
import { createCustomerValidationSchema } from '../customer/customer.validation';

const router = express.Router();

router.post(
  '/create-customer',

  validateRequest(createCustomerValidationSchema),
  UserControllers.createCustomer,
);

router.post(
  '/create-admin',

  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.get(
  '/me/:email',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  UserControllers.getMe,
);

router.patch(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.get('/all', auth(USER_ROLE.admin), UserControllers.getAllUsers);

export const UserRoutes = router;
