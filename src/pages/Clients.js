import Header from "@/components/Header";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import PatientCard from "@/components/PatientCard";

export default function Clients() {
  const user = useSelector((state) => state.users.value.userData);
  const specialistId = user._id;
  const [userData, setUserData] = useState([]);
  const [specialistList, setSpecialistList] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetch("http://localhost:3000/users").then((r) =>
        r.json()
      );
      setUserData(userData.user);
      const specialistData = await fetch(
        `http://localhost:3000/users/getPatient/${user._id}`
      ).then((r) => r.json());
      setSpecialistList(specialistData);
    };
    getUserData();
  }, []);
  console.log(userData);
  console.log(user);

  const addToSpecialist = (index) => {};

  const userList = userData.map((user, i) => {
    return (
      <>
        <div className={"flex flex-row gap-5"} key={i}>
          <div>firstName : {user.firstName}</div>
          <div>lastName : {user.lastName}</div>
          <FontAwesomeIcon onClick={addToSpecialist(i)} icon={faSquarePlus} />
        </div>
      </>
    );
  });

  //   const patientList =

  return (
    <>
      <Header />
      <main
        className={`flex gap-5 min-h-[90vh] p-5 items-center justify-center`}
      >
        <div>Pages des Clients de Mr. {user.lastName}</div>
        <div className={"flex flex-row min-w-full justify-between"}>
          <div>
            <div>All patients</div>
            {userList}
          </div>
          <div>
            <div>My patients</div>
          </div>
        </div>
      </main>
    </>
  );
}
