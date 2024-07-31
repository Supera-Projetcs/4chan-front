import { FormEvent, useState } from "react";
import styles from "./CreateRoomModal.module.scss";

interface Props {
  closeModal: () => void;
  submit: (e: FormEvent, roomName: string) => void;
}

export function CreateRoomModal({ closeModal, submit }: Props) {
  const [roomName, setRoomName] = useState("");

  return (
    <div className={styles["modal-center"]}>
      <form
        className={styles["modal-center__main"]}
        onSubmit={(e) => {
          submit(e, roomName);
          setRoomName("");
        }}
      >
        <label>
          <span>Nome da sala:</span>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </label>
        <button type="submit">Criar</button>
      </form>
      <div
        className={styles["modal-center__background"]}
        onClick={closeModal}
      />
    </div>
  );
}
