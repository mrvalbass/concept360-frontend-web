export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold bg-[#063d40] text-white px-10 drop-shadow-2xl rounded py-2 duration-200 hover:opacity-80 hover:scale-105 active:scale-95 ${className} `}
    >
      {children}
    </button>
  );
}
