import { Modal, TextField } from "@mui/material";
import { useState } from "react";
import Button from "@/components/Button";

export default function NewPatientModal({
  open,
  setOpenNewPatientModal,
  SignUpPatient,
  message,
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
          <TextField
            id="firstNameInput"
            label="Prénom *"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <TextField
            id="lastNameInput"
            label="Nom *"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <TextField
            id="EmailInput"
            label="Email *"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p className="self-center">{message}</p>
          <Button
            onClick={() => {
              SignUpPatient(firstName, lastName, email),
                setFirstName(""),
                setLastName(""),
                setEmail("");
            }}
          >
            Créer
          </Button>
        </div>
      </div>
    </Modal>
  );
}
