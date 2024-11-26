export type Message = {
  id: string;
  user: string;
  message: string;
  timestamp: number;
  roomId: string;
};

export type Room = {
  id: string;
  name: string;
  messages: Message[];
  users: string[];
};

export const rooms: Room[] = [
  { id: "room1", name: "Room 1", messages: [], users: [] },
  { id: "room2", name: "Room 2", messages: [], users: [] },
  { id: "room3", name: "Room 3", messages: [], users: [] },
  { id: "room4", name: "Room 4", messages: [], users: [] },
  { id: "room5", name: "Room 5", messages: [], users: [] },
];
