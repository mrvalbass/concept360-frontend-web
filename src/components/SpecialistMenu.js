import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ChangeConnectionState, updatePicture } from "@/reducers/users";
import { useState } from "react";

export default function SpecialistMenu({
  setShowMyInfo,
  setShowAddSpecialist,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const specialist = useSelector((state) => state.users.value);
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
    <div className="flex flex-col justify-center items-center w-2/6 rounded bg-white drop-shadow-lg max-h-[99%] gap-12">
      <div className="flex flex-col items-center gap-2 ">
        <div className="flex flex-row">
          <Image
            src={
              loading || !specialist.user
                ? "/loading.gif"
                : specialist.user?.profilePictureURL
            }
            width={580}
            height={601}
            alt="Specialist Profile Picture"
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
        <h2 className="font-semibold font-[sora] text-2xl ">
          {specialist.user &&
            `${specialist.user.firstName} ${specialist.user.lastName}`}
        </h2>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <Button
            className="!bg-[#00a5ac]"
            onClick={() => {
              setShowAddSpecialist(false);
              setShowMyInfo(true);
            }}
          >
            Modifier mes informations
          </Button>
          <Button
            className="!bg-[#00a5ac]"
            onClick={() => {
              setShowMyInfo(false);
              setShowAddSpecialist(true);
            }}
          >
            Ajouter un spécialiste
          </Button>
        </div>
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
  );
}
