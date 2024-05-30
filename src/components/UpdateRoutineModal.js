import { useState } from "react";
import Button from "./Button";
import { Modal } from "@mui/material";
import TextFieldComponent from "./TextFieldComponent";
import SelectForm from "./SelectForm";

export default function UpdateRoutineModal({
  open,
  setOpen,
  setRenderTrigger,
}) {
  const [message, setMessage] = useState("");

  const updateRoutine = async () => {
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
      `http://localhost:3000/exercises/${_idUpdate}`,
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
              valueList={["kiné", "ostéopathe", "psychologue"]}
            />
            <SelectForm
              id="movement"
              label="Mouvement"
              multiple={false}
              valueGetter={movement}
              valueSetter={setMovement}
              valueList={["twist", "rotation", "push"]}
            />
            <SelectForm
              id="bodyParts"
              label="Partie du corps"
              multiple={true}
              valueGetter={bodyParts}
              valueSetter={setBodyParts}
              valueList={[
                "dos",
                "hanches",
                "genoux",
                "jambes",
                "tête",
                "cervicales",
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
