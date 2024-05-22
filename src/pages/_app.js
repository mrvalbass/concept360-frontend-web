import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "../reducers/users";
import exercices from "../reducers/exercices";

const store = configureStore({
  reducer: { users, exercices },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Concept 360</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
