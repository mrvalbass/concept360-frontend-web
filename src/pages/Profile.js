import Button from "@/components/Button";
import Header from "@/components/Header";
import { ChangeConnectionState } from "@/reducers/users";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Others() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [renderTrigger, setRenderTrigger] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
  }, [renderTrigger]);

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-[90vh] items-center justify-center">
        <Button
          onClick={() => {
            dispatch(ChangeConnectionState());
            setRenderTrigger(!renderTrigger);
          }}
        >
          Logout
        </Button>
      </main>
    </>
  );
}
