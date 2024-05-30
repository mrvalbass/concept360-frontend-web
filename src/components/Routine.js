import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faXmark,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import RoutineModal from "./RoutineModal";
import AlertModal from "./AlertModal";

export default function Routine({
  _id,
  exercises,
  allExercisesData,
  programId,
  programRoutineId,
  checkbox,
  update,
  remove,
  add,
  onRemove,
  onAdd,
  setRenderTrigger,
  alertMessage,
}) {
  const [done, setDone] = useState(checkbox);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    setDone(checkbox);
  }, [checkbox]);

  const handleDone = async () => {
    setDone(!done);
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        programRoutine: programRoutineId,
        done: !done,
      }),
    };
    await fetch(
      `https://concept360-backend-five.vercel.app/programs/toggleDone/${programId}`,
      options
    ).then((r) => r.json());
    setRenderTrigger((prev) => !prev);
  };

  const exercisesList =
    exercises &&
    exercises.map((exercise, i) => (
      <div key={i} className=" flex items-center gap-2">
        <p className="basis-1/2 font-[500]">{`${exercise.exercise.title}`}</p>
        <div className=" bg-[#123a5f] text-center rounded-md px-2">
          <p className="text-white text-sm">Séries : {exercise.sets}</p>
        </div>
        <div className=" bg-[#00a5ac] text-center rounded-md px-2">
          <p className=" text-white text-sm">Répétitions : {exercise.reps}</p>
        </div>
      </div>
    ));

  return (
    <>
      <RoutineModal
        setOpen={setShowModal}
        open={showModal}
        exercisesData={allExercisesData}
        updateData={exercises ? { exercises, id: _id } : undefined}
        setRenderTrigger={setRenderTrigger}
      />
      <AlertModal
        open={showAlertModal}
        setOpenAlertModal={setShowAlertModal}
        content={alertMessage}
        onClickDelete={onRemove}
      />

      <div className="border-b flex p-4 m-2 gap-4">
        <div className="grow flex flex-col gap-2">{exercisesList}</div>
        <div className="flex items-center gap-4 text-[#00a5ac] ">
          {checkbox !== undefined && (
            <input
              className="scale-[1.5]"
              type="checkbox"
              checked={done}
              onChange={() => handleDone()}
            />
          )}
          {add && (
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="cursor-pointer duration-75 hover:scale-125 active:scale-100 text-xl"
              onClick={() => onAdd(_id)}
            />
          )}
          {update && (
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="cursor-pointer duration-75 hover:scale-125 active:scale-100 text-xl"
              onClick={() => setShowModal(true)}
            />
          )}
          {remove && (
            <FontAwesomeIcon
              icon={faXmark}
              className="cursor-pointer duration-75 hover:scale-125 active:scale-100 text-xl"
              onClick={() => setShowAlertModal(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}
