import PatientCard from "@/components/patientCard";
import { useRouter } from "next/router";

export default function PatientPage() {
  const router = useRouter();
  const { patientId } = router.query;
  return (
    <div>
      <div>header placeholder</div>
      {patientId && <PatientCard patientId={patientId} />}
    </div>
  );
}
