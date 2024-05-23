export default function Routine({ _id, exercices, checkbox }) {
  const exercicesList = exercices.map((exercice, i) => (
    <div key={i} className="flex gap-2">
      <p>
        {`name: ${exercice.exercice.title}, series: ${exercice.series}, reps : ${exercice.reps}`}
      </p>
    </div>
  ));

  return (
    <>
      <h2>Routine n°{_id}</h2>
      {exercicesList}
      {checkbox && <input type="checkbox" />}
    </>
  );
}
