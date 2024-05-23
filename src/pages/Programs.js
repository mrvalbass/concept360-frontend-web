import Header from "@/components/Header";
import PatientCard from "@/components/PatientCard";

export default function Programs() {
  return (
    <>
      <Header />
      <main className="flex min-h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]">
        <div className="border-2 w-1/4">placeholder myClientList</div>

        <PatientCard patientId="664e1205956f043d1768dd8d"></PatientCard>
      </main>
    </>
  );
}
