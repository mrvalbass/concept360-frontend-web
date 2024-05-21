import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    if (!user.isConnected) {
      router.push("/login");
    }
  }, [user.isConnected]);

  return (
    <main
      className={`flex flex-col min-h-screen min-w-full items-center justify-center`}
    >
      bienvenue sur la HomePage
    </main>
  );
}
