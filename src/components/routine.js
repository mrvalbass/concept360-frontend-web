export default function Routine({ exercices }) {
  const exercicesList = exercices.map((exercice) => (
    <div className="flex gap-2">
      <p>
        {`name: ${exercice.exercice.title}, series: ${exercice.series}, reps : ${exercice.reps}`}
      </p>
      <input type="checkbox" />
    </div>
  ));
  console.log(exercices);
  return <>{exercicesList}</>;
}
