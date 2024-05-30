import { Modal } from "@mui/material";
import { useState } from "react";
import TextFieldComponent from "./TextFieldComponent";
import Button from "@/components/Button";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

export default function NewPatientModal({
  open,
  setOpenNewPatientModal,
  setReRender,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const SignUpPatient = async () => {
    setLoading(true);
    const regex =
      /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!firstName || !lastName || !email) {
      setMessage(<FontAwesomeIcon icon={faBan} />);
    } else if (!regex.test(email)) {
      setMessage("Email incorrect");
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
        setOpenNewPatientModal(false);
      }
    }
    setLoading(false);
    setReRender((prev) => !prev);
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
      <Button onClick={() => SignUpPatient()} className="items-center">
        Enregistrer
      </Button>
    );
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpenNewPatientModal((prev) => !prev)}
      className="flex justify-center items-center "
    >
      <div className="relative bg-white flex flex-col p-10 rounded gap-10">
        <button
          className="absolute top-2 right-3"
          onClick={() => {
            setOpenNewPatientModal((prev) => !prev);
            setFirstName(""), setLastName(""), setEmail("");
          }}
        >
          ✕
        </button>
        <h2 className="font-[sora] text-xl font-semibold ">
          Créer un nouveau patient
        </h2>
        <div className="flex flex-col gap-4 items-center">
          <TextFieldComponent
            id="firstNameInput"
            label="Prénom*"
            valueGetter={firstName}
            valueSetter={setFirstName}
          />
          <TextFieldComponent
            id="lastNameInput"
            label="Nom*"
            valueGetter={lastName}
            valueSetter={setLastName}
          />
          <TextFieldComponent
            id="EmailInput"
            label="Email*"
            valueGetter={email}
            valueSetter={setEmail}
          />
        </div>
        {saveButton}
      </div>
    </Modal>
  );
}
