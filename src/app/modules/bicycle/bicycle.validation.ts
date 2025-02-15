import { z } from 'zod';

const createBicycleValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    brand: z.string().min(1, "Brand is required"),
    price: z.number().min(0, "Price must be a positive number"),
    type: z.enum(["Mountain", "Road", "Hybrid", "BMX", "Electric"]),
    description: z.string().optional(),

    quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
    inStock: z.boolean(),
  }),
});


export const bicycleValidation = {
  createBicycleValidationSchema,
};