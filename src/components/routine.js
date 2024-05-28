import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faXmark,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Routine({
  _id,
  exercises,
  checkbox,
  update,
  remove,
  add,
  onDelete,
  onAdd,
  onUpdate,
}) {
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
      <div className="grow flex flex-col gap-2">
        <h2 className="font-[sora] font-semibold ">Routine n°{_id}</h2>
        {exercisesList}
        {checkbox && <input type="checkbox" />}
      </div>
      <div className="flex items-center gap-2 text-[#00a5ac]">
        {update && (
          <FontAwesomeIcon
            icon={faPen}
            className="cursor-pointer duration-75 hover:scale-125 active:scale-100"
            onUpdate={() => {
              onUpdate(_id);
            }}
          />
        )}
        {remove && (
          <FontAwesomeIcon
            icon={faXmark}
            className="cursor-pointer duration-75 hover:scale-125 active:scale-100 text-xl"
            onDelete={() => onDelete(_id)}
          />
        )}
        {add && (
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="cursor-pointer duration-75 hover:scale-125 active:scale-100 text-xl"
            onClick={() => onAdd(_id)}
          />
        )}
      </div>
    </div>
  );
}
