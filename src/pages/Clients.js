import Header from "@/components/Header";
import MyPatientList from "@/components/MyPatientList";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AllPatientList from "@/components/AllPatientList";

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

  return (
    <>
      <Header />
      <main
        className={`flex flex-col gap-5 min-h-[90vh] p-5 items-center justify-center`}
      >
        <div>Pages des Clients de Mr. {specialist.user.lastName}</div>
        <div className={"flex flex-row min-w-full justify-between"}>
          <AllPatientList
            allPatientData={allPatientData}
            addToSpecialistList={addToSpecialistList}
          />
          <MyPatientList
            patientInSpecialistList={patientInSpecialistList}
            deletePatientFromSpecialistList={deletePatientFromSpecialistList}
          />
        </div>
      </main>
    </>
  );
}
