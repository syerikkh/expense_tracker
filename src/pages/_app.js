import { RecordProvider } from "@/context/RecordCont";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <RecordProvider>
    <Component {...pageProps} />
  </RecordProvider>
}
