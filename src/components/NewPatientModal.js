import { Modal } from "@mui/material";
import { useState } from "react";
import TextFieldComponent from "./TextFieldComponent";
import Button from "@/components/Button";

export default function NewPatientModal({
  open,
  setOpenNewPatientModal,
  SignUpPatient,
  message,
  setMessage,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Modal
      open={open}
      onClose={() => setOpenNewPatientModal((prev) => !prev)}
      className="flex justify-center items-center "
    >
      <div className="bg-white h-3/5 w-1/4 flex flex-col p-5 rounded">
        <button
          className="self-end"
          onClick={() => {
            setOpenNewPatientModal((prev) => !prev);
            setFirstName(""), setLastName(""), setEmail("");
          }}
        >
          ✕
        </button>
        <h2 className="font-[sora] text-xl font-semibold self-center mb-6">
          Créer un nouveau patient
        </h2>
        <div className="flex flex-col gap-4">
          <TextFieldComponent
            id="firstNameInput"
            label="Prénom *"
            valueGetter={firstName}
            valueSetter={setFirstName}
          />
          <TextFieldComponent
            id="lastNameInput"
            label="Nom *"
            valueGetter={lastName}
            valueSetter={setLastName}
          />
          <TextFieldComponent
            id="EmailInput"
            label="Email *"
            valueGetter={email}
            valueSetter={setEmail}
          />
          {!message
            ? ""
            : setTimeout(() => setMessage(""), 5000) && (
                <p className="self-center">{message}</p>
              )}
          <Button
            onClick={() => {
              SignUpPatient(firstName, lastName, email);
            }}
          >
            Créer
          </Button>
        </div>
      </div>
    </Modal>
  );
}
