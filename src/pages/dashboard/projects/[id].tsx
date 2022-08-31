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
  const project = await prisma.project.findUnique({
    where: {
      id: String(id),
    },
    select: {
      id: true,
      title: true,
      description: true,
      img: true,
      live: true,
      code: true,
    }
  });

  if (!project) {
    return {
      redirect: {
        destination: '/dashboard/projects',
        permanent: false,
      },
    }
  }

  return {
    props: { session, project }
  }
}

const Project = ({ session, project }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [files, setFiles] = useState<FileList | null>();
  const [live, setLive] = useState(project.live);
  const [code, setCode] = useState(project.code);
  const [loading, setLoading] = useState(false);

  const validateURL = (url:string) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
  }

  const titleValid = title.length > 0;
  const descriptionValid = description.length > 0;
  const liveValid = validateURL(live);
  const codeValid = validateURL(code);
  const filesValid = files !== null && files?.length == 1;
  const formValid = titleValid && descriptionValid && liveValid && codeValid;

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
      key: project.img.split("/").pop(),
    };

    await fetch('/api/images/delete', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  const submitProject = async () => {
    if (formValid) {
      setLoading(true);
      let img = project.img;

      if (files && files !== null && files.length > 0) {
        img = await uploadImage();
      }

      const projectData = {
        title: title,
        description: description,
        img: String(img),
        live: live,
        code: code,
      }
      try {
        fetch(`/api/projects/${project.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        })
          .then((res) => res.json())
          .then((project) => {
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
        <title>Edit Project</title>
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Edit Project</Text>
        <Container>
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
              placeholder='enter code url'
              label='Code URL'
              clearable={!loading}
              bordered
              fullWidth
              disabled={loading}
              color={codeValid ? 'success' : 'warning'}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Row>
          <Spacer y={1}/>
          <Row>
            <Input
              placeholder='enter live url'
              label='Live URL'
              clearable={!loading}
              bordered
              fullWidth
              disabled={loading}
              color={liveValid ? 'success' : 'warning'}
              value={live}
              onChange={(e) => setLive(e.target.value)}
            />
          </Row>
          <Spacer y={1}/>
          <Row>
            <Avatar
              squared
              size='sm'
              src={project.img}
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
              onPress={() => submitProject()}
              style={{ width: '100%' }}
            >
              {loading ? <Loading color='white' size='sm'/> : 'Send'}
            </Button>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Project;
