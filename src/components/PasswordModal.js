import { Modal } from "@mui/material";
import PasswordComponent from "@/components/PasswordComponent";
import Button from "@/components/Button";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PasswordModal({ open, setOpenNewPatientModal }) {
  const specialist = useSelector((state) => state.users.value);
  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [message, setMessage] = useState("");

  const updatePassword = async () => {
    if (!actualPassword) {
      setMessage("un ou des champs sont vide(s)");
    } else if (newPassword.length < 8) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères");
    } else if (newPassword !== passwordConfirmed) {
      setMessage("Les mots de passe ne correspondent pas");
    } else {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: actualPassword,
          newPassword: newPassword,
        }),
      };
      const response = await fetch(
        `http://localhost:3000/users/changeData/${specialist.user._id}`,
        options
      ).then((r) => r.json());
      if (response.result) {
        setMessage("Votre nouveau mot de passe est enregistré");
      } else {
        setMessage("Le mot de passe est incorrect");
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpenNewPatientModal((prev) => !prev);
        setActualPassword("");
        setNewPassword("");
        setPasswordConfirmed("");
      }}
      className="flex justify-center items-center "
    >
      <div className="bg-white flex flex-col items-center px-32 py-10 rounded gap-6 relative">
        <button
          className="absolute top-3 right-5"
          onClick={() => {
            setOpenNewPatientModal((prev) => !prev);
            setActualPassword("");
            setNewPassword("");
            setPasswordConfirmed("");
          }}
        >
          ✕
        </button>
        <h2 className="font-[sora] text-xl font-semibold">
          Modifier mon mot de passe
        </h2>
        <div className="flex flex-col items-center gap-6">
          <div>
            <p className="font-semibold font-[sora] text-sm pb-2">
              Mot de passe actuel *
            </p>
            <PasswordComponent
              id="actualPassword"
              label="Mot de passe actuel"
              valueSetter={setActualPassword}
              valueGetter={actualPassword}
              size={"small"}
            />
          </div>
          <div>
            <p className="font-semibold font-[sora] text-sm pb-2">
              Nouveau mot de passe *
            </p>
            <PasswordComponent
              id="newPassword"
              label="Nouveau mot de passe"
              valueSetter={setNewPassword}
              valueGetter={newPassword}
              size={"small"}
            />
          </div>
          <div>
            <p className="font-semibold font-[sora] text-sm pb-2">
              Confirmer votre mot de passe *
            </p>
            <PasswordComponent
              id="passwordConfirmed"
              label="Confirmer"
              valueSetter={setPasswordConfirmed}
              valueGetter={passwordConfirmed}
              size={"small"}
            />
          </div>
          {!message
            ? ""
            : setTimeout(() => setMessage(""), 5000) && <p>{message}</p>}
          <Button onClick={() => updatePassword()}>Modifier</Button>
        </div>
      </div>
    </Modal>
  );
}
