import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ChangeConnectionState, setUserData } from "../reducers/users";
import Button from "@/components/Button";
import TextFieldComponent from "@/components/TextFieldComponent";
import PasswordComponent from "@/components/PasswordComponent";

export default function login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Connection, setConnection] = useState(true);

  const signIn = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/users/signin",
      options
    ).then((r) => r.json());
    if (response.result) {
      const specialistResponse = await fetch(
        `http://localhost:3000/users/specialists/token/${response.user.token}`
      ).then((r) => r.json());
      if (specialistResponse.specialist) {
        dispatch(ChangeConnectionState(response.user.token));
        dispatch(setUserData(specialistResponse.specialist));
        router.push("/");
      } else {
        alert(
          "This is the specialist app, try using the Concept360 Mobile App"
        );
      }
    } else {
      setConnection(false);
      // alert("Connection failed");
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-20 bg-[linear-gradient(150deg,rgba(255,255,255,0.30)10%,rgba(0,165,172,0.30)100%,rgba(6,125,93,0.30)65%)]">
      <div className="font-[sora] text-8xl font-semibold text-[#00a5ac]">
        Concept 360
      </div>
      <div className="flex flex-col gap-6">
        <TextFieldComponent
          id="loginEmail"
          label="email"
          valueSetter={setEmail}
          valueGetter={email}
          size={"small"}
        />
        <PasswordComponent
          id="passwordLogin"
          label="Password"
          valueSetter={setPassword}
          valueGetter={password}
          size={"small"}
        />
        {Connection ? (
          ""
        ) : (
          <p className=" text-red-600 text-center">
            Email ou mot de passe incorrect
          </p>
        )}
        <Button onClick={signIn}>Connexion</Button>
      </div>
    </main>
  );
}
