import { useState } from "react";
import Button from "./Button";
import { Modal } from "@mui/material";
import TextFieldComponent from "./TextFieldComponent";
import SelectForm from "./SelectForm";

export default function UpdateExerciceModal({
  open,
  setOpenUpdateExerciseModal,
  titleUpdate,
  movementUpdate,
  bodyPartsUpdate,
  disciplinesUpdate,
  videoLinkUpdate,
  _idUpdate,
  setRenderTrigger,
}) {
  const [title, setTitle] = useState(titleUpdate);
  const [movement, setMovement] = useState(movementUpdate);
  const [bodyParts, setBodyParts] = useState(bodyPartsUpdate);
  const [disciplines, setDisciplines] = useState(disciplinesUpdate);
  const [videoLink, setVideoLink] = useState(videoLinkUpdate);
  const [message, setMessage] = useState("");

  const updateExercise = async () => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        movement,
        bodyParts,
        disciplines,
        videoLink,
      }),
    };
    const response = await fetch(
      `https://concept360-backend-five.vercel.app/exercises/${_idUpdate}`,
      options
    ).then((r) => r.json());
    if (response.result) {
      setMessage("L'exercice a bien été modifié");
      setRenderTrigger((prev) => !prev);
    } else {
      setMessage("Une erreur s'est produite");
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpenUpdateExerciseModal((prev) => !prev)}
      className="flex justify-center items-center "
    >
      <div className="bg-white h-5/6 w-2/4 flex flex-col items-center p-5 rounded">
        <button
          className="self-end"
          onClick={() => {
            setOpenUpdateExerciseModal((prev) => !prev);
          }}
        >
          ✕
        </button>
        <h2 className="font-[sora] text-xl font-semibold text-center mb-4">
          Modifier l'exercice <br />
          {titleUpdate}
        </h2>

        <div className=" w-[100%] flex flex-row justify-around">
          <div className=" flex flex-col gap-4">
            <TextFieldComponent
              id="exerciseName"
              label="Nom"
              valueGetter={title}
              valueSetter={setTitle}
            />
            <SelectForm
              id="specialities"
              label="Spécialité"
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
              label="Mouvement"
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
              label="Partie du corps"
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
            <p className="self-center">{message}</p>
            <Button onClick={() => updateExercise()}>Modifier</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
