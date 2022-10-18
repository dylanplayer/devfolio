import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextUIProvider } from '@nextui-org/react';
import { createTheme } from "@nextui-org/react"
import { SessionProvider } from 'next-auth/react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import * as ga from '../../lib/ga';
import '../styles/globals.css'


const darkTheme = createTheme({
  type: 'dark',
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

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
