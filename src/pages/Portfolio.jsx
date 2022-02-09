import React, { useState } from 'react';
import Layout from '@theme/Layout';
import './Portfolio.css';

const Projects = () => {
  const projects = [
    {
      name: 'Yeti Supply Co',
      description: 'Basic online store with dynamic products and users',
      languages: [
        {
          name: 'Python',
          image: '/img/python.png',
        },
        {
          name: 'Flask',
          image: '/img/flask.png',
          alt: '/img/flask-alt.png',
        },
        {
          name: 'MongoDB',
          image: '/img/mongo.png',
        },
      ],
      liveURL: 'https://yeti-supply-co.dylanplayer.com/',
      repoURL: 'https://github.com/dylanplayer/Yeti-Supply-Co',
    },
    {
      name: 'Musk Bot',
      description: 'Generates tweets based on Elon Musks\' tweets in 2021.',
      languages: [
        {
          name: 'Python',
          image: '/img/python.png',
        },
        {
          name: 'Flask',
          image: '/img/flask.png',
          alt: '/img/flask-alt.png',
        },
      ],
      liveURL: 'http://muskbot.ml',
      repoURL: 'https://github.com/dylanplayer/Tweet-Generator',
    },
    {
      name: 'SFPOPOS',
      description: 'Wepage displaying San Francisco Privately Owned Public Spaces',
      languages: [
        {
          name: 'Javascript',
          image: '/img/js.png',
        },
        {
          name: 'React',
          image: '/img/react.png',
        },
      ],
      liveURL: 'https://sfpopos.dylanplayer.com/',
      repoURL: 'https://github.com/dylanplayer/sfpopos',
    },
    {
      name: 'Break Out',
      description: 'Basic JS canvas game built to learn how to use JS Context',
      languages: [
        {
          name: 'Javascript',
          image: '/img/js.png',
        },
      ],
      liveURL: 'https://break-out-beta.vercel.app/',
      repoURL: 'https://github.com/dylanplayer/break-out',
    },
    {
      name: 'Charity Tracker',
      description: 'Web app that tracks users donations to charities',
      languages: [
        {
          name: 'Python',
          image: '/img/python.png',
        },
        {
          name: 'Flask',
          image: '/img/flask.png',
          alt: '/img/flask-alt.png',
        },
        {
          name: 'MongoDB',
          image: '/img/mongo.png',
        },
      ],
      liveURL: 'https://charity-tracker.dylanplayer.com/',
      repoURL: 'https://github.com/dylanplayer/Charity-Tracker',
    },
  ];

  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme'));

  return (
    <div className='projects'>
      {projects.map((project, i) => {
        return (
          <div className='project' key={i}>
            <div className='project-info'>
              <h1 className='project-name'>{project.name}</h1>
              <p className='project-description'>{project.description}</p>
              <div className='languages'>
                {project.languages.map((language, j) => {
                  return (
                    <img key={j} className='language-image' src={theme == 'dark' && language.alt ? language.alt : language.image} alt={language.name}/>
                  );
                })}
              </div>
            </div>
            <div className='project-buttons'>
              <a href={project.liveURL} target='_blank' className='project-button live-button'>Live</a>
              <a href={project.repoURL} target='_blank' className='project-button code-button'>Code</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Portfolio = () => {
  return (
    <Layout>
      <div className='portfolio'>
        <h1 className='portfolio-title'>Portfolio</h1>
        <Projects />
      </div>
    </Layout>
  );
}

export default Portfolio
