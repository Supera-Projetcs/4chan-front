// import { dateToNow } from "@/utils/dateFormater";
import styles from "./Message.module.scss";

interface Props {
  message: Message;
  userLogged: string;
}

export function Message({ message, userLogged }: Props) {
  const isMyMessage = message.username == userLogged;

  return (
    <div
      className={styles[isMyMessage ? "message-attendant" : "message-client"]}
    >
      <span className={styles["message__username"]}>
        {message.username} <time>11:30</time>
      </span>
      <p className={styles["message__text"]}>{message.message.message}</p>
    </div>
  );
}