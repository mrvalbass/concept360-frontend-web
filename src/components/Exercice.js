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
    <div className="flex justify-between items-center gap-4 p-2 border-b">
      <div>
        <p className="flex items-center justify-start font-medium text-base font-[Sora]">
          {title}
        </p>
        <div className="flex flex-row items-center justify-start ">
          <p className="flex items-center justify-start ">{movement}</p>
          <p className="flex items-center justify-start ">{bodyPart}</p>
        </div>
      </div>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          onClick={() => onIconClick(_id)}
          className="cursor-pointer text-[#00a5ac] duration-75 hover:scale-125 text-xl"
        />
      )}
    </div>
  );
}
