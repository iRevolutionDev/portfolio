import type { AppProps } from 'next/app'
import '../styles/globals.css';
import {Layout} from "../components/templates/Layout";
import {ThemeProvider} from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider attribute="class">
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </ThemeProvider>
  )
}

export default MyApp;
