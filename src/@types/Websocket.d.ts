interface Room {
  room: string;
}

interface MyUser {
  user_info: string;
}

interface Message {
  username: string;
  message: { type: "chat.message"; message: string };
  date: string;
}

interface Joined {
  joined: string;
  date: string;
}
interface Left {
  left: string;
  date: string;
}
