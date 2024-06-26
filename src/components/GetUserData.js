import { setUserData } from "@/reducers/users";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function GetUserData() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await fetch(
          `https://concept360-backend-five.vercel.app/users/specialists/token/${token}`
        ).then((r) => r.json());
        dispatch(setUserData(data.specialist));
      } else {
        router.push("/login");
      }
    })();
  }, []);

  return;
}
