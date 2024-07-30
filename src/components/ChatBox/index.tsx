import { useEffect, useRef, useState } from "react";
import styles from "./Chatbox.module.scss";
import { Send } from "@mui/icons-material";
import { Message } from "@/components/Message";

const baseUrl = process.env.NEXT_PUBLIC_URL_WB || "";

interface Props {
  room: Room;
}

type WSMessagesArray = Array<Message | Joined>;

export function ChatBox({ room }: Props) {
  const messagesContent = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<WSMessagesArray>([]);
  const [myUser, setMyUser] = useState<MyUser>({ user_info: "" });
  const [msgText, setMsgText] = useState("");
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const new_socket = new WebSocket(`${baseUrl}/ws/chat/${room.room}`);
    setSocket(new_socket);
    new_socket.addEventListener("message", reciveMessage);
  }, [room]);

  function reciveMessage(event: MessageEvent<any>) {
    const data = JSON.parse(event.data);
    console.log(data);

    if (data.user_info) {
      setMyUser(data);
    }

    if (data.message || data.joined) {
      setMessages((prev) => [...prev, data]);
    }

    // if (data.rooms) {
    //   setRooms(data.rooms);
    // }

    // if (data.room) {
    //   setRooms((prev) => [...prev, data.room]);
    // }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleSendMensage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (msgText) {
      const wb_websocket = {
        message: msgText,
      };

      const json = JSON.stringify(wb_websocket);
      if (socket) socket.send(json);

      setMsgText("");
    }
  }

  function scrollToBottom() {
    if (messagesContent.current) {
      messagesContent.current.scrollTop = messagesContent.current.scrollHeight;
    }
  }

  function isMessageType(message: Joined | Message): message is Message {
    return (message as Message).message != undefined;
  }

  function SelectMessage(message: Joined | Message, index: number) {
    if (isMessageType(message)) {
      return (
        <Message
          key={`${index}-${Date.now()}`}
          message={message as Message}
          userLogged={myUser.user_info}
        />
      );
    } else {
      return <p className={styles["chat-box__joined"]}>{message.joined}</p>;
    }
  }

  return (
    <>
      <div className={styles["chat-box"]}>
        <header className={styles["chat-box__header"]}>
          <h4 className={styles["chat-box__title"]}>{room.room}</h4>
        </header>
        <div ref={messagesContent} className={styles["chat-box__main"]}>
          {messages.map(SelectMessage)}
        </div>

        <form className={styles["chat-box__form"]} onSubmit={handleSendMensage}>
          <input
            className={styles["chat-box__form__input"]}
            placeholder="Digite uma mensagem"
            name="msgText"
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
          />

          <button
            className={styles["chat-box__submit"]}
            type="submit"
            disabled={!msgText}
          >
            <span className={styles["chat-box__submit__text"]}>Enviar</span>

            <Send sx={{ fontSize: 16 }} />
          </button>
        </form>
      </div>
    </>
  );
}
