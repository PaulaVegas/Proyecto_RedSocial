# 📒 Dev bitacora

### 👩‍🦰💻 Paula

### 🗓️ Project: API Social Network

## ✅ To Do

| Date      | Task                                    | Status    |
| ---------- | ----------------------------------------- | ----------- |
| 13/06/2025 | Create project skeleton           | ✅ Complete  |
| 13/06/2025   | Posts CRUD               | ✅ Complete    |
| 14/06/2025   | Users CRUD          | ⏳ Semi Complete |
| /06/2025   | Comments CRUD            | ⏳ In Progress  |
| /06/2025   | Complete testing | ⏳ In Progress  |

---

## 🧪 Testing

### Testing with jest:
Started testing with jest, had to create app.js and separate code from index.js so as to separate the logic from the express server (the .listen) and to be able to reuse my app in testing without initializing the real server.
Installed the `mongodb-memory-server` library to have a temporary MongoDB database. 

# 🧩 Problems
Problem with the logout jest testing
```bash
DELETE /users/logout › should return 401 without token

    expect(received).toBe(expected) // Object.is equality

    Expected: 401
    Received: 400

      163 |     it("should return 401 without token", async () => {
      164 |             const res = await request(app).delete("/users/logout");
    > 165 |             expect(res.statusCode).toBe(401);
          |                                    ^
      166 |     });
      167 | });
      168 |

      at Object.toBe (tests/user.test.js:165:26)
```

## 📌 Pending

## 📍 Important commits

| Date    | Commit Message                           | Branch         |
| -------- | -------------------------------------------- | -------------- |
| 13/06/2025 | `feat: Post CRUD`                                     | CRUD/posts    |
| /06/2025 | `feat: User CRUD with auth`                                     | CRUD/Users      |
| /06/2025 | `feat: `                                     | feature/       |
| /06/2025 | `feat: `                                     | feature/       |
| /06/2025 | `feature: upload product images with multer` | feature/multer |
