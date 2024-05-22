export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className=" font-semibold bg-white px-5 rounded shadow-xl"
    >
      {children}
    </button>
  );
}
