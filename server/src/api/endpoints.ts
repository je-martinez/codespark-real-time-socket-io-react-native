import type { Express, Request, Response } from "express";
import { rooms } from "../models/rooms";
import { users } from "../models/users";

export const registerEndpoints = (app: Express) => {
  app.get("/", (_: Request, res: Response) => {
    res.send({
      status: "OK",
    });
  });

  app.get('/api/rooms/:id', (req: Request, res: Response) => {
    const room = rooms.find((r) => r.id === req.params.id);

    if (!room) {
      res.status(404).send({
        message: "Room not found",
      });
      return;
    }

    res.send(room);
  });

  app.delete("/api/reset", (req: Request, res: Response) => {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== process.env.API_KEY) {
      res.status(401).send({
        message: "Unauthorized",
      });
      return;
    }

    console.log("Resetting rooms");
    rooms.forEach((room) => {
      room.messages = [];
      room.users = [];
    });

    console.log("Resetting users");
    users.clear();
    console.log("Reset complete");

    res.status(200).send({
      message: "Reset complete",
    });
    return;
  });
};
