import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button";
import TextFieldComponent from "@/components/TextFieldComponent";
import PasswordModal from "@/components/PasswordModal";
import { setUserData } from "@/reducers/users";

export default function UpdateSpecialist() {
  const dispatch = useDispatch();
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
        const specialistCopy = { ...specialist };
        specialistCopy.user = response.user;
        dispatch(setUserData(specialistCopy));
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
      />
      <h1 className="font-semibold font-[sora] text-lg ">Mes informations</h1>
      <div className="flex flex-col items-center gap-6">
        <div>
          <p className="font-semibold font-[sora] text-sm pb-2">
            Modifier votre prénom
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
            Modifier votre nom
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
            Modifier votre email
          </p>
          <TextFieldComponent
            id="email"
            label="Email"
            valueSetter={setEmail}
            valueGetter={email}
            size={"small"}
          />
        </div>
        {!message
          ? ""
          : setTimeout(() => setMessage(""), 2000) && <p>{message}</p>}
        <Button onClick={() => updateSpecialist()}>Modifier</Button>
      </div>
      <Button onClick={() => setOpenPasswordModal((prev) => !prev)}>
        Modifier mon mot de passe
      </Button>
    </>
  );
}
