![banner](./assets/bannerProyecto2.png)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)

![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow?logo=javascript)
![Visual Studio Code](https://img.shields.io/badge/Editor-VSCode-blue?logo=visualstudiocode)

# Social Network API

This backend project demonstrates a RESTful API built using **Node.js**, **Express**, and **MongoDB/Mongoose**, focused on simulating a simple social media application.

---

## Objectives

- Register and authenticate users using **bcrypt** and **JWT**.
- Implement a fully functional **CRUD** system.
- Enable users to **like** and **unlike** posts and comments.
- Deploy the backend to a production environment.

## 🛠️ Tech Stack

<p align="center"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> </p>

## Features

### Authentication & Security

<p align="center"> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" /> <img src="https://img.shields.io/badge/Bcrypt-00599C?style=for-the-badge&logo=lock&logoColor=white" /> </p>

- User registration with password hashing.
- Login system that returns a JWT upon successful authentication.
- Middleware to protect routes and verify token.
- Email verification required before login.

### Endpoints

- Create, read, update and delete:
  - **Users**
  - **Posts**
  - **Comments**
- Ability to like and unlike comments.
- Upload images via **Multer** for:
  - Posts
  - Comments
  - User profiles
- Follower system

## Requirements

- **MongoDB Atlas** (or local MongoDB).
- Create `.env` and `docker-compose.yml` with the example files provided.

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

## API Documentation

![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

This project includes interactive API documentation powered by Swagger UI, allowing you to explore all available endpoints directly from your browser.

### Access

With the API running, visit

```bash
http://localhost:3000/api-docs
```

## Credits

- Paula [@PaulaVegas](https://www.github.com/PaulaVegas)
