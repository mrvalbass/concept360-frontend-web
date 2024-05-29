import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateExerciceModal from "./UpdateExerciseModal";

export default function Exercice({
  title,
  movement,
  bodyParts,
  disciplines,
  videoLink,
  _id,
  icon,
  onIconClose,
  setRenderTrigger,
}) {
  const bodyMembers = bodyParts.join(", ");
  const [openUpdateExerciseModal, setOpenUpdateExerciseModal] = useState(false);

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
      <div className="flex justify-between gap-4 p-2 border-b items-center">
        <div className="w-full">
          <p className="flex font-semibold font-[Sora]">{title}</p>
          <div className="flex">
            <p className="basis-1/2">Mouvement : {movement}</p>
            <p className="basis-1/2">Partie du corps :{bodyMembers}</p>
          </div>
        </div>
        {icon && (
          <>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => setOpenUpdateExerciseModal((prev) => !prev)}
              className="cursor-pointer text-[#00a5ac] duration-75 hover:scale-125 text-xl"
            />
            <FontAwesomeIcon
              icon={icon}
              onClick={() => onIconClose(_id)}
              className="cursor-pointer text-[#00a5ac] duration-75 hover:scale-125 text-xl"
            />
          </>
        )}
      </div>
    </>
  );
}
