import Head from 'next/head';
import React from 'react';
import utilStyles from '../../styles/utils.module.css';
import { Text, Container, Row } from '@nextui-org/react';
import ProjectCard from '../../components/ProjectCard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { prisma } from '../../../db';
import ProjectData from '../../types/ProjectData';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      img: true,
      live: true,
      code: true,
    },
  });

  return {
    props: { projects: projects }
  }
}

const Portfolio = ({ projects }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Collection of some of the projects that Dylan Player has worked on." />
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Portfolio</Text>
        <Container gap={0}>
          <Row justify='center' align='center' wrap='wrap' fluid>
            {
              projects.map((project:ProjectData, index:number) => {
                return (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    img={project.img}
                    live={project.live}
                    code={project.code}
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

export default Portfolio;
