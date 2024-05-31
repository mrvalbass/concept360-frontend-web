import { useEffect, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { Skeleton } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnDown } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import Patient from "./Patient";
import Routine from "./Routine";

export default function PatientCard({
  patient,
  setOpenProgramModal,
  date,
  setDate,
  programData,
  setProgramData,
  renderTrigger,
  setRenderTrigger,
}) {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const specialist = useSelector((state) => state.users.value);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (patient) {
        const data = await fetch(
          `https://concept360-backend-five.vercel.app/programs/${specialist._id}/${patient}`
        ).then((r) => r.json());
        if (data.result) {
          setProgramData(data.userProgram);
          if (data.userProgram.notes) setNotes(data.userProgram.notes);
          else setNotes("");
        }
        setLoading(false);
      } else {
        setTimeout(() => setLoading(false), 500);
      }
    })();
  }, [patient]);

  useEffect(() => {
    (async () => {
      if (patient) {
        const data = await fetch(
          `https://concept360-backend-five.vercel.app/programs/${specialist._id}/${patient}`
        ).then((r) => r.json());
        if (data.result) {
          setProgramData(data.userProgram);
          if (data.userProgram.notes) setNotes(data.userProgram.notes);
          else setNotes("");
        }
      }
    })();
  }, [renderTrigger]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notes }),
      };
      fetch(
        `https://concept360-backend-five.vercel.app/programs/saveNotes/${programData._id}`,
        options
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [notes]);

  if (loading)
    return (
      <Skeleton variant="rounded" animation="wave" className="grow !h-[99%]" />
    );
  else if (!Object.keys(programData).length)
    return (
      <div className="bg-white grow rounded flex justify-center items-center relative max-h-[99%] drop-shadow-xl">
        <p className="text-center text-xl">
          Il semblerait que vous n'ayez pas de patient assigné. <br /> Ajoutez
          un patient pour le suivre
        </p>
        <FontAwesomeIcon
          icon={faTurnDown}
          className="absolute bottom-5 left-8 text-4xl rotate-90 text-[#063d40]"
        />
      </div>
    );

  const handleRemove = async (programRoutineId) => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        programRoutine: programRoutineId,
      }),
    };
    await fetch(
      `https://concept360-backend-five.vercel.app/programs/deleteRoutine/${programData._id}`,
      options
    ).then((r) => r.json());
    setRenderTrigger((prev) => !prev);
  };

  const { patient: patientData, program } = programData;
  const currentRoutine = program.filter((routine) => {
    return moment(routine.date).startOf("day").isSame(date);
  });

  return (
    <div className="flex flex-col rounded grow p-5 pt-0 bg-white drop-shadow-lg max-h-[99%]">
      <div className="flex gap-10 px-10">
        <div className="flex flex-col h-full gap-5 grow py-5">
          <Patient
            patient={patientData}
            className="px-0 gap-4 border-none "
            imgSize="16"
          />
          <textarea
            className="border-2 grow bg-[#ffffff77]
            p-2"
            placeholder="Notes"
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            value={notes}
          ></textarea>
        </div>
        <div className="w-[320px]">
          <DateCalendar value={date} onChange={setDate} />
        </div>
      </div>
      <Card
        title={`Programme du ${date.format("dddd DD MMMM YYYY")}`}
        displayButton
        buttonText="Ajouter un Programme"
        onButtonClick={() => setOpenProgramModal(true)}
        className="grow min-h-0"
      >
        {currentRoutine &&
          currentRoutine.map((programRoutine, i) => (
            <Routine
              key={i}
              {...programRoutine.routine}
              checkbox={programRoutine.done}
              remove
              onRemove={() => handleRemove(programRoutine._id)}
              programId={programData._id}
              programRoutineId={programRoutine._id}
              setRenderTrigger={setRenderTrigger}
              alertMessage={`Cette routine va être supprimée du programme de ${patientData.user.firstName} ${patientData.user.lastName}`}
            />
          ))}
      </Card>
    </div>
  );
}
