export default function Routine({ exercices }) {
  console.log(exercices);

  const exercicesList = exercices.map((exercice, i) => (
    <div key={i} className="flex gap-2">
      <p>
        {`name: ${exercice.exercice.title}, series: ${exercice.series}, reps : ${exercice.reps}`}
      </p>
      <input type="checkbox" />
    </div>
  ));
  console.log(exercices);
  return <>{exercicesList}</>;
}
