import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateExerciceModal from "./UpdateExerciseModal";
import AlertModal from "./AlertModal";

export default function Exercice({
  title,
  movement,
  bodyParts,
  disciplines,
  videoLink,
  _id,
  icon,
  onIconClick,
  setRenderTrigger,
}) {
  const bodyMembers = bodyParts.join(", ");
  const [openUpdateExerciseModal, setOpenUpdateExerciseModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  return (
    <>
      <UpdateExerciceModal
        open={openUpdateExerciseModal}
        setOpenUpdateExerciseModal={setOpenUpdateExerciseModal}
        titleUpdate={title}
        movementUpdate={movement}
        bodyPartsUpdate={bodyParts}
        disciplinesUpdate={disciplines}
        videoLinkUpdate={videoLink}
        _idUpdate={_id}
        setRenderTrigger={setRenderTrigger}
      />
      <AlertModal
        open={openAlertModal}
        setOpenAlertModal={setOpenAlertModal}
        content={`Etes-vous sûr de vouloir supprimer cet exercise ? Il sera également supprimé de toutes les routines.`}
        onClickDelete={onIconClick}
        _id={_id}
      />

      <div className='flex justify-between gap-4 p-2 border-b items-center'>
        <div className='w-full'>
          <p className='flex font-semibold font-[Sora]'>{title}</p>
          <div className='flex'>
            <p className='basis-1/2 text-sm'>Mouvement : {movement}</p>
            <p className='basis-1/2 text-sm'>Membre engagé : {bodyMembers}</p>
          </div>
        </div>
        {icon && (
          <>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => setOpenUpdateExerciseModal((prev) => !prev)}
              className='cursor-pointer text-[#00a5ac] duration-75 hover:scale-125 active:scale-100 text-xl'
            />
            <FontAwesomeIcon
              icon={icon}
              onClick={
                () => setOpenAlertModal((prev) => !prev)
                // onIconClick(_id)
              }
              className='cursor-pointer text-[#00a5ac] duration-75 hover:scale-125 text-xl'
            />
          </>
        )}
      </div>
    </>
  );
}
