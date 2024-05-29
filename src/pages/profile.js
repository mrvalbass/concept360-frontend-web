import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Header from "@/components/Header";
import TextFieldComponent from "@/components/TextFieldComponent";
import PasswordModal from "@/components/PasswordModal";
import PasswordComponent from "@/components/PasswordComponent";
import SelectForm from "@/components/SelectForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ChangeConnectionState, updatePicture } from "@/reducers/users";
import Image from "next/image";
// import { CloudinaryContext, Image, Transformation } from "cloudinary-react";

export default function Others() {
  const dispatch = useDispatch();
  const router = useRouter();
  const specialist = useSelector((state) => state.users.value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [message, setMessage] = useState("");
  const [showMyInfo, setShowMyInfo] = useState(false);
  const [showAddSpecialist, setShowAddSpecialist] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const uploadPicture = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append("photoFromFront", file);

      formData.append("token", localStorage.getItem("token"));

      const data = await fetch("http://localhost:3000/users/upload", {
        method: "POST",
        body: formData,
      }).then((response) => response.json());

      dispatch(updatePicture(data.url));
      setLoading(false);
    }
  };
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
      if (response.error === "User already exist") {
        setMessage("l'adresse email est déjà utilisée");
      } else if (response.result) {
        setMessage("Le spécialiste a bien été créé");
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
      <Header />
      <main className="flex flex-row min-h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]">
        <div className="flex justify-center w-2/6 py-14 rounded bg-white drop-shadow-lg max-h-[99%]">
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-row">
                <Image
                  src={
                    loading || !!!specialist.user
                      ? "/loading.gif"
                      : specialist.user?.profilePictureURL
                  }
                  width={580}
                  height={601}
                  alt="Patient Profile Picture"
                  className="w-24 h-24 object-cover shadow-xl flex justify-center rounded-full"
                />
                <input
                  type="file"
                  id="upload_widget_opener"
                  style={{ display: "none" }}
                  onChange={(e) => uploadPicture(e)}
                />
                <label htmlFor="upload_widget_opener">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="cursor-pointer duration-75 hover:scale-125 active:scale-100 text-sm text-[#00a5ac]"
                  />
                </label>
              </div>

              <h2 className="font-semibold font-[sora] text-lg ">
                {specialist.user &&
                  `${specialist.user.firstName} ${specialist.user.lastName}`}
              </h2>
            </div>
            <div className="flex flex-col gap-6 pt-10 h-full">
              <Button
                onClick={() => {
                  setMessage("");
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setShowAddSpecialist(false);
                  setShowMyInfo(true);
                }}
              >
                modifier mes informations
              </Button>
              <Button
                onClick={() => {
                  setMessage("");
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setDiscipline("");
                  setShowMyInfo(false);
                  setShowAddSpecialist(true);
                }}
              >
                Ajouter un spécialiste
              </Button>
              <Button
                onClick={() => {
                  dispatch(ChangeConnectionState());
                  router.push("/login");
                }}
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center rounded grow px-20 py-10 bg-white drop-shadow-lg max-h-[99%]">
          {!showMyInfo ? (
            ""
          ) : (
            <>
              <h1 className="font-semibold font-[sora] text-lg pb-8">
                Mes informations
              </h1>
              <div className="flex flex-col items-center gap-6">
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2">
                    Prénom
                  </p>
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
                  <p className="font-semibold font-[sora] text-sm pb-2">
                    Email
                  </p>
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
          )}

          {!showAddSpecialist ? (
            ""
          ) : (
            <>
              <h1 className="font-semibold font-[sora] text-lg pb-8">
                Ajouter un spécialiste
              </h1>
              <div className="flex flex-col items-center gap-3">
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2">
                    Prénom *
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
                    Nom *
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
                    Email *
                  </p>
                  <TextFieldComponent
                    id="email"
                    label="Email"
                    valueSetter={setEmail}
                    valueGetter={email}
                    size={"small"}
                  />
                </div>
                <div>
                  <p className="font-semibold font-[sora] text-sm pb-2">
                    Spécialité *
                  </p>
                  <SelectForm
                    id="specialities"
                    label="Spécialité"
                    multiple={false}
                    valueGetter={discipline}
                    valueSetter={setDiscipline}
                    valueList={["kiné", "ostéopathe", "psychologue"]}
                    size={"small"}
                  />
                </div>

                {!message ? "" : <p>{message}</p>}
                <Button onClick={() => addNewSpecialist()}>Ajouter</Button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
