# Real-time Task Board

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

Real-time collaborative task board (Trello-style) with a Python-powered analytics worker. Multiple users can create boards, add tasks, drag between columns, and see live updates. A Python worker computes productivity metrics from MongoDB.

## ✨ Features

- 🔐 JWT authentication (register/login)
- 👥 Real-time collaboration via Socket.io (live task updates, presence)
- 🧩 Drag & drop tasks between columns (Todo → In Progress → Done)
- 📊 Python analytics worker (task velocity, bottlenecks, per-user stats)
- 🏗️ TypeScript end-to-end (frontend + backend)
- 🧪 Basic tests and API documentation
- 🐳 Docker Compose ready

## 🏗️ Architecture


┌─────────────────┐    ┌──────────────────┐    ┌──────────────┐
│   React + TS    │◄──►│ Express + Socket │◄──►│   MongoDB    │
│   (Frontend)    │    │   io + TS       │    │              │
└─────────────────┘    └──────────────────┘    └──────────────┘
                              │
                       ┌──────────────────┐
                       │ Python Analytics │
                       │     Worker       │
                       └──────────────────┘
