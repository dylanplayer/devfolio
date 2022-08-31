import Image from 'next/image';
import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  const features = [
    {
      title: 'Driven by Purpose',
      img: '/images/goal.svg',
      description: 'Dylan is primarily driven by pupose and impact. He enjoys working on projects with high impact and a strong mission.',
    },
    {
      title: 'Building for the Future',
      img: '/images/maintenance.svg',
      description: 'Dylan builds quality, maintainable, code that is built for the future. Quality code is built on a whiteboard, not an editor.',
    },
    {
      title: 'Access for Everyone',
      img: '/images/key.svg',
      description: 'Dylan enjoys working on products that lower the barrier to entry to the world of entrepreneurship and business.',
    },
  ];

  return (
    <div className={styles.features}>
      {
        features.map((feature, index) => (
          <div className={styles.feature} key={index}>
            <Image className={styles.featureImg} width={100} height={100} src={feature.img} alt={feature.title} />
            <h1 className={styles.featureTitle}>{feature.title}</h1>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Features;
