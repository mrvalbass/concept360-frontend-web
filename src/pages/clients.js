import Header from "@/components/Header";
import Card from "@/components/Card";
import Patient from "@/components/Patient";
import Filter from "@/components/Filter";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { faSquarePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import NewPatientModal from "@/components/NewPatientModal";

export default function Clients() {
  const specialist = useSelector((state) => state.users.value);
  const [openNewPatientModal, setOpenNewPatientModal] = useState(false);
  const [patientsData, setPatientsData] = useState([]);
  const [specialistPatientsData, setSpecialistsPatientsData] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [message, setMessage] = useState("");
  const [searchName, setSearchName] = useState("");
  const [allPatientSearch, setAllPatientSearch] = useState([]);
  const [searchSpecialistList, setSearchSpecialistList] = useState("");
  const [specialistSearch, setSpecialistSearch] = useState([]);

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

  const SignUpPatient = async (firstName, lastName, email) => {
    if (!firstName || !lastName || !email) {
      setMessage("Un ou des champs sont vides");
    } else {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password: "Concept360",
          state: "patient",
        }),
      };
      const response = await fetch(
        "http://localhost:3000/users/signup",
        options
      ).then((r) => r.json());

      if (response.error === "User already exist") {
        setMessage("Le patient existe déjà");
      } else if (response.result) {
        setMessage("Le patient a bien été créé");
      }
    }
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
      <NewPatientModal
        open={openNewPatientModal}
        setOpenNewPatientModal={setOpenNewPatientModal}
        SignUpPatient={SignUpPatient}
        message={message}
      />
      <Header />
      <main
        className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]`}>
        <Card
          title='Patients du Cabinet'
          displayButton
          onButtonClick={() => setOpenNewPatientModal((prev) => !prev)}
          buttonText='Ajouter un patient'
          className='basis-1/2'>
          <Filter
            id={"SearchByLastName"}
            label='Rechercher par nom'
            setterTextField={setSearchName}
            getterTextField={searchName}
            size={"small"}
            listToFilter={patientsDataFiltered}
            category={"user"}
            setterToReturn={setAllPatientSearch}
          />
          {allPatientSearch.length > 0 ? (
            allPatientSearch.map((patient, i) => {
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
            })
          ) : (
            <> {patients} </>
          )}
        </Card>
        <Card title='Mes Patients' className='basis-1/2'>
          <div className='m-5'>
            <Filter
              id={"SearchByLastName"}
              label='Rechercher par nom'
              setterTextField={setSearchSpecialistList}
              getterTextField={searchSpecialistList}
              size={"small"}
              listToFilter={specialistPatientsData}
              category={"user"}
              setterToReturn={setSpecialistSearch}
            />
          </div>
          {specialistSearch.length > 0 ? (
            specialistSearch
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
              .reverse()
          ) : (
            <> {specialistPatients} </>
          )}
        </Card>
      </main>
    </>
  );
}
