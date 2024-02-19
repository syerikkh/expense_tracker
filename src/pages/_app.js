import { RecordProvider } from "@/context/RecordCont";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <RecordProvider>
    <title>Geld</title>
    <Component {...pageProps} />
  </RecordProvider>
}
