import { Modal } from "@mui/material";
import { useState } from "react";
import Card from "./Card";
import Exercice from "./Exercice";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import ExerciceRoutine from "./ExerciceRoutine";

export default function RoutineModal({
  open,
  setOpenRoutineModal,
  exercicesData,
}) {
  const [selectedExercices, setSelectedExercices] = useState([]);

  const handleAddToRoutine = async (id) => {
    const selectedExercice = await fetch(
      `http://localhost:3000/exercices/filter?_id=${id}`
    ).then((r) => r.json());
    setSelectedExercices([...selectedExercices, ...selectedExercice.data]);
  };

  console.log(selectedExercices);
  const routine = selectedExercices.map((exercice, i) => (
    <ExerciceRoutine key={i} {...exercice} />
  ));

  const exercices = exercicesData.map((exercice, i) => (
    <Exercice
      key={i}
      {...exercice}
      icon={faAdd}
      onIconClick={handleAddToRoutine}
    />
  ));

  return (
    <Modal
      open={open}
      onClose={() => setOpenRoutineModal((prev) => !prev)}
      className="flex justify-center items-center "
    >
      <div className="bg-white h-3/4 w-3/4 flex flex-col gap-5 p-5 rounded">
        <h2 className="font-[sora] text-xl font-semibold self-center">
          Routines
        </h2>
        <div className="flex gap-5 grow overflow-y-hidden">
          <Card title="Exercices">{exercices}</Card>
          <Card title="Ma routine" displayButton buttonText="Créer ma routine">
            {routine}
          </Card>
        </div>
      </div>
    </Modal>
  );
}
