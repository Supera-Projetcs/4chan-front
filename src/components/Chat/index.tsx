import { useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import { ItemListChats } from "../ItemListChats";
import { ChatBox } from "../ChatBox";
import { Add } from "@mui/icons-material";

const baseUrl = process.env.NEXT_PUBLIC_URL_WB || "";

export function Chat() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const new_socket = new WebSocket(`${baseUrl}/ws/chatlist/`);
    setSocket(new_socket);
    new_socket.addEventListener("message", reciveMessage);
  }, []);

  function reciveMessage(event: MessageEvent<any>) {
    const data = JSON.parse(event.data);

    if (data.rooms) {
      setRooms(data.rooms);
    }

    if (data.room) {
      setRooms((prev) => [...prev, data.room]);
    }
  }

  const handleSelectRoom = (room: Room) => setSelectedRoom(room);

  return (
    <div className={styles["chat"]}>
      <aside className={styles["chat__aside"]}>
        <h5 className={styles["chat__aside__title"]}>Chats Disponíveis</h5>

        <button className={styles["chat__aside__button"]}>
          <Add sx={{ fontSize: 18 }} />
          Criar novo chat
        </button>

        <ul className={styles["chat__aside__list"]}>
          {rooms.map((room) => (
            <ItemListChats
              key={room.room}
              room={room}
              handleSelectRoom={handleSelectRoom}
            />
          ))}
        </ul>
      </aside>
      {selectedRoom && <ChatBox room={selectedRoom} />}
    </div>
  );
}
