import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Col, Container, Row, Spacer, Text } from '@nextui-org/react';
import utilStyles from '../styles/utils.module.css';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Login = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formValid = username.length >= 4 && password.length >= 8;
  const formData = {
    username: username,
    password: password
  }

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Collection of Dylan Player's academic experiences." />
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Login</Text>
        <Container xs gap={1}>
          <Spacer y={1}/>
          <Col>
            <Row justify='center'>
              <Button
                  ripple
                  color={'primary'}
                  shadow={false}
                  href='/api/auth/login'
                  onClick={(e) => {
                    e.preventDefault()
                    signIn('google')
                  }}
                >
                  Sign in with Google
                </Button>
            </Row>
          </Col>
        </Container>
      </main>
    </div>
  );
}

export default Login;
