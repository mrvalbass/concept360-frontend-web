import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChangeConnectionState } from "../../reducers/users";

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
    <main
      className={`flex flex-col min-h-screen min-w-full items-center justify-center`}
    >
      <div>Concept 360</div>
      <div className={"flex flex-col"}>
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email}
            placeholder="adresse e-mail"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Mot de passe"
          />
          <button
            className="w-60 h-8 bg-white text-black rounded-2xl border-2 font-semibold"
            onClick={signIn}
          >
            Connection
          </button>
        </div>
        <div>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            value={firstName}
            placeholder="Prénom"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            value={lastName}
            placeholder="Nom"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email}
            placeholder="adresse e-mail"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Mot de passe"
          />

          <select
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          >
            <option value={""} disabled>
              Votre Spécialité ?
            </option>
            <option value={"kiné"}>Kiné</option>
            <option value={"Ostéo"}>Ostéo</option>
            <option value={"Psy"}>Psy</option>
            <option value={"Coach"}>Coach</option>
          </select>

          <button
            className="w-60 h-8 bg-white text-black rounded-2xl border-2 font-semibold"
            onClick={SignUp}
          >
            Soumettre
          </button>
        </div>
      </div>
    </main>
  );
}
