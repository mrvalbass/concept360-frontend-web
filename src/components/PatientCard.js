import { useEffect, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { Skeleton } from "@mui/material";
import moment from "moment";
import Card from "./Card";
import Patient from "./Patient";
import Routine from "./Routine";
import { useSelector } from "react-redux";

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
  const specialist = useSelector((state) => state.users.value);

  useEffect(() => {
    (async () => {
      if (patient) {
        const data = await fetch(
          `http://localhost:3000/programs/${specialist._id}/${patient}`
        ).then((r) => r.json());
        if (data.result) {
          setProgramData(data.userProgram);
          if (data.userProgram.notes) setNotes(data.userProgram.notes);
          else setNotes("");
        }
      }
    })();
  }, [patient, renderTrigger]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notes }),
      };
      fetch(
        `http://localhost:3000/programs/saveNotes/${programData._id}`,
        options
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [notes]);

  if (Object.keys(programData).length === 0)
    return (
      <Skeleton variant='rounded' animation='wave' className='grow !h-[99%]' />
    );

  const handleRemove = async (programRoutineId) => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        programRoutine: programRoutineId,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/programs/deleteRoutine/${programData._id}`,
      options
    ).then((r) => r.json());
    setRenderTrigger((prev) => !prev);
  };

  const { patient: patientData, program } = programData;
  const currentRoutine = program.filter((routine) => {
    return moment(routine.date).startOf("day").isSame(date);
  });

  return (
    <div className='flex flex-col rounded grow p-5 pt-0 bg-white drop-shadow-lg max-h-[99%]'>
      <div className='flex gap-10 px-10'>
        <div className='flex flex-col h-full gap-5 grow py-5'>
          <Patient
            firstName={patientData.user.firstName}
            lastName={patientData.user.lastName}
            className='px-0 gap-4 border-none '
            imgSize='16'
          />
          <textarea
            className='border-2 grow bg-[#ffffff77]
            p-2'
            placeholder='Notes'
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            value={notes}></textarea>
        </div>
        <div className='w-[320px]'>
          <DateCalendar value={date} onChange={setDate} />
        </div>
      </div>
      <Card
        title='Programme'
        displayButton
        buttonText='Ajouter un Programme'
        onButtonClick={() => setOpenProgramModal(true)}
        className='grow min-h-0'>
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
            />
          ))}
      </Card>
    </div>
  );
}
