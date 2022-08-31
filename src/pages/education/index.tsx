import Head from 'next/head';
import React from 'react';
import utilStyles from '../../styles/utils.module.css';
import { Text, Container, Row } from '@nextui-org/react';
import EducationCard from '../../components/EducationCard';
import SchoolData from '../../types/SchoolData';
import { prisma } from '../../../db';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const schools = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
      degree: true,
      timeframe: true,
      url: true,
      img: true,
    },
  });

  return {
    props: { schools: schools }
  }
}

const Education = ({ schools }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Education</title>
        <meta name="description" content="Collection of Dylan Player's academic experiences." />
      </Head>
      <main className={utilStyles.main}>
        <Text h1 className={utilStyles.pageTitle}>Education</Text>
        <Container gap={0}>
          <Row justify='center' align='center' wrap='wrap' fluid>
            {
              schools.map((school:SchoolData, index:number) => {
                return (
                  <EducationCard 
                    name={school.name}
                    degree={school.degree}
                    timeframe={school.timeframe}
                    img={school.img}
                    color='$blue900'
                    link={school.url}
                    key={index}
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

export default Education;
