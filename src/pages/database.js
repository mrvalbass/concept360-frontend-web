import Header from "@/components/Header";
import Exercise from "@/components/Exercise";
import Card from "@/components/Card";
import RoutineModal from "@/components/RoutineModal";
import ExerciseModal from "@/components/ExerciseModal";
import Routine from "@/components/Routine";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Programs() {
  const [openRoutineModal, setOpenRoutineModal] = useState(false);
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);

  useEffect(() => {
    (async () => {
      const routinesData = await fetch("http://localhost:3000/routines/").then(
        (r) => r.json()
      );
      setRoutines(routinesData.routines);

      const exercisesData = await fetch("http://localhost:3000/exercises").then(
        (response) => response.json()
      );
      setExercises(exercisesData.exercises);
    })();
  }, [renderTrigger]);

  const handleDelete = async (id) => {
    const deleteResponse = await fetch(
      `http://localhost:3000/exercises/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json());

    if (deleteResponse.result) {
      setRenderTrigger((prev) => !prev);
    } else {
      console.error("Error deleting exercise:", deleteResponse.message);
    }
  };

  const routinesComponents =
    routines && routines.map((routine, i) => <Routine key={i} {...routine} />);

  const exercisesComponents =
    exercises &&
    exercises.map((exercise, i) => (
      <Exercise
        key={i}
        {...exercise}
        icon={faXmark}
        onIconClick={handleDelete}
        setRenderTrigger={setRenderTrigger}
      />
    ));

  return (
    <>
      <RoutineModal
        open={openRoutineModal}
        setOpenRoutineModal={setOpenRoutineModal}
        exercisesData={exercises}
      />
      <ExerciseModal
        open={openExerciseModal}
        setOpenExerciseModal={setOpenExerciseModal}
      />
      <Header />
      <main
        className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(150deg,rgba(255,255,255,0.40)20%,rgba(6,125,93,0.40)65%,rgba(0,165,172,0.40)100%)]`}>
        <Card
          title='Exercices'
          displayButton
          onButtonClick={setOpenExerciseModal}
          buttonText='Créer un exercice'>
          {exercisesComponents}
        </Card>
        <Card
          title='Routines'
          displayButton
          onButtonClick={setOpenRoutineModal}
          buttonText='Créer une routine'>
          {routinesComponents}
        </Card>
      </main>
    </>
  );
}
