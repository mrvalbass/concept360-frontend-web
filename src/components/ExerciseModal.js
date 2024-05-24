import { Modal } from "@mui/material";
import { useState } from "react";
import Button from "./Button";
import { TextField, Select } from "@mui/material";

export default function ExerciceModal({ open, setOpenExerciceModal }) {
  const [renderTrigger, setRenderTrigger] = useState(false);
  const handleChange = () => {};
  return (
    <Modal
      open={open}
      onClose={() => setOpenExerciceModal((prev) => !prev)}
      className='flex justify-center items-center '>
      <div className='bg-white h-3/4 w-3/4 flex flex-col items-center gap-5 p-5 rounded'>
        <h2 className='font-[sora] text-xl font-semibold'>Exercice</h2>
        <div className=' w-[100%] flex flex-row  justify-around '>
          <div className=' flex flex-col gap-4'>
            <TextField
              className=''
              id='outlined-basic'
              label='Nom de votre exercice'
              variant='outlined'
            />
            <Select
              labelId='Spécialité'
              id='Spécialité'
              value={age}
              label='Spécialité'
              onChange={handleChange}>
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
            <Select
              labelId='Type de mouvement'
              id='Type de mouvement'
              value={age}
              label='Type de mouvement'
              onChange={handleChange}>
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
            <Select
              labelId='Partie du corp'
              id='Partie du corp'
              value={age}
              label='Partie du corps'
              onChange={handleChange}>
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
            <TextField
              className=''
              id='outlined-basic'
              label='lien vers la vidéo'
              variant='outlined'
            />
            <Button className=''>Enregistrer l'exercice</Button>
          </div>
          <div className='border'>
            <Button className=''>Supprimer l'exercice</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
