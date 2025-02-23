# WhatsApp Clone (MERN + Socket.IO)

A real-time chat application built using the MERN (MongoDB, Express, React, Node.js) stack with Socket.IO for instant messaging and JWT authentication.

## Features
- **Real-time messaging** with Socket.IO
- **User authentication** using JWT
- **One-to-one chat** functionality
- **Group chat support**
- **Message persistence** using MongoDB
- **Secure API** with Express and JWT
- **Responsive UI** built with React and Daisy UI
- **State management** using Zustand
- **Seamless routing** with React Router DOM
- **Modern icons** with Lucide React
- **API communication** using Axios

## Tech Stack
- **Frontend:** React.js, Daisy UI, React Router DOM, Zustand, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time Communication:** Socket.IO
- **Authentication:** JWT (JSON Web Token)
- **HTTP Requests:** Axios

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB


## Usage
1. Register a new user.
2. Log in using your credentials.
3. Start a chat with another user or create a group.
4. Send and receive messages in real-time.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token
- `POST /api/auth/update-profile` - Update profile picture

### Chat
- `GET /api/messages/users` - Get all users
- `GET /api/messages/:id` - Get a single chat messages
- `POST /api/messages/send/:id` - Send Messages


## WebSocket Events (Socket.IO)
- `connect` - Establish a socket connection
- `newMessage` - Send/receive a message
- `getOnlineUsers` - Get all online users


