# 🛍️ BusyBuy 2 – Redux-Based E-Commerce Web App

**BusyBuy 2** is a scalable, full-stack e-commerce web application built with the MERN stack. This version enhances frontend state management by integrating **Redux Toolkit** for better performance, cleaner architecture, and maintainable global state. The backend remains the same as BusyBuy 1, providing robust authentication, cart management, and order handling via a secure REST API.

---
<img width="960" alt="P2" src="https://github.com/user-attachments/assets/345f13a0-70c3-496b-b215-6f63f97510dd" />

## 🚀 Project Highlights

### 🔷 Frontend (React + Redux)
- Built using **React 19** and **React Router v7**
- Global state managed via **Redux Toolkit**
- Organized with modular reducers: `auth`, `cart`, `orders`, `products`, `filters`, and `navbar`
- Pages: Home, Cart, Orders, Login, Signup
- Dynamic routing with `RouterProvider`
- Responsive UI with reusable components

### 🔷 Backend (Node + MongoDB)
- REST API with **Express.js**
- MongoDB + **Mongoose** for schema modeling
- **JWT-based authentication** with token blacklisting on logout
- File uploads handled via **Multer**
- Routes include user management, cart, and orders

---

## 🧠 Tech Stack

| Layer      | Technology                              |
|------------|------------------------------------------|
| Frontend   | React, Redux Toolkit, React Router DOM   |
| Backend    | Node.js, Express.js                      |
| Database   | MongoDB (with Mongoose ORM)              |
| Auth       | JWT (JSON Web Tokens)                    |
| Uploads    | Multer (image/file handling)             |
| Env Mgmt   | dotenv                                   |

---

## 🧩 Folder Structure (Frontend)

/src
├── App.js
├── index.js
├── redux/
│ ├── store.js
│ └── reducers/
├── pages/
│ ├── HomePage
│ ├── CartPage
│ ├── OrdersPage
│ ├── LoginPage
│ └── RegisterPage
└── components/
