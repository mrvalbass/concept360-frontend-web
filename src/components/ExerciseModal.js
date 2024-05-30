import { useState } from "react";
import Button from "./Button";
import { Modal } from "@mui/material";
import TextFieldComponent from "./TextFieldComponent";
import SelectForm from "./SelectForm";

export default function ExerciceModal({
  open,
  setOpenExerciseModal,
  handleCreate,
  message,
}) {
  const [title, setTitle] = useState("");
  const [movement, setMovement] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  return (
    <Modal
      open={open}
      onClose={() => setOpenExerciseModal((prev) => !prev)}
      className="flex justify-center items-center "
    >
      <div className="bg-white h-3/4 w-2/4 flex flex-col items-center p-5 rounded">
        <button
          className="self-end"
          onClick={() => {
            setOpenExerciseModal((prev) => !prev);
          }}
        >
          ✕
        </button>
        <h2 className="font-[sora] text-xl font-semibold">Nouvel Exercice</h2>
        <div className=" w-[100%] flex flex-row  justify-around ">
          <div className=" flex flex-col gap-4">
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
            <p className="self-center">{message}</p>
            <Button
              onClick={() => {
                handleCreate(
                  title,
                  movement,
                  bodyParts,
                  disciplines,
                  videoLink
                ),
                  setTitle(""),
                  setMovement(""),
                  setBodyParts([]),
                  setDisciplines([]),
                  setVideoLink("");
              }}
            >
              Enregistrer l'exercice
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
