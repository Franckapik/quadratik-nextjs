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
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        </Head>
        {/*         <ReactQueryDevtools initialIsOpen={false} />
         */}
        <GoogleAnalytics trackPageViews />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SSRProvider>
  );
}
