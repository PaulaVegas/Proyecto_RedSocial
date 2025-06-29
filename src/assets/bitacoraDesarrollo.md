# 📒 Dev bitacora

### 👩‍🦰💻 Paula

### 🗓️ Project: API Social Network

## ✅ To Do

| Date       | Task                    | Status           |
| ---------- | ----------------------- | ---------------- |
| 13/06/2025 | Create project skeleton | ✅ Complete      |
| 13/06/2025 | Posts CRUD              | ✅ Complete      |
| 14/06/2025 | Users CRUD              | ⏳ Semi Complete |
| 16/06/2025 | Comments CRUD           | ✅ Complete      |
| /06/2025   | Complete testing        | ⏳ In Progress   |

---

## 🧪 Testing

### Testing with jest:

Started testing with jest, had to create app.js and separate code from index.js so as to separate the logic from the express server (the .listen) and to be able to reuse my app in testing without initializing the real server.
Installed the `mongodb-memory-server` library to have a temporary MongoDB database.
Changed to .env and broke the testing with jest. Revisit !!!

# 🧩 Problems

Problem with the logout jest testing

```bash
DELETE /users/logout › should return 401 without token
```

**Fixed**, I had used `status 400` in the controller and `status 401` in the testing. Changed the controller one to `401`

Testing broke when implementing .env

## 📍 Important commits

| Date       | Commit Message                               | Branch         |
| ---------- | -------------------------------------------- | -------------- |
| 13/06/2025 | `feat: Post CRUD`                            | CRUD/posts     |
| 14/06/2025 | `feat: User CRUD with auth`                  | CRUD/Users     |
| 16/06/2025 | `feat: comments CRUD`                        | develop        |
| 24 /06/2025   | `feat: multer and isAuth`                                     | develop      |
| /06/2025   | `feat: finished project` |  |
