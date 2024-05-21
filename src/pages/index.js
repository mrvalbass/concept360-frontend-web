import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../reducers/users";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await fetch(
          `http://localhost:3000/users/retrieve/${token}`
        ).then((r) => r.json());
        console.log(data.user);
        dispatch(setUserData(data.user));
      } else {
        router.push("/login");
      }
    };
    getUserData();
  }, []);

  return (
    <main
      className={`flex flex-col min-h-screen min-w-full items-center justify-center`}
    >
      bienvenue sur la HomePage
    </main>
  );
}
