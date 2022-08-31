import React from 'react';
import { Row, Avatar, Spacer, Text, Card, Grid } from '@nextui-org/react';
import JobData from '../../types/JobData';
import SchoolData from '../../types/SchoolData';

interface SchoolRowProps {
  school: SchoolData;
}

const SchoolRow = ({school}:SchoolRowProps) => {
  return (
    <>
      <Row justify='center'>
        <Card
          css={{ p: "$6", mw: "400px" }}
          isPressable
          isHoverable
          onPress={() => open(`/dashboard/schools/${school.id}`, '_self')}
        >
          <Card.Header>
            <Avatar
              squared
              size='sm'
              src={school.img}
            />
            <Grid.Container css={{ pl: "$6" }}>
              <Grid xs={12}>
                <Text h4 css={{ lineHeight: "$xs" }}>{school.name}</Text>
              </Grid>
            </Grid.Container>
          </Card.Header>
        </Card>
      </Row>
      <Spacer y={1}/>
    </>
  );
}

export default SchoolRow;
