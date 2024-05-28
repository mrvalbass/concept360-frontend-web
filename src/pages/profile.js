import { useState } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import SelectForm from "@/components/SelectForm";
import { ChangeConnectionState } from "@/reducers/users";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import TextFieldComponent from "@/components/TextFieldComponent";
import PasswordComponent from "@/components/PasswordComponent";

export default function Others() {
  const dispatch = useDispatch();
  const router = useRouter();
  const specialist = useSelector((state) => state.users.value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [message, setMessage] = useState("");
  const [showMyInfo, setShowMyInfo] = useState(false);
  const [showAddSpecialist, setShowAddSpecialist] = useState(false);

  const updateSpecialist = async () => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/users/changeData/${specialist._id}`,
      options
    ).then((r) => r.json());
    if (response.result) {
      setMessage("Vos informations ont bien été modifiées");
    } else {
      setMessage("Une erreur s'est produite");
    }
  };

  const addNewSpecialist = async () => {
    if (!firstName || !lastName || !email || !discipline) {
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
          discipline,
          state: "specialist",
        }),
      };
      const response = await fetch(
        "http://localhost:3000/users/signup",
        options
      ).then((r) => r.json());
      if (response.error === "User already exist") {
        setMessage("l'adresse email est déjà utilisée");
      } else if (response.result) {
        setMessage("Le spécialiste a bien été créé");
      }
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-row min-h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]">
        <div className="flex justify-center w-2/6 py-14 rounded bg-white drop-shadow-lg max-h-[99%]">
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/gigachad.jpg"
                width={580}
                height={601}
                alt="Patient Profile Picture"
                className="w-24 flex justify-center rounded-full"
              />

              <h2 className="font-semibold font-[sora] text-lg ">
                {specialist.user &&
                  `${specialist.user.firstName} ${specialist.user.lastName}`}
              </h2>
            </div>
            <div className="flex flex-col gap-6 pt-10 h-full">
              <Button
                onClick={() => {
                  setMessage("");
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setShowAddSpecialist(false);
                  setShowMyInfo(true);
                }}
              >
                modifier mes informations
              </Button>
              <Button
                onClick={() => {
                  setMessage("");
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setDiscipline("");
                  setShowMyInfo(false);
                  setShowAddSpecialist(true);
                }}
              >
                Ajouter un spécialiste
              </Button>
              <Button
                onClick={() => {
                  dispatch(ChangeConnectionState());
                  router.push("/login");
                }}
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center rounded grow px-20 py-10 bg-white drop-shadow-lg max-h-[99%]">
          {!showMyInfo ? (
            <div className="h-full flex pt-16">
              <p className="font-[sora] text-8xl text-center font-semibold text-[#00a5ac]">
                Concept
                <br />
                360
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-semibold font-[sora] text-lg pb-8">
                Mes informations
              </h1>
              <div className="flex flex-col items-center gap-6">
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2">
                    Prénom
                  </p>
                  <TextFieldComponent
                    id="firstName"
                    label="Modifier votre prénom"
                    valueSetter={setFirstName}
                    valueGetter={firstName}
                    size={"small"}
                  />
                </div>
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2 ">Nom</p>
                  <TextFieldComponent
                    id="lastName"
                    label="Modifier votre nom"
                    valueSetter={setLastName}
                    valueGetter={lastName}
                    size={"small"}
                  />
                </div>
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2">
                    Email
                  </p>
                  <TextFieldComponent
                    id="email"
                    label="Modifier votre email"
                    valueSetter={setEmail}
                    valueGetter={email}
                    size={"small"}
                  />
                </div>
                {!message ? "" : <p>{message}</p>}
                <Button onClick={() => updateSpecialist()}>Modifier</Button>
              </div>
            </>
          )}

          {!showAddSpecialist ? (
            ""
          ) : (
            <>
              <h1 className="font-semibold font-[sora] text-lg pb-8">
                Ajouter un spécialiste
              </h1>
              <div className="flex flex-col items-center gap-3">
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2">
                    Prénom *
                  </p>
                  <TextFieldComponent
                    id="firstName"
                    label="Prénom"
                    valueSetter={setFirstName}
                    valueGetter={firstName}
                    size={"small"}
                  />
                </div>
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2 ">
                    Nom *
                  </p>
                  <TextFieldComponent
                    id="lastName"
                    label="Nom"
                    valueSetter={setLastName}
                    valueGetter={lastName}
                    size={"small"}
                  />
                </div>
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2">
                    Email *
                  </p>
                  <TextFieldComponent
                    id="email"
                    label="Email"
                    valueSetter={setEmail}
                    valueGetter={email}
                    size={"small"}
                  />
                </div>
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2">
                    Spécialité *
                  </p>
                  <SelectForm
                    id="specialities"
                    label="Spécialité"
                    multiple={false}
                    valueGetter={discipline}
                    valueSetter={setDiscipline}
                    valueList={["kiné", "ostéopathe", "psychologue"]}
                    size={"small"}
                  />
                </div>

                {!message ? "" : <p>{message}</p>}
                <Button onClick={() => addNewSpecialist()}>Ajouter</Button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
