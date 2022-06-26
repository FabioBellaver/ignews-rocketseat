import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../styles/global.scss";
import { Header } from "../components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
