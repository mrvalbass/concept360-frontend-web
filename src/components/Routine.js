import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faXmark,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import RoutineModal from "./RoutineModal";

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
}) {
  const [done, setDone] = useState(checkbox);
  const [showModal, setShowModal] = useState(false);

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
      `http://localhost:3000/programs/toggleDone/${programId}`,
      options
    ).then((r) => r.json());
    setRenderTrigger((prev) => !prev);
  };

  const exercisesList =
    exercises &&
    exercises.map((exercise, i) => (
      <div key={i} className=" flex items-center ">
        <p className="basis-3/5 font-[500] text-base">
          {" "}
          - {`${exercise.exercise.title}`}
        </p>
        <div className="basis-1/5">
          <p className="text-sm">Séries : {exercise.sets}</p>
        </div>
        <div className="basis-1/5">
          <p className="text-sm">Répétitions : {exercise.reps}</p>
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
      <div className="border-b flex p-2 m-2 gap-4">
        <div className="grow flex flex-col">{exercisesList}</div>
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
              onClick={onRemove}
            />
          )}
        </div>
      </div>
    </>
  );
}
