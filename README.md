![banner](./assets/bannerProyecto2.png)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)

![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow?logo=javascript)
![Visual Studio Code](https://img.shields.io/badge/Editor-VSCode-blue?logo=visualstudiocode)

## 📘 Introducción

En este proyecto se combinan los conocimientos adquiridos en las
tecnologías node + express, además de MongoDB/mongoose.

---

---

## 🎯 Objetivos del Proyecto

Desarrollo de una API REST capaz de lo siguiente:

- Registro de usuarios usando Bcrypt.
- Login de usuarios + token + middleware.
- CRUD funcional.
- Dar/quitar Like a post.
- Backend disponible en producción.

## 🛠️ Stack Tecnológico

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)

## 📦 Funcionalidad de la API

Se desarrolla una API RESTful para gestionar una red social. Esta API incluye las operaciones básicas CRUD:

- **GET**
- **POST**
- **PUT/PATCH**
- **DELETE**

## ✅ Requisitos

- Tener instalado **Node.js**.
- Tener instalado **MongoDB Atlas** (o acceso a una base de datos MongoDB).
- Instalar dependencias con:

```bash
npm install
```

## 🚀 Ejecutar el Proyecto

```bash
node index.js
```

### 🎁 Bonus

- 🔐 Autenticación y seguridad

  - Middleware para verificar autoría de comentarios antes de editar o eliminar.

  - Validación de login solo tras confirmar correo electrónico.

  - Envío de correo de confirmación en el registro.

- 📦 Gestión de archivos

  - Subida de imágenes con multer al crear o actualizar:

    - Posts

    - Comentarios

    - Usuarios

- 👥 Sistema de followers

  - Seguir y dejar de seguir a otros usuarios.

  - Endpoint para obtener los seguidores y posts del usuario conectado, incluyendo nombres de los followers.

- 💬 Comentarios

  - CRUD completo de comentarios.

  - Dar y quitar likes a comentarios.

- 🔍 Búsquedas y relaciones

  - Buscar usuario por nombre o ID.

  - Endpoint para:

    - Obtener todos los posts con su autor y comentarios (con datos del autor de cada comentario).

    - Obtener la información del usuario conectado, sus posts, número de seguidores y nombres de sus followers.

- 📄 Documentación

  - Documentación completa de los endpoints disponibles.
