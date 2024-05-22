import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addExerciceToStore } from "../reducers/exercices";
// import { useRouter } from "next/router";

export default function Exercice() {
  // const handleDelete = ()= > {
  // }

  const [exercices, setExercices] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/exercices/exerciceList")
      .then((response) => response.json())
      .then((data) => setExercices(data));
  }, []);

  //   if (!exerciceData) return <div className='border-2 grow'>No Data</div>;

  return (
    <div className='border-4 border-[green] flex flex-row space-x-20 p-5'>
      <h1>Liste des Exercices</h1>
      {exercices.map((exercice, index) => (
        <div key={index}>
          <p>{exercice.name}</p>
          <p>{exercice.specialities}</p>
          <p>{exercice.createdBy}</p>
          <FontAwesomeIcon
            className='text-2xl duration-75 hover:scale-110'
            onClick={() => handleDelete()}
            icon={faXmark}
          />
        </div>
      ))}
    </div>
  );
}
