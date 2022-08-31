import Head from 'next/head';
import React, { useState } from 'react';
import utilStyles from '../../../styles/utils.module.css';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Button, Container, Input, Loading, Row, Spacer, Text, Textarea } from '@nextui-org/react';

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

const Projects = ({ session }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>();
  const [live, setLive] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const validateURL = (url:string) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
  }

  const titleValid = title.length > 0;
  const descriptionValid = description.length > 0;
  const liveValid = validateURL(live);
  const codeValid = validateURL(code);
  const filesValid = files !== null && files?.length == 1;
  const formValid = titleValid && descriptionValid && liveValid && codeValid && filesValid;

  const uploadImage = async () => {
    setLoading(true);
    if (!filesValid) {
      setLoading(false);
      return null;
    };
    const formData = new FormData();
    formData.append('file', files[0]);

    const response = await fetch('/api/images/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setLoading(false);
    return data.url;
  }

  const submitProject = async () => {
    if (formValid) {
      const img = await uploadImage();
      setLoading(true);
      try {
        const projectData = {
          title: title,
          description: description,
          img: img,
          live: live,
          code: code,
        }

        fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        })
          .then((res) => res.json())
          .then((project) => {
            open(`/dashboard/projects/${project.id}`, '_self')
          }).catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>New Project</title>
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>New Project</Text>
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

export default Projects;
