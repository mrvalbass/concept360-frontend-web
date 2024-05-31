import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "../reducers/users";
import exercises from "../reducers/exercises";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GetUserData from "@/components/GetUserData";
import { useEffect } from "react";

const store = configureStore({
  reducer: { users, exercises },
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    return localStorage.removeItem("lastCheckedPatient");
  }, []);
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Head>
          <title>Concept 360</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Cabinet paramédical à Valbonne - Sophia-Antipolis proposant des services de kinésithérapie, ostéopathie, nutrition et psychologie. Prenez rendez-vous avec nos experts pour un suivi personnalisé."
          ></meta>
          <meta
            name="keywords"
            content="kinésithérapie, ostéopathie, nutrition, psychologie, Valbonne, Sophia-Antipolis, cabinet paramédical, bien-être, santé"
          />
          <meta name="author" content="Concept 360" />
          <meta property="og:type" content="website" />
          <meta http-equiv="Content-Language" content="fr" />
        </Head>
        <GetUserData />
        <Component {...pageProps} />
      </LocalizationProvider>
    </Provider>
  );
}
