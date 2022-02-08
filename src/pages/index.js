import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import HomepageBio from '../components/HomepageBio';
import './index.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <img src='/img/memoji.png' className='hero-image'/>
      <div className="hero-container">
        <h1 className='hero-title'>Hi, I'm Dylan</h1>
        <p className='hero-subtitle'><strong>Entrepreneur</strong> | <strong>Software Engineer</strong> | <strong>Finance Nerd</strong> | <strong>College Student</strong></p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Dylan Player is a Computer Science Student at The Dominican University of California and a Software Engineering Intern at Shopify.">
      <HomepageHeader />
      <main>
        <HomepageBio />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
