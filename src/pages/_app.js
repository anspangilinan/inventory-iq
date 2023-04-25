import DefaultLayout from "@/layouts/default";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { Fragment } from "react";

function MyApp({ Component, router, pageProps: { session, ...pageProps } }) {
  const Layout =
    Component.layout ||
    (({ children }) => <DefaultLayout>{children}</DefaultLayout>);

  return (
    <SessionProvider session={session}>
      <Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Inventory IQ</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </SessionProvider>
  );
}

export default MyApp;
