import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Exercice({
  title,
  movement,
  bodyPart,
  _id,
  icon,
  onIconClick,
}) {
  return (
    <div className='flex items-center justify-between gap-4 p-2 border-b'>
      <div className='w-full '>
        <p className='font-semibold font-[Sora]'>{title}</p>
        <div className=' flex flex-row  '>
          <p className=' grow '>Mouvement : {movement}</p>
          <p className=' grow '>Partie du corps : {bodyPart}</p>
        </div>
      </div>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          onClick={() => onIconClick(_id)}
          className='cursor-pointer text-[#00a5ac] duration-75 hover:scale-125 text-xl'
        />
      )}
    </div>
  );
}
