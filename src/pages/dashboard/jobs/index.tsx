import Head from 'next/head';
import React from 'react';
import utilStyles from '../../../styles/utils.module.css';
import { getSession, signOut } from 'next-auth/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Avatar, Button, Card, Container, Grid, Row, Spacer, Table, Text } from '@nextui-org/react';
import ProjectRow from '../../../components/ProjectRow';
import JobData from '../../../types/JobData';
import { prisma } from '../../../../db';
import JobRow from '../../../components/JobRow';

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
    props: { session, jobs: jobs }
  }
}

const Jobs = ({ session, jobs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Jobs</title>
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Jobs</Text>
        <Spacer x={1.5}/>
        <Container gap={1} sm>
          {
            jobs.map((job:JobData, index:number) => {
              return (<JobRow key={index} job={job}/>);
            })
          }
          <Row justify='center'>
            <Card
              css={{ p: "$6", mw: "400px" }}
              isPressable
              isHoverable
              onPress={() => open(`/dashboard/jobs/new`, '_self')}
            >
              <Card.Header>
                <Grid.Container>
                  <Grid xs={12} justify='center'>
                    <Text h4 css={{ lineHeight: "$xs" }}>Create Job</Text>
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

export default Jobs;
