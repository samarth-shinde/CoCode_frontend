import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToolStateProvider } from "../store/ToolStateContext";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <ToolStateProvider>
      <Head>
        <link rel="shortcut icon" href="/images/code.png" type="image/x-icon" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>CoCode</title>
      </Head>
      {router.pathname !== "/verify" && <Navbar />}
      <Component {...pageProps} />
    </ToolStateProvider>
  );
};

export default MyApp;
