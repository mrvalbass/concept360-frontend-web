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
      const routinesData = await fetch(
        "https://concept360-backend-five.vercel.app/routines/"
      ).then((r) => r.json());
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
        comment: "",
      }),
    };
    const response = await fetch(
      `https://concept360-backend-five.vercel.app/programs/addRoutine/${programData._id}`,
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
      <div className="bg-white min-w-[50vw] min-h-[50vh] max-h-[80vh] flex flex-col p-5 rounded relative">
        <button
          className="absolute top-2 right-3"
          onClick={() => {
            setOpenProgramModal((prev) => !prev);
          }}
        >
          ✕
        </button>
        <h2 className="font-[sora] text-xl font-semibold self-center">
          {`Ajouter un Programme - ${date.format("dddd DD MMMM YYYY")}`}
        </h2>
        <div className="flex gap-5 grow overflow-y-hidden justify-center">
          <Card
            title="Routines"
            className="basis-full max-w-[50vw] drop-shadow-none"
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
