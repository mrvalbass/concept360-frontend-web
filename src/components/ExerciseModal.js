import { useState } from "react";
import Button from "./Button";
import {
  Modal,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";

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

  const bodyPartList = [
    "dos",
    "hanches",
    "genoux",
    "jambes",
    "tête",
    "cervicales",
  ];
  const disciplinesList = ["kiné", "ostéopathe", "psychologue"];

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
            <TextField
              className=""
              id="outlined-basic"
              label="Nom de votre exercice *"
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <FormControl fullWidth>
              <InputLabel id="specialities">Spécialités *</InputLabel>
              <Select
                labelId="specialities"
                id="select_specialities"
                multiple
                value={disciplines}
                label="specialities"
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setDisciplines(
                    // On autofill we get a stringified value.
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                renderValue={(selected) => selected.join(", ")}
              >
                {disciplinesList.map((discipline) => (
                  <MenuItem key={discipline} value={discipline}>
                    <Checkbox checked={disciplines.indexOf(discipline) > -1} />
                    <ListItemText primary={discipline} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="movement">Mouvement *</InputLabel>
              <Select
                labelId="movement"
                id="select_movement"
                value={movement}
                label="movement *"
                onChange={(e) => setMovement(e.target.value)}
              >
                <MenuItem value={"twist"}>Twist</MenuItem>
                <MenuItem value={"rotation"}>Rotation</MenuItem>
                <MenuItem value={"push"}>Push</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="bodyParts">Partie du corps *</InputLabel>
              <Select
                labelId="bodyParts"
                id="select_bodyParts"
                multiple
                value={bodyParts}
                label="bodyParts *"
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setBodyParts(
                    // On autofill we get a stringified value.
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                renderValue={(selected) => selected.join(", ")}
              >
                {bodyPartList.map((bodyPart) => (
                  <MenuItem key={bodyPart} value={bodyPart}>
                    <Checkbox checked={bodyParts.indexOf(bodyPart) > -1} />
                    <ListItemText primary={bodyPart} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className=""
              id="outlined-basic"
              label="lien vers la vidéo"
              variant="outlined"
              onChange={(e) => setVideoLink(e.target.value)}
              value={videoLink}
            />
            <p className="self-center">{message}</p>
            <Button
              className=""
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
