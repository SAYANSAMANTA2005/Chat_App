# Chat App

A real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

## 🌟 Features

- Real-time messaging with WebSocket (Socket.IO)
- User online/offline status
- Message persistence with MongoDB
- Clean and modern UI
- Responsive design

## 🚀 Live Demo

**Frontend**: [Your deployed URL will be here]  
**Backend**: [Your deployed backend URL will be here]

## 💻 Local Development

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chat-app.git
   cd chat-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and set your MONGO_URI
   npm start
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Tech Stack

### Frontend
- React 18
- Socket.IO Client
- CSS3

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB with Mongoose
- CORS

## 🌐 Deployment & Guides

- **[Local Run Guide](RUN_LOCALLY.md)**: Detailed instructions for local setup and terminal commands.
- **[MongoDB Connection Guide](MONGODB_CONNECTION.md)**: How to set up your connection string.
- **[Deployment Guide](DEPLOYMENT.md)**: How to deploy to Render with MongoDB Atlas.

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:5000
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Sayan Samanta - [https://github.com/SAYANSAMANTA2005]

---

Made with ❤️ using React and Node.js
