import { FormEvent, useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import { ItemListChats } from "../ItemListChats";
import { ChatBox } from "../ChatBox";
import { Add } from "@mui/icons-material";
import { CreateRoomModal } from "../CreateRoomModal";
import Image from "next/image";

import Logo from "/public/assets/logo.svg";

const baseUrl = process.env.NEXT_PUBLIC_URL_WB || "";

export function Chat() {
  const [openModal, setOpenModal] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const new_socket = new WebSocket(`${baseUrl}/ws/chatlist/`);
    setSocket(new_socket);
    new_socket.addEventListener("message", reciveMessage);
    return () => {
      new_socket.close();
    };
  }, []);

  function reciveMessage(event: MessageEvent<any>) {
    const data = JSON.parse(event.data);

    if (data.rooms) {
      setRooms(data.rooms);
    }

    if (data.room) {
      setRooms((prev) => [...prev, data]);
    }
  }

  const handleSelectRoom = (room: Room) => setSelectedRoom(room);

  function handleCreateRoom(e: FormEvent, roomName: string) {
    e.preventDefault();

    if (roomName) {
      const wb_websocket = {
        room_name: roomName,
      };

      const json = JSON.stringify(wb_websocket);
      if (socket) socket.send(json);
      handleCloseModal();
    }
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      {openModal && (
        <CreateRoomModal
          closeModal={handleCloseModal}
          submit={handleCreateRoom}
        />
      )}

      <div className={styles["chat__logo"]}>
        <Image src={Logo} alt="logo" width={150} />
      </div>
      <div className={styles["chat"]}>
        <aside className={styles["chat__aside"]}>
          <h5 className={styles["chat__aside__title"]}>Chats Disponíveis</h5>

          <button
            className={styles["chat__aside__button"]}
            onClick={handleOpenModal}
          >
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

      <footer className={styles.footer}>
        Criado por: José Matheus e Yasmin Carvalho
      </footer>
    </>
  );
}
