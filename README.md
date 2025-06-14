![banner](./assets/bannerProyecto2.png)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)

![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow?logo=javascript)
![Visual Studio Code](https://img.shields.io/badge/Editor-VSCode-blue?logo=visualstudiocode)

# 📘 Social Network API

This backend project demonstrates a RESTful API built using **Node.js**, **Express**, and **MongoDB/Mongoose**, focused on simulating a simple social media application.

---

## 🎯 Objectives

- Register and authenticate users using **bcrypt** and **JWT**.
- Implement a fully functional **CRUD** system.
- Enable users to **like** and **unlike** posts and comments.
- Deploy the backend to a production environment.

## 🛠️ Tech Stack

- [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) + [![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

- [![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
- **Node.js**
- **JWT** for token-based authentication
- **Multer** for image uploads
- **Nodemailer** for email confirmation

## 📦 Features

### 🔐 Authentication

- User registration with password hashing.
- Login system that returns a JWT upon successful authentication.
- Middleware to protect routes and verify token.
- Email verification required before login.

### 📝 CRUD Operations

- Create, read, update and delete:
  - **Users**
  - **Posts**
  - **Comments**

### 💬 Comments

- Full comments CRUD.
- Ability to like and unlike comments.
- Middleware to check ownership before edit/delete.

### 📷 File Management

- Upload images via **Multer** for:
  - Posts
  - Comments
  - User profiles

### 👥 Follower System

- Follow/unfollow other users.
- Retrieve a list of followers.
- Access posts and followers of the logged-in user.

### 🔍 Search & Relationships

- Search users by name or ID.
- Retrieve all posts with:
  - Author's data
  - Comments and each comment's author


## ✅ Requirements

- **Node.js**.
- **MongoDB Atlas** (or local MongoDB).
- Example `keys.js`:
```bash
module.exports = {
	MONGO_URI:
	"mongodb+srv://<name>:<password>@cluster0-tuqrv.mongodb.net/test?retryWrites=true&w=majority",
	JWT_SECRET: process.env.JWT_SECRET || "default_secret_key",
	};
```
- Example `docker-compose.example.yml`:
```bash 
 environment:
     MONGO_INITDB_ROOT_USERNAME: nombreusuario
     MONGO_INITDB_ROOT_PASSWORD: contraseñaDB
     MONGO_INITDB_DATABASE: nombreDB
```

## 🚀 Getting started

1. Clone the repository:
```bash
git clone https://github.com/PaulaVegas/Proyecto_RedSocial.git
```

2. Install dependencies:
```bash
npm install 
```

3. Run the project:
```bash
npm start
```

## 👨‍💻 Credits

- ✍️ Paula [@PaulaVegas](https://www.github.com/PaulaVegas)
