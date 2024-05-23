import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Exercice() {
  const [exercices, setExercices] = useState([]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/exercices/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setExercices(exercices.filter((exercice) => exercice._id !== id));
        } else {
          console.error("Error deleting exercice:", data.message);
        }
      })
      .catch((error) => console.error("Error deleting exercice:", error));
  };

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
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => handleDelete(exercice._id)}
            />
          </p>
        </div>
      ))}
    </div>
  );
}
