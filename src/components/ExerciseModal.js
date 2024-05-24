import { Modal } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

export default function ExerciceModal({ open, setOpenExerciceModal }) {
  const [selectedExercices, setSelectedExercices] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);

  return (
    <Modal
      open={open}
      onClose={() => setOpenExerciceModal((prev) => !prev)}
      className='flex justify-center items-center '>
      <div className='bg-white h-1/2 w-1/2 flex flex-col items-center p-5 '>
        <h2 className='font-[sora] text-xl font-semibold'>Exercice</h2>
        <div className='grow flex flex-col justify-center'>
          <Button>
            <FontAwesomeIcon icon={faAdd} className='text-4xl' />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
