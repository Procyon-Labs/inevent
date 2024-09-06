# Inevent

This project is a simple chat application built using Node.js, Express, and Socket.io. The application allows users to join chat rooms, send messages, and react to messages in real-time. The frontend is built with basic HTML, CSS, and JavaScript. Users also have the option to communicate with an AI chatbot.

## Features

- **Real-time Messaging**: Users can send and receive messages in real-time within a chat room.
- **Join Rooms**: Users can join specific chat rooms.
- **Reactions**: Users can react to messages with custom reactions.
- **User Notifications**: Users are notified when someone joins or leaves the chat room.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-application.git
   cd chat-application
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server in dev mode:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5000` to use the chat application.

### Frontend

The frontend consists of a simple HTML file with embedded JavaScript for handling user interactions and Socket.io communication.

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
```

### Backend

The backend is built with Node.js and Socket.io to handle real-time communication.

```javascript
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
```

## Socket.io Commands

### `socket.emit(eventName, data)`

The `emit` method is used to send an event to the server or a specific client. In this project, it is used in several places:

- **Join Room**: 

  ```javascript
  socket.emit('join', { name, room }, (error) => {
    if (error) {
      alert(error);
    }
  });
  ```

- **Send Message**: 

  ```javascript
  socket.emit('sendMessage', message, () => {
    document.getElementById('messageInput').value = '';
  });
  ```

### `socket.on(eventName, callback)`

The `on` method is used to listen for events from the server or clients.

- **Receive Message**:

  ```javascript
  socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(message.user === currentUser ? 'user' : 'other');
    messageElement.textContent = `${message.user}: ${message.text}`;
    document.getElementById('messages').appendChild(messageElement);
  });
  ```

- **Receive Reaction**:

  ```javascript
  socket.on('reaction', ({ messageId, user, reaction }) => {
    console.log(`${user} reacted to message ${messageId}: ${reaction}`);
  });
  ```

### `socket.broadcast.to(room).emit(eventName, data)`

The `broadcast` method is used to send a message to all clients except the sender. In this project, it is used to notify users in the room when someone joins or leaves:

- **Notify Room of New User**:

  ```javascript
  socket.broadcast.to(user?.room || '').emit('message', {
    user: 'admin',
    text: `${user?.name} has joined the room.`,
  });
  ```

### `io.to(room).emit(eventName, data)`

The `to` method sends a message to all clients in a specific room.

- **Send Message to Room**:

  ```javascript
  io.to(user?.room || '').emit('message', {
    id: messageId,
    user: user?.name,
    text: message,
    reactions: [],
  });
  ```

- **Send Reaction to Room**:

  ```javascript
  io.to(room).emit('reaction', {
    messageId,
    user: user?.name,
    reaction,
  });
  ```

## Project Structure

```
.
├── frontend
│   └── index.html       # Frontend code
├── src
│   ├── configs          # Configuration files
│   ├── interfaces       # TypeScript interfaces
│   ├── middleware       # Middleware functions
│   ├── routes           # API routes
│   ├── services         # Business logic and services
│   ├── utils            # Utility functions
├── server.ts            # Main server file
└── README.md            # Project documentation

```

**Additional Notes**

- Refer to the `package.json` file for any additional scripts specific to this project.
- Configuration files (e.g., `.env`) might be required for the project to run properly. Take a look at the `env.sample` file for a guide. Make sure you have them set up according to your environment.