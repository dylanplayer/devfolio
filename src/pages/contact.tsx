import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import { Button, Card, Col, Container, Grid, Input, Loading, Row, SimpleColors, Spacer, Text, Textarea, useInput } from '@nextui-org/react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const validateEmail = (value: string) => {
    return value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
  };

  const formValid = (name !== '' && validateEmail(email) && message !== '');
  const formData = {
    name: name,
    email: email,
    message: message,
  }

  const submitForm = async () => {
    if (formValid) {
      setLoading(true);
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        setLoading(false);
        setSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Contact</title>
        <meta name='description' content='Contact Dylan Player via email.' />
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Contact</Text>
        { success ?
          <Container xs gap={1} justify='center'>
            <Col>
              <Row align='center' justify='center'>
                <Text
                  h1
                  size={45}
                  css={{
                    textGradient: "45deg, $blue600 -20%, $purple700 50%",
                  }}
                  weight="bold"
                >
                  Message Sent Successfully
                </Text>
              </Row>
            </Col>
          </Container>
        :
          <Container xs gap={1}>
            <Col>
              <Spacer y={1.6}/>
              <Row>
                <Input
                  autoFocus
                  clearable
                  bordered
                  shadow={false}
                  onClearClick={() => setName('')}
                  labelPlaceholder="Name"
                  width='100%'
                  value={name}
                  disabled={loading}
                  onChange={(e) => setName(e.target.value)}
                />
              </Row>
              <Spacer y={1.6}/>
              <Row>
                <Input
                  clearable={!loading}
                  bordered
                  shadow={false}
                  onClearClick={() => setEmail('')}
                  status={email == '' ? 'default' : validateEmail(email) ? 'success' : 'error'}
                  color={email == '' ? 'default' : validateEmail(email) ? 'success' : 'error'}
                  type="email"
                  labelPlaceholder="Email"
                  width='100%'
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Row>
              <Spacer y={1.6}/>
              <Row>
                <Textarea
                  labelPlaceholder="Message"
                  label="Message"
                  bordered
                  width='100%'
                  value={message}
                  disabled={loading}
                  shadow={false}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Row>
              <Spacer y={1}/>
              <Row justify='flex-end'>
                <Button
                  ripple
                  color={'primary'}
                  disabled={!formValid ? true : false}
                  shadow={false}
                  onPress={() => submitForm()}
                >
                  {loading ? <Loading color='white' size='sm'/> : 'Send'}
                </Button>
              </Row>
            </Col>
          </Container>
        }
      </main>
    </div>
  );
}

export default Contact;
