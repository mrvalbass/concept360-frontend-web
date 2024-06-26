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
  const [searchName, setSearchName] = useState("");
  const [allPatientSearch, setAllPatientSearch] = useState([]);
  const [searchSpecialistList, setSearchSpecialistList] = useState("");
  const [specialistSearch, setSpecialistSearch] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const patientsData = await fetch(
        "https://concept360-backend-five.vercel.app/users/patients"
      ).then((r) => r.json());
      setPatientsData(patientsData.patients);

      if (Object.keys(specialist).length !== 0) {
        const specialistPatientsData = await fetch(
          `https://concept360-backend-five.vercel.app/users/patients/specialist/${specialist._id}`
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
        `https://concept360-backend-five.vercel.app/users/specialists/addPatient/`,
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
      `https://concept360-backend-five.vercel.app/users/specialists/deletePatient/`,
      data
    ).then((r) => r.json());
    setReRender(!reRender);
  };

  const patientsDataFiltered = patientsData.filter(
    (patient) =>
      !specialistPatientsData.find((element) => patient._id === element._id)
  );

  const patients =
    patientsDataFiltered &&
    !!patientsDataFiltered.length &&
    patientsDataFiltered.map((patient, i) => {
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
        setReRender={setReRender}
      />
      <Header />
      <main
        className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]`}
      >
        <Card
          title="Tous les patients"
          displayButton
          onButtonClick={() => setOpenNewPatientModal((prev) => !prev)}
          buttonText="Créer un patient"
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
        <Card title="Mes patients" className="basis-1/2 overflow-hidden">
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
