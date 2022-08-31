import React from 'react';
import { Row, Avatar, Spacer, Text, Card, Grid } from '@nextui-org/react';
import ProjectData from '../../types/ProjectData';

interface ProjectRowProps {
  project: ProjectData
}

const ProjectRow = ({project}:ProjectRowProps) => {
  return (
    <>
      <Row justify='center'>
        <Card
          css={{ p: "$6", mw: "400px" }}
          isPressable
          isHoverable
          onPress={() => open(`/dashboard/projects/${project.id}`, '_self')}
        >
          <Card.Header>
            <Avatar
              squared
              size='sm'
              src={project.img}
            />
            <Grid.Container css={{ pl: "$6" }}>
              <Grid xs={12}>
                <Text h4 css={{ lineHeight: "$xs" }}>{project.title}</Text>
              </Grid>
            </Grid.Container>
          </Card.Header>
        </Card>
      </Row>
      <Spacer y={1}/>
    </>
  );
}

export default ProjectRow;
