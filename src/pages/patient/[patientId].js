import PatientCard from "@/components/PatientCard";
import { useRouter } from "next/router";
import Header from "@/components/Header";

export default function PatientPage() {
  const router = useRouter();
  const { patientId } = router.query;
  return (
    <div>
      <Header />
      {patientId && <PatientCard patientId={patientId} />}
    </div>
  );
}
