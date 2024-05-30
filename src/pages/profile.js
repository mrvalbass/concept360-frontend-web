import { useState } from "react";

import { useSelector } from "react-redux";

import Header from "@/components/Header";
import PasswordModal from "@/components/PasswordModal";
import AddSpecialist from "@/components/AddSpecialist";
import UpdateSpecialist from "@/components/UpdateSpecialist";
import SpecialistMenu from "@/components/SpecialistMenu";

export default function Profile() {
  const specialist = useSelector((state) => state.users.value);
  const [showMyInfo, setShowMyInfo] = useState(true);
  const [showAddSpecialist, setShowAddSpecialist] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  return (
    <>
      <PasswordModal
        open={openPasswordModal}
        setOpenNewPatientModal={setOpenPasswordModal}
        specialist={specialist}
      />
      <Header />
      <main className="flex flex-row min-h-[90vh] gap-10 p-10 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]">
        <SpecialistMenu
          setShowMyInfo={setShowMyInfo}
          setShowAddSpecialist={setShowAddSpecialist}
        />
        {!showMyInfo ? "" : <UpdateSpecialist />}
        {!showAddSpecialist ? "" : <AddSpecialist />}
      </main>
    </>
  );
}
