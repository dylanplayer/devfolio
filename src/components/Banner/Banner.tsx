import Image from "next/image";
import React from "react";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerTextContainer}>
        <h1 className={styles.bannerTitle}>Dylan Player</h1>
        <p className={styles.bannerSubtitle}>Software Engineer</p>
      </div>
      <div className={styles.bannerImageContainer}>
        <Image
          className={styles.bannerImage}
          width={350}
          height={350}
          alt="Dylan Player Memoji"
          src="/images/memoji.png"
        />
      </div>
    </div>
  );
};

export default Banner;
