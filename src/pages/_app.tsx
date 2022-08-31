import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';
import Head from 'next/head';
import { NextUIProvider } from '@nextui-org/react';
import { createTheme } from "@nextui-org/react"
import Footer from '../components/Footer';
import { SessionProvider } from 'next-auth/react';

const darkTheme = createTheme({
  type: 'dark',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextUIProvider theme={darkTheme}>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
          <link rel='icon' href='/favicon.ico' />
          <meta name='description' content='Dylan Player is Computer Science Student at The Dominican University of California and a Dev Degree intern at Shopify.' />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </NextUIProvider>
    </SessionProvider>
  );
}

export default MyApp
