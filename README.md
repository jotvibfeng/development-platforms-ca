# Development Platforms - REST API Assignment

A comprehensive REST API built with Express.js and TypeScript for user authentication and article management.

## 📋 About This Assignment

This project implements a secure REST API that allows users to register, authenticate, and manage articles. The API features JWT-based authentication, input validation, and proper error handling. It demonstrates modern backend development practices with TypeScript, Express.js, and MySQL.

### Key Features

- 🔐 **User Authentication**: Secure registration and login with JWT tokens
- 📝 **Article Management**: Create and view articles with author information
- 🛡️ **Protected Routes**: JWT middleware for secure article creation
- ✅ **Input Validation**: Zod schema validation for all endpoints
- 📊 **API Documentation**: Interactive Swagger UI documentation
- 🔒 **Security**: bcrypt password hashing and SQL injection prevention
- 🎯 **TypeScript**: Full type safety throughout the application

## 🛠️ Technology Stack

- **Backend**: Express.js with TypeScript
- **Database**: MySQL with mysql2 driver
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod schemas
- **Documentation**: Swagger UI with swagger-jsdoc
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
src/
├── controllers/
│   └── validation.ts           # Basic validation functions
├── db/
│   └── connection.ts           # Database connection setup
├── interface.ts                # TypeScript interfaces
├── middlewares/
│   ├── auth-validation.ts      # JWT auth & Zod validation
│   └── authMiddleware.ts       # Authentication middleware
├── models/
│   ├── articleModel.ts         # Article data models
│   └── userModel.ts            # User data models
├── routes/
│   ├── articles.ts             # Article endpoints
│   └── auth.ts                 # Authentication endpoints
├── utils/
│   └── jwt.ts                  # JWT utilities
└── server.ts                   # Main application entry point
```

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Articles Table

```sql
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  submitted_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submitted_by) REFERENCES users(id)
);
```

## 🚀 API Endpoints

### Authentication Routes

- `POST /auth/register` - User registration
- `POST /auth/login` - User login (returns JWT)

### Article Routes

- `GET /articles` - View all articles (public access)
- `POST /articles` - Submit new article (🔒 **protected**, requires JWT)

## ⚙️ Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL server
- npm or yarn package manager

### 1. Clone and Install

```bash
git clone <repository-url>
cd development-platforms-ca
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_super_secure_jwt_secret_key
```

### 3. Database Setup

1. Create a MySQL database
2. Create the required tables using the SQL schemas above
3. Update your `.env` file with the correct database credentials

### 4. Run the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm run build
npm start
```

## 📖 How to Use

### 1. Register a New User

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

### 2. Login to Get JWT Token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

### 3. View All Articles (Public)

```bash
curl http://localhost:3000/articles
```

### 4. Create New Article (Protected)

```bash
curl -X POST http://localhost:3000/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "title": "My Article Title",
    "body": "Article content goes here...",
    "category": "Technology",
    "submitted_by": 1
  }'
```

## 📚 API Documentation

Once the server is running, visit the interactive API documentation:

```
http://localhost:3000/api-docs
```

## 🔒 Authentication Flow

1. **Register**: Create account with email and password
2. **Login**: Receive JWT token upon successful authentication
3. **Protect**: Include JWT token in Authorization header for protected routes
4. **Access**: Create articles with valid authentication

## ⚡ Key Implementation Details

- **JWT Authentication**: Tokens expire in 24 hours
- **Password Security**: bcrypt with 12 salt rounds
- **SQL Injection Protection**: Parameterized queries with `?` placeholders
- **Input Validation**: Zod schemas with email format and password complexity rules
- **Error Handling**: Comprehensive HTTP status codes and error messages
- **CORS**: Enabled for cross-origin requests

## 🧪 Testing

The application includes proper error handling and status codes:

- `200` - Success responses
- `201` - Created resources
- `400` - Bad request / Validation errors
- `401` - Unauthorized access
- `403` - Forbidden (invalid token)
- `404` - Resource not found
- `409` - Conflict (email already exists)
- `500` - Server errors

## 📝 Assignment Requirements Fulfilled

✅ Express.js with TypeScript  
✅ MySQL database with mysql2  
✅ JWT authentication with bcrypt  
✅ Basic validation with Zod  
✅ Error handling and status codes  
✅ Express Router organization  
✅ JWT authentication middleware  
✅ Protected article creation route  
✅ Parameterized SQL queries  
✅ All required endpoints implemented

## 🚦 Server Status

When successfully running, you should see:

```
Hello from http://localhost:3000
```

Visit `http://localhost:3000/api-docs` for the Swagger documentation interface.

## Movtivation

In this lesson I learned how to build a secure and well-structed REST API using Express.js and TypeScript wich have been very fun and educational for me. I had an issue when I first used mysql workbench after i had problem with my mac. It looked me out from workbench program after i rebooted my mac and had to uninsatll and reinstall all the program again to make it work but then i have learn how fix if it would happned again. And it had been fun and intressting for me to learn about. I`ve think I enjoyed back-end devlopment more then I exepected so much that I will continue to learn more about it in the future. And my try to become a fullstack developer would be a great goal for me.
