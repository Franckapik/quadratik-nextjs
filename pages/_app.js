import "../public/style/style.scss";
import "../public/style/all.min.css";

import Head from "next/head";

//auto-generated ids are consistent between the server and client.
import SSRProvider from "react-bootstrap/SSRProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GoogleAnalytics } from "nextjs-google-analytics";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Traitement acoustique 100% Français et Éco-responsable - Quadratik</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />{" "}
          <meta name="description" content="Améliorez le confort acoustique de votre pièce avec des produits issus de l'artisanat 100% français garantissant un moindre impact environemental par l'utilisation de matériaux naturels performants." />
        </Head>
        {/*         <ReactQueryDevtools initialIsOpen={false} />
         */}
        <GoogleAnalytics trackPageViews />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SSRProvider>
  );
}
