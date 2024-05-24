export default function Routine({ _id, exercises, checkbox }) {
  const exercisesList = exercises.map((exercise, i) => (
    <div key={i} className="flex gap-2">
      <p>
        {`Titre: ${exercise.exercise.title}, Séries: ${exercise.sets}, Reps : ${exercise.reps}`}
      </p>
    </div>
  ));

  return (
    <>
      <h2>Routine n°{_id}</h2>
      {exercisesList}
      {checkbox && <input type="checkbox" />}
    </>
  );
}
