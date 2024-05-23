import { useState, useEffect } from "react";
import Routine from "./Routine";
import Button from "./Button";

export default function DisplayRoutine() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    (async () => {
      const routinesData = await fetch("http://localhost:3000/routines/").then(
        (r) => r.json()
      );
      setRoutines(routinesData.routines);
    })();
  }, []);

  console.log(routines);
  const routinesComponents =
    routines && routines.map((routine, i) => <Routine key={i} {...routine} />);
  return (
    <div className="w-2/5 flex justify-between flex-col bg-white p-5 gap-5 rounded shadow-md">
      <h2 className="text-center font-[sora] text-lg">Routines</h2>
      <div className="grow">{routinesComponents}</div>
      <Button className={"self-end"}>Créer une routine</Button>
    </div>
  );
}
