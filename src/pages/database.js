import Header from "@/components/Header";
import Exercise from "@/components/Exercise";
import Card from "@/components/Card";
import RoutineModal from "@/components/RoutineModal";
import ExerciseModal from "@/components/ExerciseModal";
import Routine from "@/components/Routine";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TextFieldComponent from "@/components/TextFieldComponent";

export default function Programs() {
  const specialist = useSelector((state) => state.users.value);
  const [openRoutineModal, setOpenRoutineModal] = useState(false);
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);
  const [message, setMessage] = useState("");
  const [searchExerciseName, setSearchExerciseName] = useState("");
  const [exerciseSearch, setExerciseSearch] = useState([]);
  // const [searchSpecialistList, setSearchSpecialistList] = useState("");
  // const [specialistSearch, setSpecialistSearch] = useState([]);

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
    routines && routines.map((routine, i) => <Routine key={i} {...routine} />);

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

  const searchExercise = (category) => {
    if (category === "exercise") {
      const list = exercises.filter((exercise) =>
        exercise.title.toLowerCase().includes(searchExerciseName.toLowerCase())
      );
      setExerciseSearch(list);
    }
    // } else if (list === "routine") {
    //   const searchPatientName = specialistPatientsData.filter((patient) =>
    //     patient.user.lastName
    //       .toLowerCase()
    //       .includes(searchSpecialistList.toLowerCase())
    //   );
    //   setSpecialistSearch(searchPatientName);
    // }
  };
  console.log(exerciseSearch);

  // console.log(exercises);
  return (
    <>
      <RoutineModal
        open={openRoutineModal}
        setOpenRoutineModal={setOpenRoutineModal}
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
        className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(150deg,rgba(255,255,255,0.40)20%,rgba(6,125,93,0.40)65%,rgba(0,165,172,0.40)100%)]`}
      >
        <Card
          title="Exercices"
          displayButton
          onButtonClick={() => setOpenExerciseModal((prev) => !prev)}
          buttonText="Créer un exercice"
          className="basis-1/2"
        >
          <div className="flex justify-center items-center gap-2 pt-2">
            <TextFieldComponent
              id="SearchByName"
              label="Rechercher par nom d'exercice"
              valueSetter={setSearchExerciseName}
              valueGetter={searchExerciseName}
              size={"small"}
            />
            <FontAwesomeIcon
              className="text-xl duration-75 hover:scale-125 text-[#00a5ac]"
              onClick={() => searchExercise("exercise")}
              icon={faMagnifyingGlass}
            />
          </div>
          {exerciseSearch.length > 0 ? (
            exerciseSearch.map((exercise, i) => {
              return (
                <Exercise
                  key={i}
                  {...exercise}
                  icon={faXmark}
                  onIconClick={handleDelete}
                />
              );
            })
          ) : (
            <> {exercisesComponents} </>
          )}
          {/* {exercisesComponents} */}
        </Card>
        <Card
          title="Routines"
          displayButton
          onButtonClick={() => setOpenRoutineModal((prev) => !prev)}
          buttonText="Créer une routine"
          className="basis-1/2"
        >
          {routinesComponents}
        </Card>
      </main>
    </>
  );
}
