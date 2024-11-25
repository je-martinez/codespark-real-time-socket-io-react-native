import http from "http";

export type ServerType = http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;
