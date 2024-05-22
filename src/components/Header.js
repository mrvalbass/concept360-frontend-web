import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { buttonStyle } from "../styles/style";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  const user = useSelector((state) => state.users.value);

  console.log(user);

  return (
    <div
      className={
        "flex justify-between px-9 items-center bg-[#067D5D] h-[10vh] text-white font-[Sora]"
      }
    >
      <div className="flex items-center gap-9">
        <h1 className="font-bold text-2xl">Concept 360</h1>
        <FontAwesomeIcon
          className="text-2xl duration-75 hover:scale-110"
          onClick={() => router.push("/")}
          icon={faHouse}
        />
      </div>
      <div className="flex gap-32">
        <Link className={`duration-75 hover:scale-110`} href="/Programs">
          Programmes
        </Link>
        <Link className={`duration-75 hover:scale-110`} href="/Clients">
          Mes Clients
        </Link>
        <Link className={`duration-75 hover:scale-110`} href="/Messages">
          Messages
        </Link>
        <Link className={`duration-75 hover:scale-110`} href="/Others">
          Others
        </Link>
        <Link className={`duration-75 hover:scale-110`} href="/Others">
          Profile
        </Link>
      </div>
    </div>
  );
}
