import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faXmark,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Routine({
  _id,
  exercises,
  programId,
  programRoutineId,
  checkbox,
  update,
  remove,
  add,
  onRemove,
  onAdd,
  onUpdate,
  setRenderTrigger,
}) {
  const [done, setDone] = useState(checkbox);

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
    const response = await fetch(
      `http://localhost:3000/programs/toggleDone/${programId}`,
      options
    ).then((r) => r.json());
    setRenderTrigger((prev) => !prev);
  };

  const exercisesList = exercises.map((exercise, i) => (
    <div key={i} className="flex items-center gap-2">
      <p className="basis-1/2 font-[500]"> {`${exercise.exercise.title}`}</p>
      <div className="basis-1/4">
        <p className="text-xs">Séries</p>
        <p>{exercise.sets}</p>
      </div>
      <div className="basis-1/4">
        <p className="text-xs">Répétitions</p>
        <p>{exercise.reps}</p>
      </div>
    </div>
  ));

  return (
    <div className="border-b flex py-2 px-5">
      <div className="grow flex flex-col gap-2">{exercisesList}</div>
      <div className="flex items-center gap-2 text-[#00a5ac]">
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
            icon={faPen}
            className="cursor-pointer duration-75 hover:scale-125 active:scale-100"
            onClick={() => onUpdate(_id)}
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
  );
}
