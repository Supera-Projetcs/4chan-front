interface Room {
  room: string;
}

interface MyUser {
  user_info: string;
}

interface Message {
  username: string;
  message: { type: "chat.message"; message: string };
  date: Date;
}

interface Joined {
  joined: string;
  date: Date;
}
