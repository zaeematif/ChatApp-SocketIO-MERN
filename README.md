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

### Chat
- `GET /api/chat` - Get all chats for a user
- `POST /api/chat` - Create a new chat

### Messages
- `POST /api/message` - Send a message
- `GET /api/message/:chatId` - Get messages for a chat

## WebSocket Events (Socket.IO)
- `connect` - Establish a socket connection
- `message` - Send/receive a message
- `join-room` - Join a specific chat room
- `typing` - Notify when a user is typing


