import { useEffect, useState } from "react";
import Routine from "./Routine";
import { DateCalendar } from "@mui/x-date-pickers";
import moment from "moment";
import Card from "./Card";
import Patient from "./Patient";

export default function PatientCard({
  patient,
  setOpenProgramModal,
  date,
  setDate,
  programData,
  setProgramData,
}) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    (async () => {
      if (patient) {
        const data = await fetch(
          `http://localhost:3000/programs/${patient}`
        ).then((r) => r.json());
        if (data.result) {
          setProgramData(data.userProgram);
          setNotes(data.userProgram.notes);
        }
      }
    })();
  }, [patient]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notes }),
      };
      fetch(`http://localhost:3000/programs/${programData._id}`, options);
    }, 300);
    return () => clearTimeout(timer);
  }, [notes]);

  if (Object.keys(programData).length === 0)
    return <div className="border-2 grow">No Data</div>;

  const { patient: patientData, program } = programData;
  const currentRoutine = program.find((routine) => {
    return moment(routine.date).startOf("day").isSame(date);
  });

  return (
    <div className="flex flex-col rounded grow p-5 pt-0 bg-white drop-shadow-lg max-h-[99%]">
      <div className="flex gap-10 px-10">
        <div className="flex flex-col h-full gap-5 grow py-5">
          <Patient
            firstName={patientData.user.firstName}
            lastName={patientData.user.lastName}
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
        title="Programme"
        displayButton
        buttonText="Ajouter un Programme"
        onButtonClick={() => setOpenProgramModal(true)}
        className="grow"
      >
        {currentRoutine && (
          <Routine {...currentRoutine.routine} checkbox editable />
        )}
      </Card>
    </div>
  );
}
