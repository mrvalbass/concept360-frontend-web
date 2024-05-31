import Header from "@/components/Header";
import Exercise from "@/components/Exercise";
import Card from "@/components/Card";
import RoutineModal from "@/components/RoutineModal";
import ExerciseModal from "@/components/ExerciseModal";
import Routine from "@/components/Routine";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Filter from "@/components/Filter";

export default function Programs() {
  const [openRoutineModal, setOpenRoutineModal] = useState(false);
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);
  const [searchExerciseName, setSearchExerciseName] = useState("");
  const [exerciseSearch, setExerciseSearch] = useState([]);

  useEffect(() => {
    (async () => {
      const routinesData = await fetch(
        "https://concept360-backend-five.vercel.app/routines/"
      ).then((r) => r.json());
      setRoutines(routinesData.routines);

      const exercisesData = await fetch(
        "https://concept360-backend-five.vercel.app/exercises"
      ).then((response) => response.json());
      setExercises(exercisesData.exercises);
    })();
  }, [renderTrigger]);

  const handleDeleteExercice = async (id) => {
    const deleteResponse = await fetch(
      `https://concept360-backend-five.vercel.app/exercises/${id}`,
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

  const handleDeleteRoutine = async (id) => {
    const deleteResponse = await fetch(
      `https://concept360-backend-five.vercel.app/routines/`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routine: id }),
      }
    ).then((response) => response.json());

    if (deleteResponse.result) {
      setRenderTrigger((prev) => !prev);
    } else {
      console.error("Error deleting exercise:", deleteResponse.message);
    }
  };

  const exercisesComponents =
    exercises &&
    !!exercises.length &&
    exercises.map((exercise, i) => (
      <Exercise
        key={i}
        {...exercise}
        icon={faXmark}
        onIconClick={handleDeleteExercice}
        setRenderTrigger={setRenderTrigger}
      />
    ));

  const routinesComponents =
    routines &&
    !!routines.length &&
    routines.map((routine, i) => {
      return (
        <Routine
          key={i}
          {...routine}
          update
          allExercisesData={exercises}
          setRenderTrigger={setRenderTrigger}
          remove
          onRemove={() => handleDeleteRoutine(routine._id)}
          alertMessage="Êtes-vous sûr de vouloir supprimer cette routine ? Elle sera également supprimée de tous les programmes."
        />
      );
    });

  return (
    <>
      <RoutineModal
        open={openRoutineModal}
        setOpen={setOpenRoutineModal}
        setRenderTrigger={setRenderTrigger}
        exercisesData={exercises}
        updateId
      />
      <ExerciseModal
        open={openExerciseModal}
        setOpenExerciseModal={setOpenExerciseModal}
        setRenderTrigger={setRenderTrigger}
      />
      <Header />
      <main
        className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(150deg,rgba(255,255,255,0.40)20%,rgba(6,125,93,0.40)65%,rgba(0,165,172,0.40)100%)]`}
      >
        <Card
          title="Exercices"
          displayButton
          onButtonClick={() => setOpenExerciseModal((prev) => !prev)}
          buttonText="Créer un exercice"
          className="basis-1/2"
        >
          <div className="m-5">
            <Filter
              id={"SearchByName"}
              label="Rechercher par nom d'exercice"
              setterTextField={setSearchExerciseName}
              getterTextField={searchExerciseName}
              size={"small"}
              listToFilter={exercises}
              category={"exercise"}
              setterToReturn={setExerciseSearch}
            />
          </div>

          {searchExerciseName ? (
            exerciseSearch.map((exercise, i) => {
              return (
                <Exercise
                  key={i}
                  {...exercise}
                  icon={faXmark}
                  onIconClick={handleDelete}
                  setRenderTrigger={setRenderTrigger}
                />
              );
            })
          ) : (
            <> {exercisesComponents} </>
          )}
        </Card>
        <Card
          title="Routines"
          displayButton
          onButtonClick={() => setOpenRoutineModal((prev) => !prev)}
          buttonText="Créer une routine"
          className="basis-1/2"
        >
          <div> {routinesComponents} </div>
        </Card>
      </main>
    </>
  );
}
