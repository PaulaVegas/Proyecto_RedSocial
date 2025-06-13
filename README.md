![banner](./assets/bannerProyecto2.png)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)

![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow?logo=javascript)
![Visual Studio Code](https://img.shields.io/badge/Editor-VSCode-blue?logo=visualstudiocode)

## 📘 Introduction

This project combines the knowledge acquired in node + express, along with MongoDB/mongoose.

---

---

## 🎯 Project Objectives

REST API capable of:

- User registration using Bcrypt.
- User login + token + middleware.
- Fully functional CRUD.
- Like/unlike a post.
- Backend deployed in production.

## 🛠️ Tech Stack

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)

## 📦 API Functionality

API RESTful capable of managing a social network. It includes the basic CRUD operations:

- **GET**
- **POST**
- **PUT/PATCH**
- **DELETE**

## ✅ Requirements

- **Node.js**.
- **MongoDB Atlas** (or access to a MongoDB database).
- Install dependencies:

```bash
npm install
```

## 🚀 Running the project

```bash
npm start
```

### 🎁 Bonus

- 🔐 Authentication and Security

  - Middleware to verify comment ownership before editing or deleting.

  - Login validation only after confirming email.

  - Sending confirmation email upon registration.

- 📦 File Management

  - Image uploads with multer when creating or updating:

    - Posts

    - Comments

    - Users

- 👥 Follower system

  - Follow and unfollow other users.

  - Endpoint to get the followers and posts of the logged-in user, including followers’ names.

- 💬 Comments

  - Full `comments` CRUD.

- Like and unlike comments.

- 🔍  Searches and Relationships

  - Search users by name or ID.

  - Endpoint to:

    - Get all posts with their author and comments (including each comment’s author data).

    - Get information about the logged-in user, their posts, number of followers, and names of their followers.

- 📄 Documentation

  - Complete documentation of available endpoints.

## 👨‍💻 Credits

- ✍️ Paula [@PaulaVegas](https://www.github.com/PaulaVegas)
