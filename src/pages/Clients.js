import Header from "@/components/Header";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import PatientCard from "@/components/PatientCard";

export default function Clients() {
  const user = useSelector((state) => state.users.value);
  const [patientData, setPatientData] = useState([]);
  const [specialistList, setSpecialistList] = useState([]);

  useEffect(() => {
    const getPatientData = async () => {
      const patientData = await fetch(
        "http://localhost:3000/users/state/patient"
      ).then((r) => r.json());
      setPatientData(patientData.Patient);
      const specialistData = await fetch(
        `http://localhost:3000/users/getPatient/${user._id}`
      ).then((r) => r.json());
      setSpecialistList(specialistData);
    };
    getPatientData();
  }, []);

  console.log("list des patients", patientData);
  console.log("je suis le user", user);

  const addToSpecialist = async (index) => {
    const data = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    const response = await fetch(
      `http://localhost:3000/users/addPatient/:${user._id}`,
      data
    ).then((r) => r.json());
    patientData[index];
  };

  const patientList = patientData.map((patient, i) => {
    return (
      <>
        <div className={"flex flex-row gap-5"} key={i}>
          <div>firstName : {patient.user.firstName}</div>
          <div>lastName : {patient.user.lastName}</div>
          <FontAwesomeIcon
            onClick={() => addToSpecialist(i)}
            icon={faSquarePlus}
          />
        </div>
      </>
    );
  });

  return (
    <>
      <Header />
      <main
        className={`flex flex-col gap-5 min-h-[90vh] p-5 items-center justify-center`}
      >
        <div>Pages des Clients de Mr. {user.lastName}</div>
        <div className={"flex flex-row min-w-full justify-between"}>
          <div>
            <div>All patients</div>
            {patientList}
          </div>
          <div>
            <div>My patients</div>
          </div>
        </div>
      </main>
    </>
  );
}
