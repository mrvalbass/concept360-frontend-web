import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const specialist = useSelector((state) => state.users.value);

  const pages = [
    { title: "Programmes", path: "/" },
    { title: "Mes Patients", path: "/clients" },
    { title: "Base de Données", path: "/database" },
    {
      title: (
        <>
          <Image
            src={specialist.user?.profilePictureURL}
            width={565}
            height={601}
            alt="Patient Profile Picture"
            className="w-12 h-12 rounded-full border-2 object-cover"
          />
          <h2>
            {specialist.user &&
              `${specialist.user.firstName} ${specialist.user.lastName}`}
          </h2>
        </>
      ),
      path: "/profile",
    },
  ];

  const nav = pages.map((page, i) => (
    <Link
      key={i}
      className={`flex font-[sora] items-center gap-4 duration-75 hover:scale-110 ${
        page.path === router.pathname ? "underline font-bold" : ""
      }`}
      href={page.path}
    >
      {page.title}
    </Link>
  ));

  return (
    <div
      className={
        "flex justify-between px-9 items-center bg-[#00a5ac] h-[10vh] text-white font-[Sora]"
      }
    >
      <div className="flex items-center gap-9">
        <Link href="/" className="font-bold text-2xl">
          Concept 360
        </Link>
      </div>
      <div className="flex gap-20 items-center">{nav}</div>
    </div>
  );
}
