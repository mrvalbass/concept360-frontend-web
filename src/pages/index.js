import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import moment from "moment";

import { Skeleton } from "@mui/material";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Patient from "@/components/Patient";
import PatientCard from "@/components/PatientCard";
import ProgramModal from "@/components/ProgramModal";
import Filter from "@/components/Filter";

export default function Programs() {
  const specialist = useSelector((state) => state.users.value);
  const [specialistPatientsData, setSpecialistsPatientsData] = useState([]);
  const [searchSpecialistList, setSearchSpecialistList] = useState("");
  const [specialistSearchData, setSpecialistSearchData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [programData, setProgramData] = useState({});
  const [date, setDate] = useState(() => moment().startOf("day"));
  const [renderTrigger, setRenderTrigger] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (Object.keys(specialist).length) {
        const response = await fetch(
          `https://concept360-backend-five.vercel.app/users/patients/specialist/${specialist._id}`
        ).then((r) => r.json());
        setSpecialistsPatientsData(
          response.patients.sort((a, b) => {
            if (a.user.lastName < b.user.lastName) return -1;
            else if (a.user.lastName > b.user.lastName) return 1;
            else {
              if (a.user.firstName < b.user.firstName) return -1;
              else if (a.user.firstName > b.user.firstName) return 1;
              else return 0;
            }
          })
        );
        const lastCheckedPatient = localStorage.getItem("lastCheckedPatient");
        const specialistPatientsId = response.patients.map(
          (patient) => patient._id
        );
        if (Object.keys(router.query).length !== 0) {
          setSelectedPatient(router.query.patient);
          localStorage.setItem("lastCheckedPatient", router.query.patient);
        } else if (
          lastCheckedPatient &&
          specialistPatientsId.includes(lastCheckedPatient)
        ) {
          setSelectedPatient(lastCheckedPatient);
        } else {
          response.patients &&
            response.patients.length &&
            setSelectedPatient(response.patients[0]._id);
        }
      }
    })();
  }, [specialist, renderTrigger]);

  const specialistPatients = specialistPatientsData.map((patient, i) => {
    return (
      <Patient
        key={i}
        firstName={patient.user.firstName}
        lastName={patient.user.lastName}
        patient={patient}
        className="gap-2 cursor-pointer duration-100 hover:scale-95 active:scale-100"
        onClick={() => {
          setSelectedPatient(patient._id),
            localStorage.setItem("lastCheckedPatient", patient._id);
        }}
      />
    );
  });

  const specialistSearch = specialistSearchData.map((patient, i) => {
    return (
      <Patient
        key={i}
        firstName={patient.user.firstName}
        lastName={patient.user.lastName}
        patient={patient}
        className="gap-4 cursor-pointer duration-100 hover:scale-95 active:scale-100"
        onClick={() => {
          setSelectedPatient(patient._id),
            localStorage.setItem("lastCheckedPatient", patient._id);
        }}
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
        setRenderTrigger={setRenderTrigger}
      />
      <Header />
      {Object.keys(specialist).length !== 0 ? (
        <main className="flex h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]">
          <Card
            title="Mes Patients"
            className="w-1/4 overflow-hidden"
            displayButton
            buttonText="Ajouter un patient"
            onButtonClick={() => router.push("/clients")}
          >
            <Filter
              id={"SearchByLastName"}
              label="Rechercher par nom"
              setterTextField={setSearchSpecialistList}
              getterTextField={searchSpecialistList}
              size={"small"}
              listToFilter={specialistPatientsData}
              category={"user"}
              setterToReturn={setSpecialistSearchData}
            />
            {specialistSearchData.length > 0 ? (
              <>{specialistSearch}</>
            ) : (
              <> {specialistPatients} </>
            )}
          </Card>

          <PatientCard
            patient={selectedPatient}
            setOpenProgramModal={setOpenProgramModal}
            date={date}
            setDate={setDate}
            programData={programData}
            setProgramData={setProgramData}
            renderTrigger={renderTrigger}
            setRenderTrigger={setRenderTrigger}
          ></PatientCard>
        </main>
      ) : (
        <Skeleton variant="rounded" animation="wave" className="m-5 !h-[99%]" />
      )}
    </>
  );
}
