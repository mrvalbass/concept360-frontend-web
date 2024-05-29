import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Header from "@/components/Header";
import PasswordModal from "@/components/PasswordModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ChangeConnectionState, updatePicture } from "@/reducers/users";
import Image from "next/image";
import AddSpecialist from "@/components/addSpecialist";
import UpdateSpecialist from "@/components/UpdateSpecialist";

export default function Others() {
  const dispatch = useDispatch();
  const router = useRouter();
  const specialist = useSelector((state) => state.users.value);
  const [showMyInfo, setShowMyInfo] = useState(false);
  const [showAddSpecialist, setShowAddSpecialist] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadPicture = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append("photoFromFront", file);

      formData.append("token", localStorage.getItem("token"));

      const data = await fetch("http://localhost:3000/users/upload", {
        method: "POST",
        body: formData,
      }).then((response) => response.json());

      dispatch(updatePicture(data.url));
      setLoading(false);
    }
  };

  return (
    <>
      <PasswordModal
        open={openPasswordModal}
        setOpenNewPatientModal={setOpenPasswordModal}
        specialist={specialist}
      />
      <Header />
      <main className="flex flex-row min-h-[90vh] gap-5 p-5 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]">
        {/* <SpecialistMenu
          loading={loading}
          uploadPicture={uploadPicture}
          setMessage={setMessage}
          setFirstName={setMessage}
          setLastName={setLastName}
          setEmail={setLastName}
          setDiscipline={setDiscipline}
          setShowMyInfo={setShowMyInfo}
          setShowAddSpecialist={setShowAddSpecialist}
        /> */}
        <div className="flex justify-center w-2/6 py-14 rounded bg-white drop-shadow-lg max-h-[99%]">
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-row">
                <Image
                  src={
                    loading || !!!specialist.user
                      ? "/loading.gif"
                      : specialist.user?.profilePictureURL
                  }
                  width={580}
                  height={601}
                  alt="Patient Profile Picture"
                  className="w-24 h-24 object-cover shadow-xl flex justify-center rounded-full"
                />
                <input
                  type="file"
                  id="upload_widget_opener"
                  style={{ display: "none" }}
                  onChange={(e) => uploadPicture(e)}
                />
                <label htmlFor="upload_widget_opener">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="cursor-pointer duration-75 hover:scale-125 active:scale-100 text-sm text-[#00a5ac]"
                  />
                </label>
              </div>

              <h2 className="font-semibold font-[sora] text-lg ">
                {specialist.user &&
                  `${specialist.user.firstName} ${specialist.user.lastName}`}
              </h2>
            </div>
            <div className="flex flex-col gap-6 pt-10 h-full">
              <Button
                onClick={() => {
                  setShowAddSpecialist(false);
                  setShowMyInfo(true);
                }}
              >
                modifier mes informations
              </Button>
              <Button
                onClick={() => {
                  setShowMyInfo(false);
                  setShowAddSpecialist(true);
                }}
              >
                Ajouter un spécialiste
              </Button>
              <Button
                onClick={() => {
                  dispatch(ChangeConnectionState());
                  router.push("/login");
                }}
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center rounded grow px-20 py-10 bg-white drop-shadow-lg max-h-[99%]">
          {!showMyInfo ? "" : <UpdateSpecialist />}

          {!showAddSpecialist ? "" : <AddSpecialist />}
        </div>
      </main>
    </>
  );
}
