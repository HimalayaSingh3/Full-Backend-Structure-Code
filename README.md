# 📒 Notes App Backend - MERN Stack

## 🚀 Overview
Welcome to the **Notes App Backend** – a secure and efficient API built using the **MERN** stack. This backend manages user authentication and CRUD operations for notes, ensuring a smooth experience.

## ✨ Features
✅ User authentication (JWT-based) 🔐  
✅ CRUD operations for notes 📝  
✅ Secure API with authentication middleware 🔑  
✅ MongoDB as the database 🗄️  
✅ Express.js as the backend framework 🚀  

## 🛠️ Technologies Used
- 🍪 **cookie-parser** - Middleware to parse cookies
- 🟢 **Node.js** - JavaScript runtime environment
- ⚡ **Express.js** - Fast and minimalist web framework
- 🍃 **MongoDB** & **Mongoose** - NoSQL database and ODM
- 🔑 **JWT (JSON Web Token)** - Authentication & security
- 🛡️ **bcrypt** - Password hashing
- 🌍 **CORS** - Handling cross-origin requests
- 📦 **dotenv** - Environment variable management

## 🏗️ Installation

1️⃣ Clone the repository:
   ```sh
   git clone https://github.com/HimalayaSingh3/Full-Backend-Structure-Code.git
   ```
2️⃣ Navigate to the project directory:
   ```sh
   cd Full-Backend-Structure-Code
   ```
3️⃣ Install dependencies:
   ```sh
   npm install
   ```
4️⃣ Set up environment variables:
   Create a `.env` file and add:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
5️⃣ Run the server:
   ```sh
   npm start
   ```
   🎯 The backend will be running at **`http://localhost:3000`**

## 🔗 API Endpoints
### 📥 User
📌 **GET** `/api/v1/users/getuser` - Get user details (Authenticated)

### 📝 Notes
📌 **GET** `/api/v1/notes/getnotes` - Get specific notes (Authenticated)
### 🔐 Authentication
🔹 **POST** `/api/v1/users/register` - Register a new user  
🔹 **POST** `/api/v1/users/login` - Login user and receive a token  

### 📝 Notes
📌 **GET** `/api/v1/notes` - Get all notes (Authenticated)  
📌 **POST** `/api/v1/notes` - Create a new note (Authenticated)  
📌 **PUT** `/api/v1/notes/:id` - Update a note (Authenticated)  
📌 **DELETE** `/api/v1/notes/:id` - Delete a note (Authenticated)  

## 🛡️ Middleware
🔐 **Auth Middleware:** Ensures protected routes require authentication.

## 🚀 Deployment
### 🌍 Deploying to Heroku
1️⃣ Install Heroku CLI and login:
   ```sh
   heroku login
   ```
2️⃣ Create a Heroku app:
   ```sh
   heroku create your-app-name
   ```
3️⃣ Set environment variables on Heroku:
   ```sh
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_secret_key
   ```
4️⃣ Deploy to Heroku:
   ```sh
   git push heroku main
   ```

## 📜 License
This project is licensed under the **MIT License**.

## 🤝 Contributing
Feel free to **submit pull requests** and **open issues** to improve this project! 🚀

## 📧 Contact
For inquiries, reach out to 👉 himalayasingh337@gmail.com

