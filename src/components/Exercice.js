import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Exercice({
  title,
  movement,
  bodyPart,
  _id,
  setRenderTrigger,
}) {
  const handleDelete = async () => {
    const deleteResponse = await fetch(
      `http://localhost:3000/exercices/${_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json());

    if (deleteResponse.result) {
      setRenderTrigger((prev) => !prev);
    } else {
      console.error("Error deleting exercice:", data.message);
    }
  };

  return (
    <div className=' flex flex-row justify-between  border-b p-3 m-3'>
      <div className=' w-[100%]'>
        <p className=' flex items-center justify-start font-semibold text-base font-[Sora] '>
          {title}
        </p>
        <div className=' flex flex-row '>
          <p className=' w-[50%]  '>Mouvement : {movement}</p>
          <p className=' w-[50%]  '>Partie du corps :{bodyPart}</p>
        </div>
      </div>

      <p className='flex items-center justify-end text-xl duration-75 hover:scale-110 text-[#067D5D] '>
        <FontAwesomeIcon icon={faXmark} onClick={() => handleDelete()} />
      </p>
    </div>
  );
}
