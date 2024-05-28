import { Modal } from "@mui/material";
import Card from "./Card";
import { useEffect, useState } from "react";
import Routine from "./Routine";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

export default function ProgramModal({
  open,
  setOpenProgramModal,
  date,
  programData,
  setRenderTrigger,
}) {
  const router = useRouter();
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    (async () => {
      const routinesData = await fetch("http://localhost:3000/routines/").then(
        (r) => r.json()
      );
      setRoutines(routinesData.routines);
    })();
  }, []);

  const addRoutineToProgram = async (routineId) => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: date.toString(),
        routine: routineId,
        comment: "zboub",
      }),
    };
    const response = await fetch(
      `http://localhost:3000/programs/addRoutine/${programData._id}`,
      options
    ).then((r) => r.json());
    if (response.result) {
      setRenderTrigger((prev) => !prev);
      setOpenProgramModal(false);
    } else {
      alert("There was an error", response.error);
    }
  };

  const routinesComponents =
    routines &&
    routines.map((routine, i) => {
      return (
        <Routine
          key={i}
          {...routine}
          date={date}
          add
          onAdd={addRoutineToProgram}
        />
      );
    });

  return (
    <Modal
      open={open}
      onClose={() => setOpenProgramModal(false)}
      className="flex justify-center items-center "
    >
      <div className="bg-white h-3/4 w-3/4 flex flex-col gap-5 p-5 rounded">
        <h2 className="font-[sora] text-xl font-semibold self-center">
          {`Ajouter un Programme - ${date.format("dddd DD MMMM YYYY")}`}
        </h2>
        <div className="flex gap-5 grow overflow-y-hidden">
          <Card
            title="Routines"
            className="basis-full"
            displayButton
            buttonText="Créer une Routine"
            onButtonClick={() => router.push("/database")}
          >
            {routinesComponents}
          </Card>
        </div>
      </div>
    </Modal>
  );
}
