import express from "express";
import http from "http";
import { setupSocketIo } from "./io";
import { registerEndpoints } from "./endpoints";

export const app = express();
export const server = http.createServer(app);
export const ioServer = setupSocketIo(server);
registerEndpoints(app);
