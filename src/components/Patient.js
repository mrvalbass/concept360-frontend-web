import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
export default function Patient(props) {
  return (
    <>
      <div
        className={
          "grid grid-cols-4 gap-4 place-content-between  p-2 m-3 border-b"
        }
        key={props.key ? props.key : 0}
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
        <p className="flex items-center justify-start ">
          Prénom : {props.firstName}
        </p>
        <p className="flex items-center justify-start ">
          Nom : {props.lastName}
        </p>
        <FontAwesomeIcon
          className="flex items-center justify-end  text-xl duration-75 hover:scale-110 text-[#067D5D]"
          onClick={() => props.function(props.patient)}
          icon={props.icon}
        />
      </div>
    </>
  );
}
