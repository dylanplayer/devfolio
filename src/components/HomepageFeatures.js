import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Driven by Purpose',
    Svg: require('../../static/img/goal.svg').default,
    description: (
      <>
        Dylan is primarily driven by pupose and impact. He enjoys working on projects
        with high impact and a strong mission.
      </>
    ),
  },
  {
    title: 'Building for the Future',
    Svg: require('../../static/img/maintenance.svg').default,
    description: (
      <>
        Dylan builds quality, maintainable, code that is built for the future. <string>"Quality
        code is built on a whiteboard, not an editor."</string>
      </>
    ),
  },
  {
    title: 'Access for Everyone',
    Svg: require('../../static/img/key.svg').default,
    description: (
      <>
        Dylan enjoys working on products that lower the barrier to entry
        to the world of entrepreneurship and business.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
