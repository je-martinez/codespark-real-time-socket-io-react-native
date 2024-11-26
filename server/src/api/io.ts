import { createId } from "@paralleldrive/cuid2";
import { Server } from "socket.io";
import { rooms } from "../models/rooms";
import { users } from "../models/users";
import { ServerType } from "../types/server";

export const setupSocketIo = (server: ServerType) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      const username = users.get(socket.id) ?? "Anonymous";
      console.log(`User disconnected: ${socket.id} (${username})`);
      users.delete(socket.id);
    });

    socket.on("setup_name", (username: string) => {
      users.set(socket.id, username);
      console.log(`User ${socket.id} set their name to ${username}`);
    });

    socket.on("join_room", (roomId: string) => {
      const room = rooms.find((r) => r.id === roomId);
      if (!room) {
        socket.emit("error", "Room does not exist.");
        return;
      }

      socket.join(room.id);
      const username = users.get(socket.id) ?? "Anonymous";
      console.log(
        `User ${socket.id} with name ${username} joined room ${room.id}`
      );
      room.users.push(socket.id);

      io.to(room.id).emit("user_joined", `${username} joined the room.`);
    });

    socket.on("leave_room", (roomId: string) => {
      const room = rooms.find((r) => r.id === roomId);
      if (!room) {
        socket.emit("error", "Room does not exist.");
        return;
      }

      socket.leave(room.id);
      const username = users.get(socket.id) ?? "Anonymous";
      room.users = room.users.filter((id) => id !== socket.id);

      console.log(
        `User ${socket.id} with name ${username} left room ${roomId}`
      );

      io.to(roomId).emit("user_left", `${username} left the room.`);
    });

    socket.on("send_message", (input: { message: string; roomId: string }) => {
      const room = rooms.find((r) => r.id === input.roomId);
      if (!room) {
        socket.emit("error", "Room does not exist.");
        return;
      }
      const username = users.get(socket.id) ?? "Anonymous";

      const message = {
        id: createId(),
        user: username,
        message: input.message,
        roomId: input.roomId,
        timestamp: Date.now(),
      };
      room.messages.push(message);

      console.log(
        `User ${socket.id} with name ${username} sent message to room ${input.roomId}`
      );

      io.to(input.roomId).emit("message", message);
    });
  });

  return io;
};
