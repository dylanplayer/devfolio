import React from "react";
import Layout from '@theme/Layout';
import '../css/Education.css';

const SchoolsMarkup = () => {
  const schools = [
    {
      school: 'Dominican University of California',
      url: 'https://www.dominican.edu/academics/undergraduate-programs/applied-computer-science-acs',
      study: 'BS in Applied Computer Science',
      years: '2021 - Present',
      img: '/img/du.jpeg',
    },
    {
      school: 'Riverchase Carrer Connections Center',
      url: 'https://www.hoovercityschools.net/site/Default.aspx?PageID=2793',
      study: 'Computer Science',
      years: '2019 - 2021',
      img: '/img/rc3.jpeg',
    },
    {
      school: 'Homewood High School',
      url: 'https://www.homewood.k12.al.us/hhs',
      study: 'High School Diploma',
      years: '2017 - 2021',
      img: '/img/homewood-high-school.jpeg',
    },
  ]

  return (
    <div className="cards-v">
      {schools.map((school, i) => {
        return (
          <div className="card-h" key={i}>
            <a href={school.url}><img className="card-h-img" src={school.img}/></a>
            <div className="card-h-info">
              <h1 className="card-h-name">{school.school}</h1>
              <p className="card-h-text">{school.study}</p>
              <p className="card-h-text">{school.years}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Education = () => {
  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Education</h1>
        <SchoolsMarkup />
      </div>
    </Layout>
  );
}

export default Education;