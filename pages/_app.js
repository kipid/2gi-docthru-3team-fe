import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
  <>
    <div className="container">
      <Header />
      <div className="subContainer">
        <Component {...pageProps} />
      </div>
    </div>
  </>
  );
}
