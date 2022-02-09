import React from "react";
import Layout from '@theme/Layout';
import './Work.css';

const JobsMarkup = () => {
  const jobs = [
    {
      company: 'Shopify',
      url: 'https://shopify.com',
      title: 'Dev Degree Engineering Intern',
      description: '',
      years: '2021 - Present',
      img: '/img/shopify.png',
    },
    {
      company: 'Player Web Works',
      url: '',
      title: 'Founder',
      description: '',
      years: '2020 - 2021',
      img: '/img/pww.png',
    },
    {
      company: 'Sikes Shoe Company',
      url: 'https://sikesshoes.com',
      title: 'Online Store Management & Sales',
      description: '',
      years: '2016 - 2021',
      img: '/img/sikes.png',
    },
    
  ]

  return (
    <div className="jobs">
      {jobs.map((job, i) => {
        return (
          <div className="job" key={i}>
            <div className="job-img-container"><a href={job.url}><img className="job-img" src={job.img}/></a></div>
            <div className="job-info">
              <h1 className="company-name">{job.company}</h1>
              <p className="job-title">{job.title}</p>
              <p className="job-years">{job.years}</p>
              <p className="job-description">{job.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Work = () => {
  return (
    <Layout>
      <div className="work">
        <h1 className="work-title">Work</h1>
        <JobsMarkup />
      </div>  
    </Layout>
  );
}

export default Work;
