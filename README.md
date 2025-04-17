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

# 🚴 Bicycle Shop API

This is a RESTful API for managing users, products (bicycles), and orders in a bicycle shop application. It includes authentication, role-based access control, and CRUD operations for admins and customers.

---

## 📦 API Endpoints

### 🔐 Authentication

- `POST /api/auth/login`  
  Log in a user.

- `POST /api/auth/change-password`  
  Change the logged-in user's password.

- `POST /api/auth/refresh-token`  
  Refresh the access token using a valid refresh token.

---

### 👤 Users

- `POST /api/users/create-customer`  
  Create a new customer account.

- `POST /api/users/create-admin`  
  Create a new admin account.

- `GET /api/users/me/:email`  
  Retrieve user details by email.

- `PATCH /api/users/change-status/:id`  
  Change the status (e.g., active/inactive) of a user by ID.

---

### 🚲 Products

- `POST /api/products` _(Admin only)_  
  Add a new bicycle to the catalog.

- `GET /api/products`  
  Retrieve a list of all bicycles.

- `GET /api/products/:productId`  
  Get details of a specific bicycle.

- `PUT /api/products/:productId` _(Admin only)_  
  Update the details of an existing bicycle.

- `DELETE /api/products/:productId` _(Admin only)_  
  Delete a bicycle from the catalog.

---

### 🧾 Orders

- `POST /api/orders`  
  Create a new order.

- `GET /api/orders` _(Admin only)_  
  Retrieve all orders.

- `GET /api/orders/my-orders/:email`  
  Get all orders placed by a specific user.

- `DELETE /api/orders/:orderId` _(Admin only)_  
  Delete an order by ID.

---

## 🔐 Authentication & Authorization

- All endpoints (except login) require a valid **access token**.
- Admin-only routes require the user to have an `admin` role.
- Use the `Authorization: Bearer <token>` header for protected routes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).



## 🌐 Environment Variables

The following environment variables are required for the application to run properly. Create a `.env` file in the root directory and add the following:

```env
# General Configuration
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=<your-mongodb-connection-string>

# Security
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=<your-access-token-secret>
JWT_REFRESH_SECRET=<your-refresh-token-secret>
JWT_ACCESS_EXPIRES_IN=25d
JWT_REFRESH_EXPIRES_IN=25d
DEFAULT_PASS=<default-password>

# Frontend
RESET_PASS_UI_LINK=http://localhost:5173/

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

# ShurjoPay Payment Gateway
SP_ENDPOINT=<shurjopay-endpoint>
SP_USERNAME=<shurjopay-username>
SP_PASSWORD=<shurjopay-password>
SP_PREFIX=<shurjopay-prefix>
SP_RETURN_URL=<shurjopay-return-url>
