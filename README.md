# React Native Socket.IO App with Express Backend

This repository contains a **React Native App** (built with Expo and NativeWind) and a simple **Express API** serving as the backend with **Socket.IO** integration. The app demonstrates how to connect to a Socket.IO server, display a list of rooms, join a room, and listen for real-time events.

---

## Features

### Backend (Express + Socket.IO):
- Serves a Socket.IO server.
- Manages real-time connections.
- Emits and listens for events within specific rooms.

### Frontend (React Native + Expo):
- Connects to the Socket.IO server.
- Displays 5 available rooms.
- Allows joining rooms and receiving real-time updates via events.
- Styled with **NativeWind** (Tailwind CSS for React Native).

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally.


## Folder Structure

```plaintext
root/
├── server/       # Express backend with Socket.IO integration
├── mobile-app/   # React Native app with Expo
└── README.md     # This file
```

---

## Usage

1. Start the backend server and the Expo development server.
2. Open the React Native app on a physical or virtual device.
3. Connect to the Socket.IO server.
4. View the list of available rooms and join one.
5. Listen to real-time events and interact within the room.

---

## Technologies Used

### Backend:
- **Express.js**
- **Socket.IO**

### Frontend:
- **React Native** (via Expo)
- **NativeWind** (Tailwind CSS for React Native)
- **Socket.IO Client**

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements
- [Socket.IO](https://socket.io/)
- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/)

Enjoy building! 🚀
