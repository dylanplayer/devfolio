import Head from 'next/head';
import React from 'react';
import utilStyles from '../../../styles/utils.module.css';
import { getSession, signOut } from 'next-auth/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Avatar, Button, Card, Container, Grid, Row, Spacer, Table, Text } from '@nextui-org/react';
import ProjectRow from '../../../components/ProjectRow';
import ProjectData from '../../../types/ProjectData';
import { prisma } from '../../../../db';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

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
    props: { session, projects: projects }
  }
}

const Projects = ({ session, projects }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Projects</title>
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Projects</Text>
        <Spacer x={1.5}/>
        <Container gap={1} sm>
          {
            projects.map((project:ProjectData, index:number) => {
              return (<ProjectRow key={index} project={project}/>);
            })
          }
          <Row justify='center'>
            <Card
              css={{ p: "$6", mw: "400px" }}
              isPressable
              isHoverable
              onPress={() => open(`/dashboard/projects/new`, '_self')}
            >
              <Card.Header>
                <Grid.Container>
                  <Grid xs={12} justify='center'>
                    <Text h4 css={{ lineHeight: "$xs" }}>Create Project</Text>
                  </Grid>
                </Grid.Container>
              </Card.Header>
            </Card>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Projects;
