import { useEffect, useState } from "react";
import Routine from "./Routine";
import Image from "next/image";
import { DateCalendar } from "@mui/x-date-pickers";
import moment from "moment";

export default function PatientCard({ patientId }) {
  const [programData, setProgramData] = useState(null);
  const [date, setDate] = useState(() => moment().startOf("day"));

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
  const currentRoutine = program.find((routine) => {
    return moment(routine.date).startOf("day").isSame(date);
  });

  return (
    <div className="flex flex-col border-2 grow px-5 pb-5">
      <div className="flex gap-10 items-start justify-between px-10">
        <div className="flex flex-col h-full gap-5 grow py-5">
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
          <textarea
            className="border-2 grow bg-[#ffffff77]
            p-2"
            placeholder="Notes"
          ></textarea>
        </div>
        <div className="w-[320px]">
          <DateCalendar value={date} onChange={setDate} />
        </div>
      </div>
      <div className="border-2 grow">
        {currentRoutine ? (
          <Routine {...currentRoutine.routine} checkbox />
        ) : (
          <p>Rien de prévu aujourd'hui</p>
        )}
      </div>
    </div>
  );
}
