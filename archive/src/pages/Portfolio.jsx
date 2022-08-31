import React, { useState } from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import '../css/Portfolio.css';

const Projects = () => {
  const projects = [
    {
      name: 'Hedgehog',
      description: 'Web app that approves and denies loan applications',
      languages: [
        {
          name: 'React',
          image: '/img/react.png',
        },
        {
          name: 'Flask',
          image: '/img/flask.png',
          alt: '/img/flask-alt.png',
        },
      ],
      liveURL: 'https://hedgehog.dylanplayer.com',
      repoURL: 'https://github.com/YHacks-Hedgehogs/hedgehog-web',
    },
    {
      name: 'Evently',
      description: 'Event planning & management application',
      languages: [
        {
          name: 'Javascript',
          image: '/img/js.png',
        },
        {
          name: 'NodeJS',
          image: '/img/node.png',
        },
        {
          name: 'Postgresql',
          image: '/img/pgsql.png',
        },
      ],
      liveURL: 'https://evently.dylanplayer.com/',
      repoURL: 'https://github.com/dylanplayer/event-planner',
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
      name: 'Gif Search',
      description: 'Gif searching application using tenor',
      languages: [
        {
          name: 'Javascript',
          image: '/img/js.png',
        },
        {
          name: 'NodeJS',
          image: '/img/node.png',
        },
      ],
      liveURL: 'https://gif-search.dylanplayer.com/',
      repoURL: 'https://github.com/dylanplayer/Node-Gif-Search-Tutorial',
    },
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

  const {isDarkTheme} = useColorMode();

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
                    <img key={j} className='language-image' src={isDarkTheme && language.alt ? language.alt : language.image} alt={language.name}/>
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
      <div className='page'>
        <h1 className='page-title'>Portfolio</h1>
        <Projects />
      </div>
    </Layout>
  );
}

export default Portfolio
