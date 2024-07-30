import Image from "next/image";
import styles from "./ItemListChats.module.scss";
import ProfilePicture from "/public/assets/profile-user.jpg";

interface Props {
  room: Room;
  handleSelectRoom: (room: Room) => void;
}

export function ItemListChats({ room, handleSelectRoom }: Props) {
  return (
    <li
      className={`${styles["list-item"]}`}
      onClick={() => handleSelectRoom(room)}
    >
      <div className={styles["list-item__row"]}>
        <div className={styles["list-item__img"]}>
          <Image
            src={ProfilePicture}
            alt="Imagem de perfil"
            objectFit="cover"
            fill
          />
        </div>
        <div className={styles["list-item__c-texts"]}>
          <strong>{room.room}</strong>
        </div>

        <time className={styles["list-item__time"]}>11:30</time>
      </div>
    </li>
  );
}
