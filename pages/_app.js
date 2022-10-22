import "../public/style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/style/all.min.css";
//auto-generated ids are consistent between the server and client.
import SSRProvider from "react-bootstrap/SSRProvider";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
