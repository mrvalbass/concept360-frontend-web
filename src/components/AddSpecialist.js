import TextFieldComponent from "./TextFieldComponent";
import SelectForm from "./SelectForm";
import Button from "./Button";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function AddSpecialist({}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewSpecialist = async () => {
    setLoading(true);
    const regex =
      /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!firstName || !lastName || !email || !discipline) {
      setMessage("Des champs sont manquants");
    } else if (!regex.test(email)) {
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
        setMessage(<FontAwesomeIcon icon={faCheck} />);
      } else {
        setMessage("l'adresse email est déjà utilisée");
      }
    }
    setLoading(false);
  };

  let saveButton;
  if (loading) {
    saveButton = (
      <Button className="items-center">
        <CircularProgress size={"1rem"} />
      </Button>
    );
  } else if (message) {
    setTimeout(() => setMessage(""), 2000);
    saveButton = <Button className="items-center">{message}</Button>;
  } else {
    saveButton = (
      <Button onClick={() => addNewSpecialist()} className="items-center">
        Ajouter
      </Button>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center rounded gap-14 grow bg-white drop-shadow-lg max-h-[99%]">
      <h1 className="font-semibold font-[sora] text-3xl">
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

      {saveButton}
    </div>
  );
}
