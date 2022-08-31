import React from 'react';
import { Row, Avatar, Spacer, Text, Card, Grid } from '@nextui-org/react';
import JobData from '../../types/JobData';

interface JobRowProps {
  job: JobData
}

const JobRow = ({job}:JobRowProps) => {
  return (
    <>
      <Row justify='center'>
        <Card
          css={{ p: "$6", mw: "400px" }}
          isPressable
          isHoverable
          onPress={() => open(`/dashboard/jobs/${job.id}`, '_self')}
        >
          <Card.Header>
            <Avatar
              squared
              size='sm'
              src={job.img}
            />
            <Grid.Container css={{ pl: "$6" }}>
              <Grid xs={12}>
                <Text h4 css={{ lineHeight: "$xs" }}>{job.title}</Text>
              </Grid>
            </Grid.Container>
          </Card.Header>
        </Card>
      </Row>
      <Spacer y={1}/>
    </>
  );
}

export default JobRow;
