import React from 'react';
import Layout from '@theme/Layout';

const News = () => {
  const articles = [
    {
      title: "ACS Student Thriving Now With Real-World Experience",
      description: "He’s only just starting his second semester in Dominican’s Applied Computer Science (ACS) program, but Dylan Player...",
      url: "https://www.dominican.edu/news/news-listing/acs-student-thriving-now-real-world-experience",
      img: "https://www.dominican.edu/sites/default/files/styles/width_960/public/2022-01/Final%20Dylan%20Player%20Photo%20for%20Homepage.jpg?itok=HbgWcZN_",
    },
    {
      title: "Hands-On Curriculum Boosts Applied Computer Science",
      description: "Dylan Player a first-year student, is part of the Shopify Dev Degree program. Not only is he taking classes with Dominican’s ACS...",
      url: "https://www.dominican.edu/news/news-listing/hands-curriculum-boosts-applied-computer-science-program#:~:text=Dylan%20Player%2C%20a%20first%2Dyear%20student,for%20the%20Shopify%20Dev%20Degree%20program.",
      img: "https://www.dominican.edu/sites/default/files/styles/width_960/public/2022-02/Homepage%20Image%20for%20ACS%20RoundUp%20story.jpg?itok=qpWhI8fW",
    },
  ];

  return (
    <Layout>
      <div className='page'>
        <h1 className="page-title">News</h1>
        <div className='cards-v'>
          {
            articles.map((article, i) => {
              return (
                <div className='card-h' key={i}>
                  <a href={article.url}><img className='card-h-img' src={article.img}/></a>
                  <div className='card-h-info'>
                    <h1 className='card-h-name'>{article.title}</h1>
                    <p className='card-h-study'>{article.description}</p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </Layout>
  );
}

export default News;
