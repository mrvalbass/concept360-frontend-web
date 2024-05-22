import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../reducers/users";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await fetch(
          `http://localhost:3000/users/token/${token}`
        ).then((r) => r.json());
        dispatch(setUserData(data.user));
      } else {
        router.push("/login");
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <main
        className={`flex flex-col min-h-[90vh] items-center justify-center`}
      >
        Bienvenue sur la HomePage
      </main>
    </>
  );
}
