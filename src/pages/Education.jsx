import React from "react";
import Layout from '@theme/Layout';
import './Education.css';

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
    <div className="schools">
      {schools.map((school, i) => {
        return (
          <div className="school" key={i}>
            <a href={school.url}><img className="school-img" src={school.img}/></a>
            <div className="school-info">
              <h1 className="school-name">{school.school}</h1>
              <p className="school-study">{school.study}</p>
              <p className="school-years">{school.years}</p>
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
      <div className="education">
        <h1 className="education-title">Education</h1>
        <SchoolsMarkup />
      </div>
    </Layout>
  );
}

export default Education;