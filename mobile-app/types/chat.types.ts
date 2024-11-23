export interface Room {
  id: string;
  name: string;
}

export type Message = {
  id: string;
  username: string;
  userId: string;
  message: string;
  date: Date;
  roomId?: string;
};
