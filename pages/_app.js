import "../styles/globals.css";

import { Elements } from "@stripe/react-stripe-js";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import { loadStripe } from "@stripe/stripe-js";
import { UserContextProvider } from "../context/UserContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/icon.png" />
        <title>CAM NFTs</title>

        <meta name="description" content="CAM NFTs" />
      </Head>
      <MoralisProvider
        serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
        appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      >
        <Elements stripe={stripePromise}>
          <UserContextProvider>
            <Component {...pageProps} />
          </UserContextProvider>
        </Elements>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
