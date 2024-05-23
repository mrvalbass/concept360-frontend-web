import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Patient from "./Patient";

export default function MyPatientList(props) {
  const patientListInSpecialistList = props.patientInSpecialistList.map(
    (patient, i) => {
      return (
        <Patient
          key={i}
          firstName={patient.user.firstName}
          lastName={patient.user.lastName}
          function={props.deletePatientFromSpecialistList}
          patient={patient}
          icon={faTrashCan}
        />
      );
    }
  );
  return (
    <>
      <div>
        <div>My patients</div>
        {patientListInSpecialistList}
      </div>
    </>
  );
}
