import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../reducers/users";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value.userData);
  const [patientEmail, setPatientEmail] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await fetch(
          `http://localhost:3000/users/token/${token}`
        ).then((r) => r.json());
        dispatch(setUserData(data.user));
      } else {
        router.push("/login");
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <Header />
      <main
        className={`flex flex-col min-h-screen min-w-full items-center justify-center`}
      >
        bienvenue sur la HomePage
        <Link href={"/patient/664c8cee6374e3ff8434448c"}>Patient Page</Link>
      </main>
    </>
  );
}
