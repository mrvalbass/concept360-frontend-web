export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold bg-white px-5 rounded drop-shadow-lg p-1 w-[40%] ${className} `}>
      {children}
    </button>
  );
}
