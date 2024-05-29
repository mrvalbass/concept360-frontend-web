import { Modal } from "@mui/material";
import { useState } from "react";
import Card from "./Card";
import Exercise from "./Exercise";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import ExerciseRoutine from "./ExerciseRoutine";
import uid2 from "uid2";
import { useSelector } from "react-redux";

export default function RoutineModal({
  open,
  setOpenRoutineModal,
  exercisesData,
  setRenderTrigger,
}) {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const specialist = useSelector((state) => state.users.value);

  const handleAddToRoutine = async (id) => {
    const selectedExercise = await fetch(
      `http://localhost:3000/exercises?_id=${id}`
    ).then((r) => r.json());
    selectedExercise.exercises[0].tempId = uid2(8);
    setSelectedExercises([...selectedExercises, ...selectedExercise.exercises]);
  };

  const deleteFromRoutine = async (tempId) => {
    setSelectedExercises(
      selectedExercises.filter((exercise) => {
        return exercise.tempId !== tempId;
      })
    );
  };

  const submitRoutine = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creatorToken: specialist.user.token,
        exercises: selectedExercises.map((exercise) => ({
          exercise: exercise._id,
          reps: exercise.reps,
          sets: exercise.sets,
        })),
      }),
    };
    const response = await fetch(
      "http://localhost:3000/routines",
      options
    ).then((r) => r.json());
    if (response.result) {
      setOpenRoutineModal(false);
      alert("Routine ajoutée à la Base de Données");
      setRenderTrigger((prev) => !prev);
      setSelectedExercises([]);
    } else {
      alert("Something went wrong");
    }
  };

  const routine = selectedExercises.map((exercise, i) => (
    <ExerciseRoutine
      key={i}
      title={exercise.title}
      onIconClick={deleteFromRoutine}
      tempId={exercise.tempId}
      setSelectedExercises={setSelectedExercises}
    />
  ));

  const exercises = exercisesData.map((exercise, i) => (
    <Exercise
      key={i}
      {...exercise}
      icon={faAdd}
      onIconClick={() => handleAddToRoutine(exercise._id)}
    />
  ));

  return (
    <Modal
      open={open}
      onClose={() => setOpenRoutineModal((prev) => !prev)}
      className="flex justify-center items-center "
    >
      <div className="bg-white h-3/4 w-3/4 flex flex-col p-5 rounded">
        <button
          className="self-end"
          onClick={() => {
            setOpenRoutineModal((prev) => !prev);
          }}
        >
          ✕
        </button>
        <h2 className="font-[sora] text-xl font-semibold self-center">
          Routines
        </h2>
        <div className="flex gap-5 grow overflow-y-hidden">
          <Card title="Exercices" className="basis-1/2">
            {exercises}
          </Card>
          <Card
            title="Ma routine"
            displayButton
            buttonText="Créer ma routine"
            onButtonClick={submitRoutine}
            className="basis-1/2"
          >
            {routine}
          </Card>
        </div>
      </div>
    </Modal>
  );
}
