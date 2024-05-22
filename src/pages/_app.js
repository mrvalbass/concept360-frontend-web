import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "../reducers/users";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const store = configureStore({
  reducer: { users },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Head>
          <title>Concept 360</title>
        </Head>
        <Component {...pageProps} />
      </LocalizationProvider>
    </Provider>
  );
}
