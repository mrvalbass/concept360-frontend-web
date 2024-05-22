import Header from "@/components/Header";
import PatientCard from "@/components/PatientCard";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Programs() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
  }, []);

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
