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

  const addNewSpecialist = async () => {
    if (!firstName || !lastName || !email || !discipline) {
      setMessage("Un ou des champs sont vide(s)");
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
          valueList={[
            "Coaching sportif",
            "Diététique",
            "Kinésithérapie",
            "Ostéopathie",
            "Psychologie",
          ]}
          size={"small"}
        />
      </div>

      {!message
        ? ""
        : setTimeout(() => setMessage(""), 5000) && <p>{message}</p>}
      <Button onClick={() => addNewSpecialist()}>Ajouter</Button>
    </>
  );
}
