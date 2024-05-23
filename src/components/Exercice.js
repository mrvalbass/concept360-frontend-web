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
    <div className='grid grid-cols-2 gap-4 place-content-around  p-2 m-3 border-b'>
      <div>
        <div>
          <p className='flex items-center justify-start font-medium text-base font-[Sora]'>
            {title}
          </p>
        </div>
        <div className='flex flex-row items-center justify-start '>
          <p className='flex items-center justify-start '>{movement}</p>
          <p className='flex items-center justify-start '>{bodyPart}</p>
        </div>
      </div>
      <p className='flex items-center justify-end  text-xl duration-75 hover:scale-110 text-[#067D5D]'>
        <FontAwesomeIcon icon={faXmark} onClick={() => handleDelete()} />
      </p>
    </div>
  );
}
