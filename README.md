💬 React Firebase Real-Time Chat Application
A real-time chat app built with React.js and Firebase, featuring 🔒 user authentication, 📨 instant messaging, 🖼️ image uploads, 🔍 search, and more — all wrapped in a sleek modern UI with glassmorphism vibes.


📚 Table of Contents
✨ Features

🛠️ Tech Stack

⚙️ Prerequisites

🚀 Installation and Setup

📦 Database Structure

🧑‍💻 How to Use

🌐 Deployment

🤝 Contributing

📄 License

✨ Features
🔐 User Authentication (Sign Up / Login / Logout) with Firebase Auth

🔁 Real-time messaging powered by Firestore

📸 Image uploads (profile pics & chat images) with Firebase Storage

🚫 User block/unblock functionality

🔍 Search bar to find users or chats

📱 Responsive UI with a glassmorphism design

😄 Emoji picker for expressive chats

📜 Auto scroll to latest message

🧠 State management using Zustand

🛠️ Tech Stack
Frontend	Backend	Deployment
React.js	Firebase Auth, Firestore, Storage	VPS (e.g., Hostinger)
Zustand		Nginx / PM2
⚙️ Prerequisites
Make sure you have the following installed:

Node.js (v16+ recommended)

npm or yarn

A Firebase project (with Auth, Firestore, and Storage enabled)

🚀 Installation and Setup
1. 🧾 Clone the Repository
bash
Copy
Edit
git clone https://github.com/safak/react-firebase-chat.git
cd react-firebase-chat
2. 📦 Install Dependencies
bash
Copy
Edit
npm install
3. 🔧 Configure Firebase
Create a Firebase project at Firebase Console

Enable:

Authentication (Email/Password)

Firestore Database

Firebase Storage

Create a .env file in your project root and add your config:

env
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
4. 🧪 Start Development Server
bash
Copy
Edit
npm start
Your app will be running at: http://localhost:3000

📦 Database Structure
🔹 Users Collection
json
Copy
Edit
{
  "id": "userId",
  "username": "JohnDoe",
  "email": "john@example.com",
  "avatarURL": "https://...",
  "blocked": ["uid1", "uid2"]
}
🔹 Chats Collection
json
Copy
Edit
{
  "id": "chatId",
  "createdAt": Timestamp,
  "messages": [ {...}, {...} ] // or use subcollection
}
🔹 UserChats Collection
json
Copy
Edit
{
  "userId": "userId",
  "chats": [
    {
      "chatId": "chatId",
      "receiverId": "otherUserId",
      "lastMessage": "Hey there!",
      "timestamp": Timestamp
    }
  ]
}
🧑‍💻 How to Use
📝 Sign Up / Log In

Create an account or log in with existing credentials.

💬 View Chats

Your conversations will appear in the sidebar.

🔍 Search Users or Chats

Quickly find friends or previous conversations.

✍️ Send Messages / Upload Images

Start chatting instantly, with support for image uploads.

🚫 Block / Unblock Users

Manage interactions from the chat detail panel.

😎 Use Emojis

Enhance your messages with the emoji picker.

🔓 Log Out

End your session safely with the logout button.

🌐 Deployment
✅ VPS Deployment Steps
Purchase a VPS plan (e.g., from Hostinger)

Set up your environment:

bash
Copy
Edit
sudo apt install nodejs npm
Build your app:

bash
Copy
Edit
npm run build
Upload files to your server via SSH or FTP

Serve your app with Nginx or a process manager like PM2
