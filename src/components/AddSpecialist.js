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
      if (response.result) {
        setMessage("Le spécialiste a bien été créé");
      } else {
        setMessage("l'adresse email est déjà utilisée");
      }
    }
  };
  return (
    <>
      <h1 className="font-semibold font-[sora] text-lg">
        Ajouter un spécialiste
      </h1>
      <div className="flex flex-col items-center gap-10">
        <TextFieldComponent
          id="firstName"
          label="Prénom*"
          valueSetter={setFirstName}
          valueGetter={firstName}
          size={"small"}
        />
        <TextFieldComponent
          id="lastName"
          label="Nom*"
          valueSetter={setLastName}
          valueGetter={lastName}
          size={"small"}
        />
        <TextFieldComponent
          id="email"
          label="Email*"
          valueSetter={setEmail}
          valueGetter={email}
          size={"small"}
        />
        <SelectForm
          id="specialties"
          label="Spécialité*"
          multiple={false}
          valueGetter={discipline}
          valueSetter={setDiscipline}
          valueList={["Kinésithérapie", "Ostéopathie", "Psychologie"]}
          size={"small"}
        />
      </div>

      {!message ? "" : <p>{message}</p>}
      <Button onClick={() => addNewSpecialist()}>Ajouter</Button>
    </>
  );
}
