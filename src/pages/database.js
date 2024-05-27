import Header from "@/components/Header";
import Exercise from "@/components/Exercise";
import Card from "@/components/Card";
import RoutineModal from "@/components/RoutineModal";
import ExerciseModal from "@/components/ExerciseModal";
import Routine from "@/components/routine";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Programs() {
  const specialist = useSelector((state) => state.users.value);
  const [openRoutineModal, setOpenRoutineModal] = useState(false);
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleCreate = async (
    title,
    movement,
    bodyParts,
    disciplines,
    videoLinkExercice
  ) => {
    if (!title || !movement || !bodyParts || !disciplines) {
      setMessage("Un ou des champs sont vides");
    } else {
      let videoLink;
      const token = localStorage.getItem("token");
      videoLinkExercice ? (videoLink = videoLinkExercice) : (videoLink = "");
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorToken: token,
          title,
          movement,
          bodyParts,
          disciplines,
          videoLink,
          description: "",
        }),
      };
      const response = await fetch(
        "http://localhost:3000/exercises",
        options
      ).then((r) => r.json());
      if (response.result) {
        setMessage("L'exercice a bien été ajouté");
        console.log(response);
      }
    }
    setRenderTrigger((prev) => !prev);
  };
  const routinesComponents =
    routines &&
    routines.map((routine, i) => {
      console.log(routine);
      return <Routine key={i} {...routine} editable />;
    });

  const exercisesComponents =
    exercises &&
    exercises.map((exercise, i) => (
      <Exercise
        key={i}
        {...exercise}
        icon={faXmark}
        onIconClick={handleDelete}
      />
    ));

  return (
    <>
      <RoutineModal
        open={openRoutineModal}
        setOpenRoutineModal={setOpenRoutineModal}
        setRenderTrigger={setRenderTrigger}
        exercisesData={exercises}
        message={message}
      />
      <ExerciseModal
        open={openExerciseModal}
        setOpenExerciseModal={setOpenExerciseModal}
        handleCreate={handleCreate}
        message={message}
      />
      <Header />
      <main
        className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(150deg,rgba(255,255,255,0.40)20%,rgba(6,125,93,0.40)65%,rgba(0,165,172,0.40)100%)]`}>
        <Card
          title='Exercices'
          displayButton
          onButtonClick={setOpenExerciseModal}
          buttonText='Créer un exercice'
          className='basis-1/2'>
          {exercisesComponents}
        </Card>
        <Card
          title='Routines'
          displayButton
          onButtonClick={() => setOpenRoutineModal((prev) => !prev)}
          buttonText='Créer une routine'
          className='basis-1/2'>
          {routinesComponents}
        </Card>
      </main>
    </>
  );
}
