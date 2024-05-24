import Button from "./Button";

export default function Card({
  title,
  displayButton,
  onButtonClick,
  buttonText,
  children,
}) {
  return (
    <div className="flex basis-1/2 justify-between flex-col bg-white p-5  rounded shadow-md max-h-[99%]">
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
