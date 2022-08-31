import Head from 'next/head';
import React, { useState } from 'react';
import utilStyles from '../../../styles/utils.module.css';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Avatar, Button, Col, Container, Input, Loading, Row, Spacer, Text, Textarea } from '@nextui-org/react';
import { prisma } from '../../../../db';
import Router from 'next/router';

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

  const id = context.params?.id;
  const school = await prisma.school.findUnique({
    where: {
      id: String(id),
    },
    select: {
      id: true,
      name: true,
      degree: true,
      timeframe: true,
      url: true,
      img: true,
    }
  });

  if (!school) {
    return {
      redirect: {
        destination: '/dashboard/schools',
        permanent: false,
      },
    }
  }

  return {
    props: { session, school }
  }
}

const School = ({ session, school }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [name, setName] = useState(school.name);
  const [degree, setDegree] = useState(school.degree);
  const [timeframe, setTimeframe] = useState(school.timeframe);
  const [url, setUrl] = useState(school.url);
  const [files, setFiles] = useState<FileList | null>();
  const [loading, setLoading] = useState(false);

  const validateURL = (url:string) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
  }

  const nameValid = name.length > 0;
  const degreeValid = degree.length > 0;
  const timeframeValid = timeframe.length > 0;
  const urlValid = validateURL(url);
  const filesValid = files !== null && files?.length == 1;
  const formValid = nameValid && degreeValid && timeframeValid && urlValid;

  const uploadImage = async () => {
    if (!filesValid) {
      setLoading(false);
      return null;
    };
    try {
      await deleteImage();
  
      const formData = new FormData();
      formData.append('file', files[0]);
  
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error(error);
    }
  }

  const deleteImage = async () => {
    const body = {
      key: school.img.split("/").pop(),
    };

    await fetch('/api/images/delete', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  const submitSchool = async () => {
    if (formValid) {
      setLoading(true);
      let img = school.img;

      if (files && files !== null && files.length > 0) {
        img = await uploadImage();
      }

      const schoolData = {
        name: name,
        degree: degree,
        timeframe: timeframe,
        url: url,
        img: String(img),
      }
      try {
        fetch(`/api/schools/${school.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(schoolData),
        })
          .then((res) => res.json())
          .then((job) => {
            Router.reload();
          }).catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Edit School</title>
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Edit School</Text>
        <Container>
          <Row>
            <Input
              placeholder='enter name'
              label='School Name'
              clearable={!loading}
              bordered
              fullWidth
              disabled={loading}
              color={nameValid ? 'success' : 'warning'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Row>
          <Spacer y={1}/>
          <Row>
            <Input
              placeholder='enter degree'
              label='Degree'
              clearable={!loading}
              bordered
              fullWidth
              disabled={loading}
              color={degreeValid ? 'success' : 'warning'}
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </Row>
          <Spacer y={1}/>
          <Row>
            <Input
              placeholder='enter timeframe'
              label='Timeframe'
              clearable={!loading}
              bordered
              fullWidth
              disabled={loading}
              color={timeframeValid ? 'success' : 'warning'}
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            />
          </Row>
          <Spacer y={1}/>
          <Row>
            <Input
              placeholder='enter school url'
              label='School URL'
              clearable={!loading}
              bordered
              fullWidth
              disabled={loading}
              color={urlValid ? 'success' : 'warning'}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Row>
          <Spacer y={1}/>
          <Row>
            <Avatar
              squared
              size='sm'
              src={school.img}
            />
            <Spacer x={1}/>
            <input
              type={'file'}
              multiple={false}
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
          </Row>
          <Spacer y={1}/>
          <Row justify='flex-end'>
            <Button
              ripple
              color={'primary'}
              disabled={!formValid}
              shadow={false}
              onPress={() => submitSchool()}
              style={{ width: '100%' }}
            >
              {loading ? <Loading color='white' size='sm'/> : 'Update'}
            </Button>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default School;
