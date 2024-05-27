import Card from "@/components/Card";
import Header from "@/components/Header";
import Patient from "@/components/Patient";
import PatientCard from "@/components/patientCard";
import RoutineModal from "@/components/RoutineModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Programs() {
  const specialist = useSelector((state) => state.users.value);
  const [specialistPatientsData, setSpecialistsPatientsData] = useState([]);
  const [patient, setPatient] = useState();
  const [openRoutineModal, setOpenRoutineModal] = useState(false);
  const [exercises, setExercises] = useState([]);

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
        onClick={() => setPatient(patient._id)}
      />
    );
  });

  return (
    <>
      {/* <ProgramModal
        open={openRoutineModal}
        setOpenRoutineModal={setOpenRoutineModal}
      /> */}
      <Header />
      {Object.keys(specialist).length !== 0 ? (
        <main className='flex h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]'>
          <Card title='Mes Patients' className='w-1/4 overflow-hidden'>
            {specialistPatients}
          </Card>

          <PatientCard patient={patient}></PatientCard>
        </main>
      ) : (
        <main className='flex justify-center items-center h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]'>
          Loading ...
        </main>
      )}
    </>
  );
}
