import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Patient(props) {
  return (
    <>
      <div className={"flex flex-row gap-5"} key={props.key}>
        <div>firstName : {props.firstName}</div>
        <div>lastName : {props.lastName}</div>
        <FontAwesomeIcon
          onClick={() => props.function(props.patient)}
          icon={props.icon}
        />
      </div>
    </>
  );
}
