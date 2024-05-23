export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold bg-white px-5 rounded drop-shadow-lg p-1 ${className} `}
    >
      {children}
    </button>
  );
}
