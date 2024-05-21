import { useEffect, useState } from "react";
import Routine from "./routine";

export default function PatientCard({ patientId }) {
  const [date, setDate] = useState(
    () =>
      `${new Date().getFullYear()}-${`${new Date().getMonth() + 1}`.padStart(
        2,
        "0"
      )}-${new Date().getDate()}`
  );
  const [programData, setProgramData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetch(
        `http://localhost:3000/programs/${patientId}`
      ).then((r) => r.json());
      if (data.result) {
        setProgramData(data.userProgram);
      }
    })();
  }, []);

  if (!programData) return <div>No Data</div>;

  const { patient, program } = programData;
  const currentRoutine = program.find(
    (routine) => new Date(routine.date).getTime() === new Date(date).getTime()
  );

  return (
    <>
      <div className="flex">
        <h2>{`${patient.user.firstName} ${patient.user.lastName}`}</h2>
      </div>
      <input
        type="date"
        onChange={(e) => setDate(e.nativeEvent.target.value)}
        value={date}
      />
      <div>{currentRoutine && <Routine {...currentRoutine.routine} />}</div>
    </>
  );
}
