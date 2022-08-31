import Head from 'next/head';
import React from 'react';
import utilStyles from '../../styles/utils.module.css';
import { Text, Container, Row } from '@nextui-org/react';
import WorkCard from '../../components/WorkCard';
import JobData from '../../types/JobData';
import { prisma } from '../../../db';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jobs = await prisma.job.findMany({
    select: {
      id: true,
      company: true,
      title: true,
      description: true,
      timeframe: true,
      url: true,
      img: true,
    },
  });

  return {
    props: { jobs: jobs }
  }
}

const Work = ({ jobs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Work</title>
        <meta name="description" content="Collection of companies that Dylan Player has worked at." />
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Work</Text>
        <Container gap={0}>
          <Row justify='center' align='center' wrap='wrap' fluid>
            {
              jobs.map((job:JobData, index:number) => {
                return (
                  <WorkCard
                    company={job.company}
                    url={job.url}
                    title={job.title}
                    description={job.description}
                    timeframe={job.timeframe}
                    img={job.img}
                    key={index}
                  />
                );
              })
            }
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Work;
