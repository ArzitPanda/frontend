import "../globals.css";

function MyApp({ Component, pageProps }) {
  // This component is the wrapper for all pages
  return <Component {...pageProps} />;
}

export default MyApp;
