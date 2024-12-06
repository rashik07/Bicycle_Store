import express from 'express';
import { BicyleControllers } from './bicyle.controller';


const router = express.Router();

// will call controller function

router.post('/', BicyleControllers.createBicyle);
router.get('/', BicyleControllers.getAllBicyle);
router.get('/:productId', BicyleControllers.getSpecificByBicyle);
router.put('/:productId', BicyleControllers.updateSpecificByBicyle);
router.delete('/:productId', BicyleControllers.deleteSpecificBicyle);

export const BicyleRoutes = router;
