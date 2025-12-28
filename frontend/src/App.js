import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import "./styles.css";

// Use environment variable in production, localhost in development
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const socket = io(BACKEND_URL);

function App() {
  const [userId, setUserId] = useState("");
  const [receiver, setReceiver] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(false);

  // Load chat history when both user and receiver are set
  const loadChatHistory = useCallback(async () => {
    if (userId && receiver) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/messages/${userId}/${receiver}`);
        const history = await response.json();
        setMessages(history);
      } catch (err) {
        console.error("Error loading chat history:", err);
      }
    }
  }, [userId, receiver]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      // Only add message if it's relevant to current conversation
      setMessages(prev => {
        // Avoid duplicates by checking if message already exists
        const exists = prev.some(m => m._id === data._id);
        if (exists) return prev;
        return [...prev, data];
      });
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("message-error", (error) => {
      console.error("Message error:", error);
      alert("Failed to send message: " + error.error);
    });

    return () => {
      socket.off("receive-message");
      socket.off("online-users");
      socket.off("message-error");
    };
  }, []);

  // Load chat history when receiver changes
  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  const goOnline = () => {
    if (userId.trim()) {
      socket.emit("user-online", userId);
      setIsOnline(true);
    }
  };

  const sendMessage = () => {
    if (msg.trim() && receiver.trim() && userId.trim()) {
      socket.emit("send-message", {
        sender: userId,
        receiver,
        text: msg
      });
      // Don't add to local state - wait for server confirmation via receive-message
      setMsg("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h2>💬 Live Chat</h2>

        <div className="user-section">
          <input
            placeholder="Your Name"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            disabled={isOnline}
          />
          <button onClick={goOnline} disabled={isOnline || !userId.trim()}>
            {isOnline ? "✅ Online" : "Go Online"}
          </button>
        </div>

        <div className="online-users">
          <span>🟢 Online Users: </span>
          <strong>{onlineUsers.length > 0 ? onlineUsers.join(", ") : "No one yet"}</strong>
        </div>

        <div className="chat-section">
          <input
            placeholder="Chat with (username)"
            value={receiver}
            onChange={e => setReceiver(e.target.value)}
          />
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((m, i) => (
              <div
                key={m._id || i}
                className={`message ${m.sender === userId ? "sent" : "received"}`}
              >
                <span className="sender">{m.sender}</span>
                <span className="text">{m.text}</span>
              </div>
            ))
          )}
        </div>

        <div className="input-section">
          <input
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={!isOnline || !receiver.trim()}
          />
          <button
            onClick={sendMessage}
            disabled={!isOnline || !receiver.trim() || !msg.trim()}
          >
            Send 📤
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
