import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { inputStyle, buttonStyle } from "../styles/style";
export default function Header() {
  const router = useRouter();
  return (
    <div className={"flex flex-row gap-9 items-center"}>
      <div>Concept 360</div>
      <FontAwesomeIcon onClick={() => router.push("/")} icon={faHouse} />

      <button className={buttonStyle} onClick={() => router.push("/Programs")}>
        Programs
      </button>
      <button className={buttonStyle} onClick={() => router.push("/Clients")}>
        My clients
      </button>
      <button className={buttonStyle} onClick={() => router.push("/Messages")}>
        Messages
      </button>
      <button className={buttonStyle} onClick={() => router.push("/Others")}>
        Others
      </button>
    </div>
  );
}
