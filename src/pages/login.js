import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChangeConnectionState } from "../../reducers/users";
import { inputStyle, buttonStyle } from "@/styles/style";

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
    <main className='flex flex-col min-h-screen min-w-full items-center justify-center bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.20)_50%,_rgba(6,_125,_93,_0.20)_88.81%)]'>
      <div className='m-20 font-sora text-8xl font-semibold text-center text-[#00a5ac]'>
        Concept 360
      </div>
      <div className='flex flex-row m-5 justify-center items-end gap-[24px]'>
        {/* login */}
        <div className=' m-10 flex flex-col pl-[24px] pr-[24px] py-[8px]  justify-end items-start gap-[24px] bg-transparent'>
          <input
            className={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            value={email}
            placeholder='adresse e-mail'
          />
          <input
            className={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            value={password}
            placeholder='Mot de passe'
          />
          <button className={buttonStyle} onClick={signIn}>
            Connection
          </button>
        </div>

        {/* Register */}
        <div className='m-10 flex flex-col pl-[24px] pr-[24px] py-[8px]  justify-end items-start gap-[24px] bg-transparent	'>
          <input
            className={inputStyle}
            onChange={(e) => setFirstName(e.target.value)}
            type='text'
            value={firstName}
            placeholder='Prénom'
          />
          <input
            className={inputStyle}
            onChange={(e) => setLastName(e.target.value)}
            type='text'
            value={lastName}
            placeholder='Nom'
          />
          <input
            className={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            value={email}
            placeholder='adresse e-mail'
          />
          <input
            className={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            value={password}
            placeholder='Mot de passe'
          />

          <select
            className={inputStyle}
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}>
            <option value={""} disabled>
              Votre Spécialité ?
            </option>
            <option value={"kiné"}>Kiné</option>
            <option value={"Ostéo"}>Ostéo</option>
            <option value={"Psy"}>Psy</option>
            <option value={"Coach"}>Coach</option>
          </select>

          <button className={buttonStyle} onClick={SignUp}>
            Soumettre
          </button>
        </div>
      </div>
    </main>
  );
}
