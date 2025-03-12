import express, { NextFunction, Request, Response } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { bicycleValidation } from './bicycle.validation';
import { BicycleControllers } from './bicycle.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

// will call controller function

router.post(
  '/',
  upload.single('file'),
  auth(USER_ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(bicycleValidation.createBicycleValidationSchema),
  BicycleControllers.createBicycle,
);
router.get('/brands', BicycleControllers.getBrands);
router.get('/', BicycleControllers.getAllBicycle);
router.get('/:productId', BicycleControllers.getSpecificByBicycle);
router.put(
  '/:productId',
  // upload.single('file'),
  auth(USER_ROLE.admin),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  BicycleControllers.updateSpecificByBicycle,
);
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  BicycleControllers.deleteSpecificBicycle,
);

export const BicycleRoutes = router;
