import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const specialist = useSelector((state) => state.users.value);
  console.log(specialist);

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
      <div className="flex gap-32 items-center">
        <Link className={`duration-75 hover:scale-110`} href="/Programs">
          Programmes
        </Link>
        <Link className={`duration-75 hover:scale-110`} href="/Clients">
          Mes Clients
        </Link>
        <Link className={`duration-75 hover:scale-110`} href="/Messages">
          Messages
        </Link>
        <Link
          href="/Profile"
          className={`flex items-center gap-4 duration-75 hover:scale-110`}
        >
          <div className="w-12 rounded-full border-4">
            <Image
              src="/gigachad.jpg"
              width={565}
              height={601}
              alt="Patient Profile Picture"
              className="rounded-full"
            />
          </div>
          <h2>
            {specialist.user &&
              `${specialist.user.firstName} ${specialist.user.lastName}`}
          </h2>
        </Link>
      </div>
    </div>
  );
}
