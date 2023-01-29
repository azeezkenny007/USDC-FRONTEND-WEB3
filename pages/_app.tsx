import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'
import { ToastContainer, toast } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer/>
         <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
