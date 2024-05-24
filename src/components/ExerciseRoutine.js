import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ExerciceRoutine({ title, onIconClick, tempId }) {
  return (
    <div className='flex flex-col gap-4 p-2 border-b'>
      <div className='flex justify-between px-5 font-medium font-[Sora]'>
        <div>{title}</div>
        <FontAwesomeIcon
          icon={faTrash}
          className='text-[#00a5ac] hover:scale-125 cursor-pointer active:scale-100'
          onClick={() => onIconClick(tempId)}
        />
      </div>
      <div className='flex gap-5'>
        <div className='grow'>
          <TextField
            fullWidth
            id='outlined-number'
            label='Séries'
            type='number'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className='grow'>
          <TextField
            id='outlined-number'
            fullWidth
            label='Répétitions'
            type='number'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
