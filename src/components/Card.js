import Button from "./Button";

export default function Card({
  title,
  displayButton,
  onButtonClick,
  children,
}) {
  return (
    <div className="w-2/5 flex justify-between flex-col bg-white p-5 gap-5 rounded shadow-md">
      <h2 className="text-center font-semibold font-[sora] text-xl border-b-2 pb-5">
        {title}
      </h2>
      <div className="grow">{children}</div>
      {displayButton && (
        <Button
          className={"self-end"}
          onClick={() => onButtonClick((prev) => !prev)}
        >
          Créer une routine
        </Button>
      )}
    </div>
  );
}
