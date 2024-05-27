import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Patient(props) {
  return (
    <>
      <div
        className={`flex justify-between items-center gap-16 py-2 px-10 border-b ${props.className}`}
        onClick={props.onClick}
      >
        <div className="shrink-0">
          <Image
            src="/gigachad.jpg"
            width={565}
            height={601}
            alt="Patient Profile Picture"
            className={`rounded-full border-4 w-12`}
          />
        </div>
        <p className="grow">
          {props.firstName} {props.lastName}
        </p>
        {props.icon && (
          <FontAwesomeIcon
            className="text-xl duration-75 hover:scale-125 text-[#00a5ac]"
            onClick={() => props.function(props.patient)}
            icon={props.icon}
          />
        )}
      </div>
    </>
  );
}
