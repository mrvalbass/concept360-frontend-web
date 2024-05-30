import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import AlertModal from "@/components/AlertModal";

export default function Patient({
  className,
  onClick,
  patient,
  onIconClick,
  icon,
}) {
  const [openAlertModal, setOpenAlertModal] = useState(false);

  const handleClick = () => {
    if (icon.iconName === "trash-can") {
      setOpenAlertModal((prev) => !prev);
    } else if (icon.iconName === "square-plus") {
      onIconClick(patient);
    }
  };

  return (
    <>
      <AlertModal
        open={openAlertModal}
        setOpenAlertModal={setOpenAlertModal}
        content={`Etes-vous sûr de vouloir supprimer ce patient de votre liste ?`}
        onClickDelete={onIconClick}
        _id={patient}
      />
      <div
        className={`flex justify-between items-center gap-16 py-2 px-10 border-b ${className}`}
        onClick={onClick}>
        <div className='size-12'>
          <Image
            src={patient.user?.profilePictureURL}
            width={565}
            height={601}
            alt='Patient Profile Picture'
            className={`rounded-full border-2 size-full`}
          />
        </div>
        <p className='grow'>
          {patient.user.firstName} {patient.user.lastName}
        </p>
        {icon && (
          <FontAwesomeIcon
            className='text-xl duration-75 hover:scale-125 active:scale-100 text-[#00a5ac]'
            onClick={() => handleClick()}
            icon={icon}
          />
        )}
      </div>
    </>
  );
}
