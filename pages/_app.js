import "../public/style/style.scss"; 
import "../public/style/all.min.css";

import Head from 'next/head'

//auto-generated ids are consistent between the server and client.
import SSRProvider from "react-bootstrap/SSRProvider";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
       <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
            </Head>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
