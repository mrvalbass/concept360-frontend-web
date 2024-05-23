import Header from "@/components/Header";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

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
    setReRender(!reRender);
  };

  const patientList = allPatientData.map((patient, i) => {
    return (
      <>
        <div className={"flex flex-row gap-5"} key={i}>
          <div>firstName : {patient.user.firstName}</div>
          <div>lastName : {patient.user.lastName}</div>
          <FontAwesomeIcon
            onClick={() => addToSpecialistList(patient)}
            icon={faSquarePlus}
          />
        </div>
      </>
    );
  });

  const patientListInSpecialistList = patientInSpecialistList.map(
    (patient, i) => {
      return (
        <>
          <div className={"flex flex-row gap-5"} key={i}>
            <div>firstName : {patient.user.firstName}</div>
            <div>lastName : {patient.user.lastName}</div>
          </div>
        </>
      );
    }
  );

  return (
    <>
      <Header />
      <main
        className={`flex flex-col gap-5 min-h-[90vh] p-5 items-center justify-center`}
      >
        <div>Pages des Clients de Mr. {specialist.user.lastName}</div>
        <div className={"flex flex-row min-w-full justify-between"}>
          <div>
            <div>All patients</div>
            {patientList}
          </div>
          <div>
            <div>My patients</div>
            {patientListInSpecialistList}
          </div>
        </div>
      </main>
    </>
  );
}
