export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold bg-[rgba(0,165,172,0.5)] text-white duration-75 hover:scale-110 px-10 rounded drop-shadow-lg py-1 ${className} `}
    >
      {children}
    </button>
  );
}
