import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ChangeConnectionState, updatePicture } from "@/reducers/users";

export default function SpecialistMenu({
  loading,
  uploadPicture,
  setMessage,
  setFirstName,
  setLastName,
  setEmail,
  setDiscipline,
  setShowMyInfo,
  setShowAddSpecialist,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const specialist = useSelector((state) => state.users.value);
  return (
    <>
      <div className="flex justify-center w-2/6 py-14 rounded bg-white drop-shadow-lg max-h-[99%]">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-row">
              <Image
                src={
                  { loading } || !!!specialist.user
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
                setMessage("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setShowAddSpecialist(false);
                setShowMyInfo(true);
              }}
            >
              modifier mes informations
            </Button>
            <Button
              onClick={() => {
                setMessage("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setDiscipline("");
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
    </>
  );
}
