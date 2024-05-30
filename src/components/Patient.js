import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Patient({
  className,
  onClick,
  patient,
  onIconClick,
  icon,
}) {
  return (
    <div
      className={`flex justify-between items-center gap-16 py-2 px-10 border-b ${className}`}
      onClick={onClick}>
      <div className='size-12'>
        <Image
          src={patient.user?.profilePictureURL}
          width={565}
          height={601}
          alt='Patient Profile Picture'
          className={`rounded-full border-4 size-full`}
        />
      </div>
      <p className='grow'>
        {patient.user.firstName} {patient.user.lastName}
      </p>
      {icon && (
        <FontAwesomeIcon
          className='text-xl duration-75 hover:scale-125 active:scale-100 text-[#00a5ac]'
          onClick={() => onIconClick(patient)}
          icon={icon}
        />
      )}
    </div>
  );
}
