import Button from "./Button";

export default function Card({
  title,
  displayButton,
  onButtonClick,
  buttonText,
  className,
  children,
}) {
  return (
    <div
      className={`flex justify-between flex-col bg-white p-2 rounded shadow-md max-h-[99%] ${className}`}>
      <h2 className='text-center font-semibold font-[sora] text-lg border-b-2 p-2 m-2'>
        {title}
      </h2>
      <div className='grow overflow-y-auto px-2'>{children}</div>
      {displayButton && (
        <Button className={"self-end mt-5"} onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
