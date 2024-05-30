import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button";
import TextFieldComponent from "@/components/TextFieldComponent";
import PasswordModal from "@/components/PasswordModal";
import { setUserData } from "@/reducers/users";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

export default function UpdateSpecialist() {
  const dispatch = useDispatch();
  const specialist = useSelector((state) => state.users.value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateSpecialist = async () => {
    if (!loading) {
      setLoading(true);
      if (!firstName && !lastName && !email) {
        setMessage(<FontAwesomeIcon icon={faBan} />);
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
          setEmail("");
          setFirstName("");
          setLastName("");
          setMessage(<FontAwesomeIcon icon={faCheck} />);
        } else {
          setMessage(<FontAwesomeIcon icon={faBan} />);
        }
      }
      setLoading(false);
    }
  };

  let saveButton;
  if (loading) {
    saveButton = (
      <Button className="items-center w-40 !bg-[#00a5ac]">
        <CircularProgress size={"1rem"} />
      </Button>
    );
  } else if (message) {
    setTimeout(() => setMessage(""), 2000);
    saveButton = (
      <Button className="items-center w-40 !bg-[#00a5ac]">{message}</Button>
    );
  } else {
    saveButton = (
      <Button
        onClick={() => updateSpecialist()}
        className="items-center w-40 !bg-[#00a5ac]"
      >
        Enregistrer
      </Button>
    );
  }

  return (
    <>
      <PasswordModal
        open={openPasswordModal}
        setOpenNewPatientModal={setOpenPasswordModal}
      />
      <div className="flex flex-col justify-center items-center rounded gap-14 grow bg-white drop-shadow-lg max-h-[99%]">
        <h1 className="font-semibold font-[sora] text-3xl ">
          Mes informations
        </h1>
        <div className="flex flex-col items-center justify-center gap-6 ">
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
          {saveButton}
        </div>
        <Button onClick={() => setOpenPasswordModal((prev) => !prev)}>
          Modifier mon mot de passe
        </Button>
      </div>
    </>
  );
}
