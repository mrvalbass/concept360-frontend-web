export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold bg-white px-10 rounded drop-shadow-lg py-1 ${className} `}
    >
      {children}
    </button>
  );
}
