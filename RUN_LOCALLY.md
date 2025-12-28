# 🚀 Local Development Guide

This guide provides step-by-step instructions to run the Chat App on your local machine using the command line.

---

## 📋 Prerequisites
- **Node.js**: Installed (version 18 or higher recommended).
- **MongoDB**: Running locally (or a connection string for MongoDB Atlas).

---

## 🛠️ Step 1: Environment Setup
You need to create environment files for both the backend and frontend to configure ports and URLs.

### **Backend `.env`**
1. **Directory**: `backend/`
2. **Command**:
   ```powershell
   copy .env.example .env
   ```
3. **Effect**: Creates a `.env` file with default settings (`PORT=5000`, `MONGO_URI=mongodb://127.0.0.1:27017/chatApp`).

### **Frontend `.env`**
1. **Directory**: `frontend/`
2. **Command**:
   ```powershell
   copy .env.example .env
   ```
3. **Effect**: Creates a `.env` file pointing the frontend to the backend (`REACT_APP_BACKEND_URL=http://localhost:5000`).

---

## 📦 Step 2: Install Dependencies
Run these commands once to install all necessary libraries.

### **Backend Dependencies**
1. **Directory**: `backend/`
2. **Command**:
   ```powershell
   npm install
   ```
3. **Effect**: Installs `express`, `mongoose`, `socket.io`, etc. You will see a `node_modules` folder created in the `backend` directory.

### **Frontend Dependencies**
1. **Directory**: `frontend/`
2. **Command**:
   ```powershell
   npm install
   ```
3. **Effect**: Installs `react`, `react-scripts`, `socket.io-client`, etc. You will see a `node_modules` folder created in the `frontend` directory.

---

## 🚀 Step 3: Run the Application
You need **two separate terminals** open to run the backend and frontend simultaneously.

### **Terminal 1: Start Backend Server**
1. **Directory**: `backend/`
2. **Command**:
   ```powershell
   npm run dev
   ```
3. **Effect**:
   - Compiles the server code.
   - Connects to MongoDB.
   - **Terminal Output**:
     ```text
     🚀 Server running on port 5000
     ✅ MongoDB Connected
     ```

### **Terminal 2: Start Frontend Server**
1. **Directory**: `frontend/`
2. **Command**:
   ```powershell
   npm start
   ```
3. **Effect**:
   - Starts the React development server.
   - Opens your default browser to `http://localhost:3000`.
   - **Terminal Output**:
     ```text
     Compiled successfully!
     You can now view chat-frontend in the browser.
       Local:            http://localhost:3000
     ```

---

## 🧪 Step 4: Testing the Chat
1. Open [http://localhost:3000](http://localhost:3000) in **Tab A**. Enter name `Alice` and click **"Go Online"**.
2. Open [http://localhost:3000](http://localhost:3000) in **Tab B**. Enter name `Bob` and click **"Go Online"**.
3. In **Tab A**, set "Chat with" to `Bob`.
4. In **Tab B**, set "Chat with" to `Alice`.
5. Send messages! You will see them appear instantly in both windows.
