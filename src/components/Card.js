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
      className={`flex justify-between flex-col bg-white p-5 rounded shadow-md max-h-[99%] ${className}`}
    >
      <h2 className="text-center font-semibold font-[sora] text-xl border-b-2 pb-5">
        {title}
      </h2>
      <div className="grow overflow-y-auto">{children}</div>
      {displayButton && (
        <Button className={"self-end mt-5"} onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
