import Card from "@/components/Card";
import Header from "@/components/Header";
import Patient from "@/components/Patient";
import Routine from "@/components/Routine";
import Filter from "@/components/Filter";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Home() {
  const specialist = useSelector((state) => state.users.value);
  const [specialistPatientsData, setSpecialistsPatientsData] = useState([]);
  const [searchSpecialistList, setSearchSpecialistList] = useState("");
  const [specialistSearch, setSpecialistSearch] = useState([]);
  const [routines, setRoutines] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (Object.keys(specialist).length !== 0) {
        const specialistPatientsData = await fetch(
          `http://localhost:3000/users/patients/specialist/${specialist._id}`
        ).then((r) => r.json());
        setSpecialistsPatientsData(specialistPatientsData.patients);
      }
    })();
  }, [specialist]);

  const specialistPatients = specialistPatientsData
    .map((patient, i) => {
      return (
        <Patient
          key={i}
          firstName={patient.user.firstName}
          lastName={patient.user.lastName}
          patient={patient}
          className="gap-4 px-5 cursor-pointer duration-100 hover:scale-90 active:scale-100"
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

  useEffect(() => {
    (async () => {
      if (Object.keys(specialist).length !== 0) {
        const routinesData = await fetch(
          "http://localhost:3000/routines/"
        ).then((r) => r.json());
        setRoutines(routinesData.routines);
      }
    })();
  }, [specialist]);

  const routinesComponents =
    routines &&
    routines.map((routine, i) => (
      <Routine
        key={i}
        {...routine}
        title={routine.exercises.title}
        className="gap-4 px-5 cursor-pointer duration-100 hover:scale-90 active:scale-100"
      />
    ));

  return (
    <>
      <Header />
      {Object.keys(specialist).length !== 0 ? (
        <main
          className={`flex justify-center p-10 h-[90vh] gap-10 bg-[linear-gradient(150deg,rgba(255,255,255,0.40)20%,rgba(6,125,93,0.40)65%,rgba(0,165,172,0.40)100%)]`}
        >
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
                      firstName={patient.user.firstName}
                      lastName={patient.user.lastName}
                      patient={patient}
                      className="gap-4 px-5 cursor-pointer duration-100 hover:scale-90 active:scale-100"
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
          <Card title="Routines" className="basis-1/2 overflow-hidden">
            {routinesComponents}
          </Card>
        </main>
      ) : (
        <main className="flex justify-center items-center h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]">
          Loading ...
        </main>
      )}
    </>
  );
}
