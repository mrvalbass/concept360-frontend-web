import "@/styles/globals.css";
import Head from "next/head";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "../reducers/users";
import exercices from "../reducers/exercices";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GetUserData from "@/components/GetUserData";
import { useEffect } from "react";

const store = configureStore({
  reducer: { users, exercices },
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    console.log("App mounted");
    return console.log("App dismounted");
  }, []);
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Head>
          <title>Concept 360</title>
        </Head>
        <GetUserData />
        <Component {...pageProps} />
      </LocalizationProvider>
    </Provider>
  );
}
