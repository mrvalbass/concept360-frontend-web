import Card from "@/components/Card";
import Header from "@/components/Header";
import Patient from "@/components/Patient";
import Routine from "@/components/routine";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const specialist = useSelector((state) => state.users.value);
  const [specialistPatientsData, setSpecialistsPatientsData] = useState([]);
  const [patient, setPatient] = useState();
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    (async () => {
      if (Object.keys(specialist).length !== 0) {
        const specialistPatientsData = await fetch(
          `http://localhost:3000/users/patients/specialist/${specialist._id}`
        ).then((r) => r.json());
        setSpecialistsPatientsData(specialistPatientsData.patients);
        setPatient(specialistPatientsData.patients[0]._id);
      }
    })();
  }, [specialist]);

  const specialistPatients = specialistPatientsData.map((patient, i) => {
    return (
      <Patient
        key={i}
        firstName={patient.user.firstName}
        lastName={patient.user.lastName}
        patient={patient}
        className='gap-4 px-5 cursor-pointer duration-100 hover:scale-90 active:scale-100'
        // onClick={() => }
      />
    );
  });

  useEffect(() => {
    (async () => {
      if (Object.keys(specialist).length !== 0) {
        const routinesData = await fetch(
          "http://localhost:3000/routines/"
        ).then((r) => r.json());
        setRoutines(routinesData.routines);
      }
    })();
  }, [specialist]);

  const routinesComponents =
    routines &&
    routines.map((routine, i) => (
      <Routine
        key={i}
        {...routine}
        title={routine.exercises.title}
        // sets={routine.exercises.type.sets}
        // reps={routine.exercises.type.reps}
        // onClick={() => }
        className='gap-4 px-5 cursor-pointer duration-100 hover:scale-90 active:scale-100'
      />
    ));

  return (
    <>
      <Header />
      {Object.keys(specialist).length !== 0 ? (
        <main
          className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(150deg,rgba(255,255,255,0.40)20%,rgba(6,125,93,0.40)65%,rgba(0,165,172,0.40)100%)]`}>
          <Card title='Mes Patients' className='w-2/5 overflow-hidden'>
            {specialistPatients}
          </Card>
          <Card title='Mes routines' className='w-2/5 overflow-hidden'>
            {routinesComponents}
          </Card>
        </main>
      ) : (
        <main className='flex justify-center items-center h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]'>
          Loading ...
        </main>
      )}
    </>
  );
}
