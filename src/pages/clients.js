import Header from "@/components/Header";
import Card from "@/components/Card";
import Patient from "@/components/Patient";
import Filter from "@/components/Filter";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

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
  const router = useRouter();

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

  const emailTest = (email) => {
    const regex =
      /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/i;

    if (!regex.test(email)) {
      return false;
    }
    const domain = email.split("@")[1];
    if (domain.includes("..")) {
      return false;
    }
    if (/^[-.]/.test(domain) || /[-.]$/.test(domain)) {
      return false;
    }
    return true;
  };

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
    } else if (!emailTest(email)) {
      setMessage("Le format de l'email est incorrect");
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
        onIconClick={addToSpecialistPatients}
        patient={patient}
        icon={faSquarePlus}
        className="gap-9 px-5"
      />
    );
  });

  const specialistPatients = specialistPatientsData
    .map((patient, i) => {
      return (
        <Patient
          key={i}
          onIconClick={deleteFromSpecialistPatients}
          patient={patient}
          icon={faTrashCan}
          className="gap-9 px-5 cursor-pointer duration-75 hover:scale-95 active:scale-100"
          onClick={() =>
            router.push({
              pathname: `/programs`,
              query: { patient: patient._id },
            })
          }
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
        setMessage={setMessage}
      />
      <Header />
      <main
        className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]`}
      >
        <Card
          title="Patients du Cabinet"
          displayButton
          onButtonClick={() => setOpenNewPatientModal((prev) => !prev)}
          buttonText="Ajouter un patient"
          className="basis-1/2"
        >
          <Filter
            id={"SearchByLastName"}
            label="Rechercher par nom"
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
                  onIconClick={addToSpecialistPatients}
                  patient={patient}
                  icon={faSquarePlus}
                />
              );
            })
          ) : (
            <> {patients} </>
          )}
        </Card>
        <Card title="Mes Patients" className="basis-1/2 overflow-hidden">
          <Filter
            id={"SearchByLastName"}
            label="Rechercher par nom"
            setterTextField={setSearchSpecialistList}
            getterTextField={searchSpecialistList}
            size={"small"}
            listToFilter={specialistPatientsData}
            category={"user"}
            setterToReturn={setSpecialistSearch}
          />
          {specialistSearch.length > 0 ? (
            specialistSearch
              .map((patient, i) => {
                return (
                  <Patient
                    key={i}
                    onIconClick={deleteFromSpecialistPatients}
                    patient={patient}
                    className="gap-9 px-5 cursor-pointer duration-75 hover:scale-95 active:scale-100"
                    icon={faTrashCan}
                    onClick={() =>
                      router.push({
                        pathname: `/programs`,
                        query: { patient: patient._id },
                      })
                    }
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
