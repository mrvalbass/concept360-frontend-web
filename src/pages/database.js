import Header from "@/components/Header";
import Exercice from "@/components/Exercice";
import Card from "@/components/Card";
import RoutineModal from "@/components/RoutineModal";
import ExerciceModal from "@/components/ExerciceModal";
import Routine from "@/components/Routine";
import { useEffect, useState } from "react";

export default function Programs() {
  const [openRoutineModal, setOpenRoutineModal] = useState(false);
  const [openExerciceModal, setOpenExerciceModal] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [exercices, setExercices] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);

  useEffect(() => {
    (async () => {
      const routinesData = await fetch("http://localhost:3000/routines/").then(
        (r) => r.json()
      );
      setRoutines(routinesData.routines);

      const exercicesData = await fetch(
        "http://localhost:3000/exercices/exerciceList"
      ).then((response) => response.json());
      setExercices(exercicesData.exercices);
    })();
  }, [renderTrigger]);

  const routinesComponents =
    routines && routines.map((routine, i) => <Routine key={i} {...routine} />);

  const exercicesComponents =
    exercices &&
    exercices.map((exercice, i) => (
      <Exercice key={i} {...exercice} setRenderTrigger={setRenderTrigger} />
    ));

  return (
    <>
      <RoutineModal
        open={openRoutineModal}
        setOpenRoutineModal={setOpenRoutineModal}
      />
      <ExerciceModal
        open={openExerciceModal}
        setOpenExerciceModal={setOpenExerciceModal}
      />
      <Header />
      <main
        className={`flex justify-center p-10 min-h-[90vh] gap-10 bg-[linear-gradient(150deg,rgba(255,255,255,0.40)20%,rgba(6,125,93,0.40)65%,rgba(0,165,172,0.40)100%)]`}>
        <Card
          title='Exercices'
          displayButton
          onButtonClick={setOpenExerciceModal}>
          {exercicesComponents}
        </Card>
        <Card
          title='Routines'
          displayButton
          onButtonClick={setOpenRoutineModal}>
          {routinesComponents}
        </Card>
      </main>
    </>
  );
}
