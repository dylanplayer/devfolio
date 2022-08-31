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
  const job = await prisma.job.findUnique({
    where: {
      id: String(id),
    },
    select: {
      id: true,
      company: true,
      title: true,
      description: true,
      timeframe: true,
      url: true,
      img: true,
    }
  });

  if (!job) {
    return {
      redirect: {
        destination: '/dashboard/jobs',
        permanent: false,
      },
    }
  }

  return {
    props: { session, job }
  }
}

const Job = ({ session, job }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [company, setCompany] = useState(job.company);
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [timeframe, setTimeframe] = useState(job.timeframe);
  const [url, setUrl] = useState(job.url);
  const [files, setFiles] = useState<FileList | null>();
  const [loading, setLoading] = useState(false);

  const validateURL = (url:string) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
  }

  const companyValid = company.length > 0;
  const titleValid = title.length > 0;
  const descriptionValid = description.length > 0;
  const timeframeValid = timeframe.length > 0;
  const urlValid = validateURL(url);
  const filesValid = files !== null && files?.length == 1;
  const formValid = companyValid && titleValid && descriptionValid && timeframeValid && urlValid;

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
      key: job.img.split("/").pop(),
    };

    await fetch('/api/images/delete', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  const submitJob = async () => {
    if (formValid) {
      setLoading(true);
      let img = job.img;

      if (files && files !== null && files.length > 0) {
        img = await uploadImage();
      }

      const jobData = {
        company: company,
        title: title,
        description: description,
        timeframe: timeframe,
        url: url,
        img: String(img),
      }
      try {
        fetch(`/api/jobs/${job.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobData),
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
        <title>Edit Job</title>
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Edit Job</Text>
        <Container>
          <Row>
            <Input
              placeholder='enter company name'
              label='Company'
              clearable={!loading}
              bordered
              fullWidth
              disabled={loading}
              color={companyValid ? 'success' : 'warning'}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Row>
          <Spacer y={1}/>
          <Row>
            <Input
              placeholder='enter a title'
              label='Title'
              clearable={!loading}
              bordered
              fullWidth
              disabled={loading}
              color={titleValid ? 'success' : 'warning'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Row>
          <Spacer y={1}/>
          <Row>
            <Textarea
              placeholder='enter a description'
              label='Description'
              bordered
              fullWidth
              disabled={loading}
              color={descriptionValid ? 'success' : 'warning'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              placeholder='enter company url'
              label='Company URL'
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
              src={job.img}
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
              onPress={() => submitJob()}
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

export default Job;
