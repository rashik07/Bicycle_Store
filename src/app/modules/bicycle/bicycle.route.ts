import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { bicycleValidation } from './bicycle.validation';
import { BicycleControllers } from './bicycle.controller';


const router = express.Router();

// will call controller function

router.post('/', validateRequest(bicycleValidation.createBicycleValidationSchema), BicycleControllers.createBicycle);
router.get('/', BicycleControllers.getAllBicycle);
router.get('/:productId', BicycleControllers.getSpecificByBicycle);
router.put('/:productId', BicycleControllers.updateSpecificByBicycle);
router.delete('/:productId', BicycleControllers.deleteSpecificBicycle);

export const BicycleRoutes = router;
