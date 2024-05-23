import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import Patient from "./Patient";

export default function AllPatientList(props) {
  const patientList = props.allPatientData.map((patient, i) => {
    return (
      <Patient
        key={i}
        firstName={patient.user.firstName}
        lastName={patient.user.lastName}
        function={props.addToSpecialistList}
        patient={patient}
        icon={faSquarePlus}
      />
    );
  });
  return (
    <>
      <div>
        <div>All patients</div>
        {patientList}
      </div>
    </>
  );
}
