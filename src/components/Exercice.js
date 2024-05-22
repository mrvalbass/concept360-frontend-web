import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExerciceToStore } from "../reducers/exercices";
// import { useRouter } from "next/router";

export default function Exercice() {
  const dispatch = useDispatch();
  //   const router = useRouter();
  //   const [exerciceData, setExerciceData] = useState(null);
  const exercices = useSelector((state) => state.exercices.value);
  const addExercice = (exerciceData) => {
    dispatch(addExerciceToStore(exerciceData));
  };
  // const handleDelete = ()= > {
  // }

  //   if (!exerciceData) return <div className='border-2 grow'>No Data</div>;

  return (
    <div className='border-4 border-[green] flex flex-row space-x-20 p-5'>
      {exercices}
      <FontAwesomeIcon
        className='text-2xl duration-75 hover:scale-110'
        onClick={() => handleDelete()}
        icon={faXmark}
      />
    </div>
  );
}
