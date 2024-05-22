import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChangeConnectionState } from "../reducers/users";
import Button from "@/components/Button";

export default function login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [discipline, setDiscipline] = useState("");

  const SignUp = async () => {
    const form = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        state: "specialist",
        discipline,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/users/signup",
      form
    ).then((r) => r.json());
    dispatch(ChangeConnectionState(response.token));
    router.push("/");
  };

  const signIn = async () => {
    const form = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/users/signin",
      form
    ).then((r) => r.json());
    dispatch(ChangeConnectionState(response.token));
    router.push("/");
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-20 bg-[linear-gradient(150deg,rgba(255,255,255,0.30)10%,rgba(0,165,172,0.30)100%,rgba(6,125,93,0.30)65%)]">
      <div className="font-[sora] text-8xl font-semibold text-[#00a5ac]">
        Concept 360
      </div>
      <div className="flex flex-col gap-6">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          value={email}
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Mot de passe"
        />
        <Button onClick={signIn}>Connection</Button>
      </div>
    </main>
  );
}
