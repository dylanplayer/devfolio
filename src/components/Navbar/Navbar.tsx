import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Head from 'next/head';

const Navbar = () => {
  const minWebWidth = 900;
  let { width:innerWidth } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();

  const openDrawer = () => {
    setNavOpen(true);
  }

  const closeDrawer = () => {
    setNavOpen(false);
  }

  const handleOverlayClick = (e:any) => {
    e.preventDefault();
    closeDrawer();
  }

  useEffect(() => {
    setIsMobile(innerWidth == undefined || innerWidth < minWebWidth);
    window.addEventListener('resize', () => {
      if (!isMobile) closeDrawer();
    });
  }, [innerWidth, isMobile]);

  useEffect(() => {
    closeDrawer();
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta name="theme-color" content="#252525"/>
      </Head>
      <div className={styles.navbar}>
        <div className={styles.navbarContainerStart} style={navOpen ? {display: "none"} : {}}>
          <Image onClick={() => router.push('/')} className={styles.navbarBrand} width={32} height={32} src='/images/logo.svg' alt='Dylan Player Logo' />
          <Link href='/'><a className={[styles.navbarBrandName, styles.navbarLink].join(' ')}>Dylan Player</a></Link>
        </div>
        <div className={styles.navbarContainerEnd}>
        {
          isMobile ?
            <>
              <button className={styles.menuButton} onClick={() => openDrawer()}><svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path stroke="#F8F8F2" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22"></path></svg></button>
            </>
          :
            <>
              <Link href='/portfolio' className={styles.navbarLink}><a className={styles.navbarLink}>Portfolio</a></Link>
              <Link href='/education' className={styles.navbarLink}><a className={styles.navbarLink}>Education</a></Link>
              <Link href='/work' className={styles.navbarLink}><a className={styles.navbarLink}>Work</a></Link>
              <Link href='/contact' className={styles.navbarLink}><a className={styles.navbarLink}>Contact</a></Link>
            </>
          }
        </div>
        <div className={styles.navigationOverlay} style={navOpen ? {backgroundColor: "rgba(0,0,0,0.5)"}: {display: "none"}} onClick={handleOverlayClick}></div>
        <div className={styles.navigationDrawer} style={{width: navOpen ? 350 : 0}}>
          <div className={styles.navigationDrawerHeader}>
            <div className={styles.navigationDrawerBrandContainer}>
              <Image onClick={() => router.push('/')} className={styles.navbarBrand} src='/images/logo.svg' width={32} height={32} alt='Dylan Player Logo' />
              <Link href='/'><a className={[styles.navbarBrandName, styles.navbarLink].join(' ')}>Dylan Player</a></Link>
            </div>
            <button className={styles.menuButton} onClick={() => closeDrawer()}><svg viewBox="0 0 15 15" width="21" height="21"><g stroke="#F8F8F2" strokeWidth="1.3"><path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path></g></svg></button>
          </div>
          <div className={styles.navigationDrawerBody}>
            <Link href='/' className={styles.navigationDrawerLink}><a className={styles.navigationDrawerLink}>Home</a></Link>
            <Link href='/portfolio' className={styles.navigationDrawerLink}><a className={styles.navigationDrawerLink}>Portfolio</a></Link>
            <Link href='/education' className={styles.navigationDrawerLink}><a className={styles.navigationDrawerLink}>Education</a></Link>
            <Link href='/work' className={styles.navigationDrawerLink}><a className={styles.navigationDrawerLink}>Work</a></Link>
            <Link href='/contact' className={styles.navigationDrawerLink}><a className={styles.navigationDrawerLink}>Contact</a></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
