import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import uid2 from "uid2";

import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@mui/material";
import Card from "@/components/Card";
import Exercise from "@/components/Exercise";
import ExerciseRoutine from "@/components/ExerciseRoutine";

export default function RoutineModal({
  open,
  setOpen,
  exercisesData,
  setRenderTrigger,
  updateData,
}) {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const specialist = useSelector((state) => state.users.value);

  useEffect(() => {
    updateData &&
      setSelectedExercises([
        ...updateData.exercises.map((exerciceRoutine) => ({
          ...exerciceRoutine.exercise,
          reps: exerciceRoutine.reps,
          sets: exerciceRoutine.sets,
          tempId: uid2(8),
        })),
      ]);
  }, []);

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

  const updateRoutine = async () => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercises: selectedExercises.map((exercise) => ({
          exercise: exercise._id,
          reps: exercise.reps,
          sets: exercise.sets,
        })),
      }),
    };
    const response = await fetch(
      `http://localhost:3000/routines/${updateData.id}/updateRoutine`,
      options
    ).then((r) => r.json());
    if (response.result) {
      setOpen(false);
      setRenderTrigger((prev) => !prev);
    } else {
      alert("Something went wrong");
    }
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
      setOpen(false);
      setRenderTrigger((prev) => !prev);
      setSelectedExercises([]);
    } else {
      alert("Something went wrong");
    }
  };

  const routine = selectedExercises.map((exercise, i) => {
    return (
      <ExerciseRoutine
        key={i}
        title={exercise.title}
        onIconClick={deleteFromRoutine}
        tempId={exercise.tempId}
        setSelectedExercises={setSelectedExercises}
        updateReps={exercise.reps}
        updateSets={exercise.sets}
      />
    );
  });

  const exercises =
    exercisesData &&
    exercisesData.map((exercise, i) => (
      <Exercise
        key={i}
        {...exercise}
        icon={faSquarePlus}
        onIconClick={() => handleAddToRoutine(exercise._id)}
        setRenderTrigger={setRenderTrigger}
      />
    ));

  return (
    <Modal
      open={open}
      onClose={() => setOpen((prev) => !prev)}
      className="flex justify-center items-center "
    >
      <div className="bg-white h-3/4 w-3/4 flex flex-col p-5 rounded relative">
        <button
          className="absolute top-2 right-3"
          onClick={() => {
            setOpen((prev) => !prev);
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
            buttonText={updateData ? "Modifier ma routine" : "Créer ma routine"}
            onButtonClick={updateData ? updateRoutine : submitRoutine}
            className="basis-1/2"
          >
            {routine}
          </Card>
        </div>
      </div>
    </Modal>
  );
}
