import Button from "@/components/Button";
import Header from "@/components/Header";
import { ChangeConnectionState } from "@/reducers/users";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function Others() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-[90vh] items-center justify-center">
        <Button
          onClick={() => {
            dispatch(ChangeConnectionState());
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </main>
    </>
  );
}
