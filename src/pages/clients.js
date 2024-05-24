import Header from "@/components/Header";
import Card from "@/components/Card";
import Patient from "@/components/Patient";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { faSquarePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Clients() {
  const specialist = useSelector((state) => state.users.value);
  const [patientsData, setPatientsData] = useState([]);
  const [specialistPatientsData, setSpecialistsPatientsData] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    (async () => {
      const patientsData = await fetch(
        "http://localhost:3000/users/patients"
      ).then((r) => r.json());
      setPatientsData(patientsData.patients);

      if (Object.keys(specialist).length !== 0) {
        const specialistPatientsData = await fetch(
          `http://localhost:3000/users/patients/specialist/${specialist._id}`
        ).then((r) => r.json());
        setSpecialistsPatientsData(specialistPatientsData.patients);
      } else {
        setTimeout(() => setReRender((prev) => !prev), 100);
      }
    })();
  }, [reRender]);

  const addToSpecialistPatients = async (patient) => {
    if (
      !specialistPatientsData.find((element) => element._id === patient._id)
    ) {
      const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          specialistId: specialist._id,
          patientId: patient._id,
        }),
      };
      await fetch(
        `http://localhost:3000/users/specialists/addPatient/`,
        data
      ).then((r) => r.json());
    }
    setReRender(!reRender);
  };

  const deleteFromSpecialistPatients = async (patient) => {
    const data = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        specialistId: specialist._id,
        patientId: patient._id,
      }),
    };
    await fetch(
      `http://localhost:3000/users/specialists/deletePatient/`,
      data
    ).then((r) => r.json());
    setReRender(!reRender);
  };

  const patientsDataFiltered = patientsData.filter(
    (patient) =>
      !specialistPatientsData.find((element) => patient._id === element._id)
  );

  const patients = patientsDataFiltered.map((patient, i) => {
    return (
      <Patient
        key={i}
        firstName={patient.user.firstName}
        lastName={patient.user.lastName}
        function={addToSpecialistPatients}
        patient={patient}
        icon={faSquarePlus}
      />
    );
  });

  const specialistPatients = specialistPatientsData
    .map((patient, i) => {
      return (
        <Patient
          key={i}
          firstName={patient.user.firstName}
          lastName={patient.user.lastName}
          function={deleteFromSpecialistPatients}
          patient={patient}
          icon={faTrashCan}
        />
      );
    })
    .reverse();

  return (
    <>
      <Header />
      <main
        className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]`}
      >
        <Card
          title="Patients du Cabinet"
          displayButton
          buttonText="Ajouter un patient"
        >
          {" "}
          {patients}
        </Card>
        <Card title="Mes Patients"> {specialistPatients}</Card>
      </main>
    </>
  );
}
