import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { addExerciceToStore } from "../reducers/exercices";
// import { useRouter } from "next/router";

export default function Exercice() {
  // const handleDelete = ()= > {
  // }

  const [exercices, setExercices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/exercices/exerciceList")
      .then((response) => response.json())
      .then((data) => {
        setExercices(data.exercices);
      })

      .catch((error) => console.error("Error fetching exercices:", error));
  }, []);

  if (!exercices) {
    return <div className='border-2 grow'>No Data</div>;
  }

  //space-x-20 p-5
  return (
    <div className='w-[100%]'>
      {exercices.map((exercice, index) => (
        <div
          key={index}
          className='grid grid-cols-4 gap-4 place-content-between  p-2 m-3 border-b'>
          <p className='flex items-center justify-start '>{exercice.title}</p>
          <p className='flex items-center justify-start '>
            {exercice.movement}
          </p>
          <p className='flex items-center justify-start '>
            {exercice.bodyPart}
          </p>
          <p className='flex items-center justify-end  text-xl duration-75 hover:scale-110 text-[#067D5D]'>
            <FontAwesomeIcon icon={faXmark} />
          </p>
        </div>
      ))}
    </div>
  );
}
