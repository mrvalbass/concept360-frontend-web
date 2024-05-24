import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Exercice({
  title,
  movement,
  bodyParts,
  _id,
  icon,
  onIconClick,
}) {
  const bodyMembers = bodyParts.join(", ");
  return (
    <div className='flex justify-between gap-4 p-2 border-b items-center'>
      <div className='w-full'>
        <p className='flex font-semibold font-[Sora]'>{title}</p>
        <div className='flex'>
          <p className='basis-1/2'>Mouvement : {movement}</p>
          <p className='basis-1/2'>Partie du corps :{bodyMembers}</p>
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
