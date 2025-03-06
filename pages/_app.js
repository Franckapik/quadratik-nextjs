import "../public/style/style.scss";
import "../public/style/all.min.css";
import Head from "next/head";
import { Krub } from "next/font/google";

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

const font = Krub({ subsets: ["latin"], weight: ["400"] });

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Traitement acoustique 100% Français et Éco-responsable - Quadratik</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          <meta name="theme-color" content="#332D2A" />
          <meta name="description" content="Améliorez le confort acoustique de votre pièce avec des produits issus de l'artisanat 100% français garantissant un moindre impact environemental par l'utilisation de matériaux naturels performants." />
        </Head>
        {/*         <ReactQueryDevtools initialIsOpen={false} />
         */}
        <GoogleAnalytics trackPageViews />
        <main className={font.className}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </SSRProvider>
  );
}
