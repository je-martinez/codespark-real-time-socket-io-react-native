import express from "express";
import http from "http";
import { setupSocketIo } from "./io";

export const app = express();
export const server = http.createServer(app);
export const ioServer = setupSocketIo(server);
