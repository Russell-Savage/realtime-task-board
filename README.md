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

```text
┌─────────────────┐    ┌──────────────────┐    ┌──────────────┐
│   React + TS    │◄──►│ Express + Socket │◄──►│   MongoDB    │
│   (Frontend)    │    │   io + TS        │    │              │
└─────────────────┘    └──────────────────┘    └──────────────┘
                                │
                       ┌──────────────────┐
                       │ Python Analytics │
                       │     Worker       │
                       └──────────────────┘
```
## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB (Docker recommended)
- npm or yarn

### 1. Clone & enter project
```bash
git clone https://github.com/yourusername/realtime-task-board.git
cd realtime-task-board
```
2. Environment
```bash
cp .env.example .env
# Edit .env with your JWT_SECRET, MONGO_URI, ports, etc.
```
3. Start MongoDB (Docker)
```bash
docker-compose up -d mongo
```
4. Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on http://localhost:4000

5. Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

6. Analytics worker (Python)
Run periodically:

```bash
cd ../analytics-worker
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
python scripts/run_analytics.py
```
📁 Project Structure
text
realtime-task-board/
├── backend/           # Express + Socket.io + TypeScript
├── frontend/          # React + TypeScript + Vite
├── analytics-worker/  # Python + PyMongo
├── docker-compose.yml
├── .gitignore
├── LICENSE
└── README.md
🔧 Tech Stack
Frontend	Backend	Database	Other
React 18	Node.js	MongoDB	Socket.io
TypeScript	Express	Mongoose	Docker
Vite	JWT Auth		PyMongo
🧪 Testing
bash
cd backend && npm test
cd ../frontend && npm run test
cd ../analytics-worker && pytest
🎯 Future Enhancements
 Email notifications

 File attachments

 Advanced RBAC

 Redis scaling

 CI/CD pipeline

 PWA support

🤝 Contributing
Fork the project

git checkout -b feature/AmazingFeature

git commit -m "feat: add AmazingFeature"

git push origin feature/AmazingFeature

Open PR

📄 License
MIT License – see LICENSE.
