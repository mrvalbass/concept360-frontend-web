import { Modal } from "@mui/material";
import { useState } from "react";
import Button from "./Button";

export default function RoutineModal({ open, setOpenRoutineModal }) {
  const [selectedExercices, setSelectedExercices] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);

  return (
    <Modal
      open={open}
      onClose={() => setOpenRoutineModal((prev) => !prev)}
      className="flex justify-center items-center "
    >
      <div className="bg-white h-3/4 w-3/4 flex flex-col items-center p-5 ">
        <h2 className="font-[sora] text-xl font-semibold">Routines</h2>
        <div className="grow flex flex-col justify-center"></div>
      </div>
    </Modal>
  );
}
