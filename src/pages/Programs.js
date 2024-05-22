import Header from "@/components/Header";
import PatientCard from "@/components/PatientCard";

export default function Programs() {
  return (
    <>
      <Header />
      <main className={`flex min-h-[90vh] gap-5 p-5`}>
        <div className="border-2 w-1/4">placeholder myClientList</div>

        <PatientCard patientId="664c8cee6374e3ff8434448c"></PatientCard>
      </main>
    </>
  );
}

