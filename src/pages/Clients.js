import Header from "@/components/Header";
import Card from "@/components/Card";
import Patient from "@/components/Patient";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { faSquarePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Clients() {
  const specialist = useSelector((state) => state.users.value);
  const [allPatientData, setAllPatientData] = useState([]);
  const [patientInSpecialistList, setPatientInSpecialistList] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    (async () => {
      const allPatientData = await fetch(
        "http://localhost:3000/users/state/patient"
      ).then((r) => r.json());
      setAllPatientData(allPatientData.Patient);

      const specialistData = await fetch(
        `http://localhost:3000/users/getPatientList/${specialist._id}`
      ).then((r) => r.json());
      setPatientInSpecialistList(specialistData.PatientList);
    })();
  }, [reRender]);

  const addToSpecialistList = async (patient) => {
    if (
      !patientInSpecialistList.find((element) => element._id === patient._id)
    ) {
      const data = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: patient._id,
        }),
      };
      const response = await fetch(
        `http://localhost:3000/users/addPatient/${specialist._id}`,
        data
      ).then((r) => r.json());
    }
    setReRender(!reRender);
  };

  const deletePatientFromSpecialistList = async (patient) => {
    const data = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: patient._id,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/users/deletePatient/${specialist._id}`,
      data
    ).then((r) => r.json());
    setReRender(!reRender);
  };

  const allPatientFiltred = allPatientData.filter((patient) =>
    patientInSpecialistList
      ? !patientInSpecialistList.find((element) => patient._id === element._id)
      : ""
  );

  const patientList = allPatientFiltred.map((patient, i) => {
    return (
      <Patient
        key={i}
        firstName={patient.user.firstName}
        lastName={patient.user.lastName}
        function={addToSpecialistList}
        patient={patient}
        icon={faSquarePlus}
      />
    );
  });

  const patientListInSpecialistList = patientInSpecialistList
    .map((patient, i) => {
      return (
        <Patient
          key={i}
          firstName={patient.user.firstName}
          lastName={patient.user.lastName}
          function={deletePatientFromSpecialistList}
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
        className={`flex justify-center p-10 min-h-[90vh] gap-10 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]`}
      >
        <Card title="Patients du Cabinet"> {patientList}</Card>
        <Card title="Mes Patients"> {patientListInSpecialistList}</Card>
      </main>
    </>
  );
}
