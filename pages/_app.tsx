import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'
import { ToastContainer, toast } from "react-toastify";
import {  QueryClient,QueryClientProvider} from "react-query"

function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient();

  return (
    <div>
      <Head>
        <title>Usdc Frontend </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer/>
      <QueryClientProvider client={queryClient}>
         <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
