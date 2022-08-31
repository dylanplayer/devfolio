import React from 'react';
import navStyles from '../Navbar/Navbar.module.css';
import styles from './Footer.module.css';
import { Link, Text } from "@nextui-org/react";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link href='https://github.com/dylanplayer' className={navStyles.navbarLink} target='_blank' icon>GitHub</Link>
        <Link href='https://www.linkedin.com/in/dylan-player/' className={navStyles.navbarLink} target='_blank'  icon>LinkedIn</Link>
        <Link href='https://twitter.com/dylanplayer' className={navStyles.navbarLink} target='_blank' icon>Twitter</Link>
      </div>
      <Text>© {new Date().getFullYear()}, Dylan Player</Text>
    </div>
  );
}

export default Footer;
