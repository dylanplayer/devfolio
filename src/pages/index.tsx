import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import Features from '../components/Features';
import utilStyles from '../styles/utils.module.css';

const Index = () => {
  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Dylan Player</title>
      </Head>
      <main className={utilStyles.main} style={{ paddingTop: 0 }}>
        <Banner />
        <Features />
      </main>
    </div>
  )
}

export default Index;
