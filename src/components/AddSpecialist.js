import TextFieldComponent from "./TextFieldComponent";
import SelectForm from "./SelectForm";
import Button from "./Button";
import { useState } from "react";

export default function AddSpecialist({}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [message, setMessage] = useState("");

  const addNewSpecialist = async () => {
    if (!firstName || !lastName || !email || !discipline) {
      setMessage("Un ou des champs sont vide(s)");
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
      <h1 className="font-semibold font-[sora] text-lg pb-8">
        Ajouter un spécialiste
      </h1>
      <div className="flex flex-col items-center gap-3">
        <div>
          <p className="font-semibold font-[sora] text-sm pb-2">Prénom *</p>
          <TextFieldComponent
            id="firstName"
            label="Prénom"
            valueSetter={setFirstName}
            valueGetter={firstName}
            size={"small"}
          />
        </div>
        <div>
          <p className="font-semibold font-[sora] text-sm pb-2 ">Nom *</p>
          <TextFieldComponent
            id="lastName"
            label="Nom"
            valueSetter={setLastName}
            valueGetter={lastName}
            size={"small"}
          />
        </div>
        <div>
          <p className="font-semibold font-[sora] text-sm pb-2">Email *</p>
          <TextFieldComponent
            id="email"
            label="Email"
            valueSetter={setEmail}
            valueGetter={email}
            size={"small"}
          />
        </div>
        <div>
          <p className="font-semibold font-[sora] text-sm pb-2">Spécialité *</p>
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
  );
}
