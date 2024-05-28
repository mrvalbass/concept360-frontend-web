import Card from "@/components/Card";
import Header from "@/components/Header";
import Patient from "@/components/Patient";
import PatientCard from "@/components/PatientCard";
import ProgramModal from "@/components/ProgramModal";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

export default function Programs() {
  const specialist = useSelector((state) => state.users.value);
  const [specialistPatientsData, setSpecialistsPatientsData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [programData, setProgramData] = useState({});
  const [date, setDate] = useState(() => moment().startOf("day"));
  const router = useRouter();


  useEffect(() => {
    (async () => {
      if (Object.keys(specialist).length !== 0) {
        const specialistPatientsData = await fetch(
          `http://localhost:3000/users/patients/specialist/${specialist._id}`
        ).then((r) => r.json());
        setSpecialistsPatientsData(specialistPatientsData.patients);
        if (Object.keys(router.query).length !== 0) {
          setSelectedPatient(router.query.patient);
        } else {
          setSelectedPatient(specialistPatientsData.patients[0]._id);
        }
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
        className="gap-4 px-5 cursor-pointer duration-100 hover:scale-90 active:scale-100"
        onClick={() => setSelectedPatient(patient._id)}
      />
    );
  });

  return (
    <>
      <ProgramModal
        open={openProgramModal}
        setOpenProgramModal={setOpenProgramModal}
        date={date}
        programData={programData}
      />
      <Header />
      {Object.keys(specialist).length !== 0 ? (
        <main className='flex h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]'>
          <Card title='Mes Patients' className='w-1/4 overflow-hidden'>
            {specialistPatients}
          </Card>

          <PatientCard
            patient={selectedPatient}
            setOpenProgramModal={setOpenProgramModal}
            date={date}
            setDate={setDate}
            programData={programData}
            setProgramData={setProgramData}
          ></PatientCard>
        </main>
      ) : (
        <main className='flex justify-center items-center h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]'>
          Loading ...
        </main>
      )}
    </>
  );
}
