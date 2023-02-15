import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GeneralContextProvider } from "@/contexts/GeneralContext";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GeneralContextProvider>
        <Component {...pageProps} />
      </GeneralContextProvider>
      <ToastContainer theme="colored" newestOnTop autoClose={3000} />
    </>
  );
}
