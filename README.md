# Bicycle Store - E-commerce Platform

This is a full-stack e-commerce application for managing and selling bicycles. The platform includes features for user authentication, product management, order processing, and payment integration.

## Features

- **User Management**: Admins and customers can register, log in, and manage their accounts.
- **Product Management**: Admins can add, update, and delete bicycles. Customers can view available bicycles.
- **Order Management**: Customers can place orders, and admins can manage orders.
- **Payment Integration**: Integrated with ShurjoPay for secure payment processing.
- **Error Handling**: Centralized error handling for better debugging and user feedback.
- **Image Upload**: Cloudinary integration for uploading and managing product images.

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod for schema validation
- **Payment Gateway**: ShurjoPay
- **Image Upload**: Cloudinary
- **Environment Management**: dotenv

## Project Structure

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/bicycle-store.git
   cd bicycle-store

2. Install dependencies:

    npm install

3. Set up environment variables:

    Copy .env.example to .env and update the values as needed.

4. Start the development server:
   npm run start:dev

API Endpoints
Authentication
POST /api/auth/login: Log in a user.
POST /api/auth/change-password: Change user password.
POST /api/auth/refresh-token: Refresh access token.
Users
POST /api/users/create-customer: Create a new customer.
POST /api/users/create-admin: Create a new admin.
GET /api/users/me/:email: Get user details.
PATCH /api/users/change-status/:id: Change user status.
Products
POST /api/products: Add a new bicycle (Admin only).
GET /api/products: Get all bicycles.
GET /api/products/:productId: Get a specific bicycle.
PUT /api/products/:productId: Update a bicycle (Admin only).
DELETE /api/products/:productId: Delete a bicycle (Admin only).
Orders
POST /api/orders: Create a new order.
GET /api/orders: Get all orders (Admin only).
GET /api/orders/my-orders/:email: Get orders for a specific user.
DELETE /api/orders/:orderId: Delete an order (Admin only).

Environment Variables
The following environment variables are required:

NODE_ENV=development
PORT=5000
DATABASE_URL=<your-mongodb-connection-string>
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=<your-access-token-secret>
JWT_REFRESH_SECRET=<your-refresh-token-secret>
JWT_ACCESS_EXPIRES_IN=25d
JWT_REFRESH_EXPIRES_IN=25d
RESET_PASS_UI_LINK=http://localhost:5173/
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
DEFAULT_PASS=<default-password>
SP_ENDPOINT=<shurjopay-endpoint>
SP_USERNAME=<shurjopay-username>
SP_PASSWORD=<shurjopay-password>
SP_PREFIX=<shurjopay-prefix>
SP_RETURN_URL=<shurjopay-return-url>