import Head from 'next/head';
import React from 'react';
import utilStyles from '../../styles/utils.module.css';
import { getSession, signOut } from 'next-auth/react';
import { Text, Container, Row, Button, Spacer, Col } from '@nextui-org/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

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

  return {
    props: { session }
  }
}

const Dashboard = ({ session }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  
  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Dashboard</Text>
        <Container gap={0} xs>
          <Col>
            <Spacer y={1}/>
            <Row justify='center' align='center' wrap='wrap' fluid>
              <Button
                ripple
                color={'gradient'}
                shadow={false}
                href='/api/auth/logout'
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
                style={{ height: '60px', width: '90%' }}
              ><Text h5>Sign Out</Text></Button>
            </Row>
            <Spacer y={1}/>
            <Row justify='center' align='center' wrap='wrap' fluid>
              <Button
                ripple
                color={'gradient'}
                shadow={false}
                onClick={(e) => {router.push('/dashboard/projects')}}
                style={{ height: '60px', width: '90%' }}
              ><Text h5>Projects</Text></Button>
            </Row>
            <Spacer y={1}/>
            <Row justify='center' align='center' wrap='wrap' fluid>
              <Button
                ripple
                color={'gradient'}
                shadow={false}
                onClick={(e) => {router.push('/dashboard/schools')}}
                style={{ height: '60px', width: '90%' }}
              ><Text h5>Schools</Text></Button>
            </Row>
            <Spacer y={1}/>
            <Row justify='center' align='center' wrap='wrap' fluid>
              <Button
                ripple
                color={'gradient'}
                shadow={false}
                onClick={(e) => {router.push('/dashboard/jobs')}}
                style={{ height: '60px', width: '90%' }}
              ><Text h5>Work</Text></Button>
            </Row>
          </Col>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
