export interface Room {
  id: string;
  name: string;
}

export type Message = {
  id: string;
  user: string;
  message: string;
  timestamp: number;
  roomId: string;
};
