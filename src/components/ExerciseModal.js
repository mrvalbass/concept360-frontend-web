import { useState } from "react";
import Button from "./Button";
import { Modal, CircularProgress } from "@mui/material";
import TextFieldComponent from "./TextFieldComponent";
import SelectForm from "./SelectForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

export default function ExerciceModal({
  open,
  setOpenExerciseModal,
  setRenderTrigger,
}) {
  const [title, setTitle] = useState("");
  const [movement, setMovement] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (
    title,
    movement,
    bodyParts,
    disciplines,
    videoLinkExercice
  ) => {
    if (!loading) {
      setLoading(true);
      if (!title || !movement || !bodyParts || !disciplines) {
        setMessage(<FontAwesomeIcon icon={faBan} />);
      } else {
        let videoLink;
        const token = localStorage.getItem("token");
        videoLinkExercice ? (videoLink = videoLinkExercice) : (videoLink = "");
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            creatorToken: token,
            title,
            movement,
            bodyParts,
            disciplines,
            videoLink,
            description: "",
          }),
        };
        const response = await fetch(
          "https://concept360-backend-five.vercel.app/exercises",
          options
        ).then((r) => r.json());
        if (response.result) {
          setMessage(<FontAwesomeIcon icon={faCheck} />);
          setOpenExerciseModal(false);
          setTitle("");
          setMovement("");
          setBodyParts([]);
          setDisciplines([]);
          setVideoLink("");
        } else {
          setMessage(<FontAwesomeIcon icon={faBan} />);
        }
      }
      setLoading(false);
    }
    setRenderTrigger((prev) => !prev);
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
        onClick={() =>
          handleCreate(title, movement, bodyParts, disciplines, videoLink)
        }
        className="items-center w-40 !bg-[#00a5ac]"
      >
        Enregistrer
      </Button>
    );
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpenExerciseModal((prev) => !prev)}
      className="flex justify-center items-center "
    >
      <div className="bg-white w-[25%] flex flex-col items-center p-10 rounded relative gap-6">
        <button
          className="absolute top-2 right-3"
          onClick={() => {
            setOpenExerciseModal((prev) => !prev);
          }}
        >
          ✕
        </button>
        <h2 className="font-[sora] text-xl font-semibold">Nouvel Exercice</h2>
        <div className=" flex flex-col w-full gap-4">
          <TextFieldComponent
            id="exerciseName"
            label="Nom de votre exercice *"
            valueGetter={title}
            valueSetter={setTitle}
          />
          <SelectForm
            id="specialities"
            label="Spécialité *"
            multiple={true}
            valueGetter={disciplines}
            valueSetter={setDisciplines}
            valueList={[
              "Coaching sportif",
              "Diététique",
              "Kinésithérapie",
              "Ostéopathie",
              "Psychologie",
            ]}
          />
          <SelectForm
            id="movement"
            label="Mouvement *"
            multiple={false}
            valueGetter={movement}
            valueSetter={setMovement}
            valueList={[
              "Gait / Carry (Locomotion / Transport)",
              "Hinge (Pliage à la charnière de hanche)",
              "Lunge (Fente)",
              "Pull (Tirage)",
              "Push (Poussée)",
              "Squat (Accroupissement)",
              "Twist (Rotation / Anti-rotation)",
              "Aucun (none)",
            ]}
          />
          <SelectForm
            id="bodyParts"
            label="
              Membre engagé *"
            multiple={true}
            valueGetter={bodyParts}
            valueSetter={setBodyParts}
            valueList={[
              "Abdomen",
              "Avant-bras",
              "Bras",
              "Cervicale",
              "Chevilles",
              "Coudes",
              "Cuisses",
              "Dos",
              "Doigts",
              "Épaules",
              "Genoux",
              "Hanches",
              "Ischio-jambiers",
              "Lombaires",
              "Main",
              "Mollets",
              "Nuque",
              "Orteils",
              "Poignets",
              "Poitrine",
              "Pieds",
            ]}
          />
          <TextFieldComponent
            id="videoLink"
            label="lien vers la vidéo"
            valueGetter={videoLink}
            valueSetter={setVideoLink}
          />
        </div>
        {saveButton}
      </div>
    </Modal>
  );
}
