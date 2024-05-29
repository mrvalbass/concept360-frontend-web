import { useState } from "react";

import { useSelector } from "react-redux";

import Header from "@/components/Header";
import PasswordModal from "@/components/PasswordModal";
import AddSpecialist from "@/components/AddSpecialist";
import UpdateSpecialist from "@/components/UpdateSpecialist";
import SpecialistMenu from "@/components/SpecialistMenu";

export default function Profile() {
  const specialist = useSelector((state) => state.users.value);
  const [showMyInfo, setShowMyInfo] = useState(false);
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
      <main className="flex flex-row min-h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]">
        <SpecialistMenu
          setShowMyInfo={setShowMyInfo}
          setShowAddSpecialist={setShowAddSpecialist}
        />
        <div className="flex flex-col justify-center items-center rounded grow gap-16 bg-white drop-shadow-lg max-h-[99%]">
          {!showMyInfo && !showAddSpecialist ? (
            <h1 className="font-[sora] text-8xl font-semibold text-[#00a5ac] text-center">
              Concept 360
            </h1>
          ) : (
            ""
          )}
          {!showMyInfo ? "" : <UpdateSpecialist />}
          {!showAddSpecialist ? "" : <AddSpecialist />}
        </div>
      </main>
    </>
  );
}
