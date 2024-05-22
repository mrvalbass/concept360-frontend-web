import { useEffect, useState } from "react";
import Routine from "./Routine";
import Image from "next/image";

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

  if (!programData) return <div className="border-2 grow">No Data</div>;

  const { patient, program } = programData;
  const currentRoutine = program.find(
    (routine) => new Date(routine.date).getTime() === new Date(date).getTime()
  );

  return (
    <div className="flex flex-col border-2 grow p-5">
      <div className="flex items-center justify-between px-10">
        <div className="flex items-center gap-6">
          <div className="w-16 ">
            <Image
              src="/gigachad.jpg"
              width={565}
              height={601}
              alt="Patient Profile Picture"
              className="rounded-full"
            />
          </div>
          <h2>{`${patient.user.firstName} ${patient.user.lastName}`}</h2>
        </div>
        <input
          type="date"
          onChange={(e) => setDate(e.nativeEvent.target.value)}
          value={date}
        />
      </div>
      <div>
        {currentRoutine ? (
          <Routine {...currentRoutine.routine} />
        ) : (
          <p>Rien de prévu aujourd'hui</p>
        )}
      </div>
    </div>
  );
}
