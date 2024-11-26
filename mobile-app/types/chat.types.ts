export interface Room {
  id: string;
  name: string;
}

export type Message = {
  id: string;
  user: string;
  message: string;
  date: Date;
  roomId: string;
};
