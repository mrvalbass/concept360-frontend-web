import TextFieldComponent from "./TextFieldComponent";
import Button from "./Button";
import { useState } from "react";
import PasswordModal from "@/components/PasswordModal";
import { useSelector } from "react-redux";

export default function UpdateSpecialist({}) {
  const specialist = useSelector((state) => state.users.value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const updateSpecialist = async () => {
    if (!firstName && !lastName && !email) {
      setMessage("Tous les champs sont vides");
    } else {
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
        `http://localhost:3000/users/changeData/${specialist.user._id}`,
        options
      ).then((r) => r.json());
      if (response.result) {
        setMessage("Vos informations ont bien été modifiées");
      } else {
        setMessage("Une erreur s'est produite");
      }
    }
  };

  return (
    <>
      <PasswordModal
        open={openPasswordModal}
        setOpenNewPatientModal={setOpenPasswordModal}
        specialist={specialist}
      />
      <h1 className="font-semibold font-[sora] text-lg pb-8">
        Mes informations
      </h1>
      <div className="flex flex-col items-center gap-6">
        <div>
          <p className="font-semibold font-[sora] text-sm pb-2">Prénom</p>
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
          <p className="font-semibold font-[sora] text-sm pb-2">Email</p>
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
      <Button
        onClick={() => setOpenPasswordModal((prev) => !prev)}
        className={"m-10"}
      >
        Modifier mon mot de passe
      </Button>
    </>
  );
}
