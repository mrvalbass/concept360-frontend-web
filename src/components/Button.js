export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`${className} font-semibold bg-white px-5 rounded shadow-xl`}
    >
      {children}
    </button>
  );
}
