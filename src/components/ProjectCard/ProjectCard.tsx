import { Card, Grid, Text, Link, Avatar, Button, Row, Col } from '@nextui-org/react';

interface ProjectCardProps {
  title: string
  description: string
  img: string
  live: string
  code: string
}

const ProjectCard = ({title, description, img, live, code}:ProjectCardProps) => {
  return (
    <Card css={{ p: '$6', mw: '400px', bg:'$blue200', margin: '1rem' }} isPressable isHoverable onClick={() => window.open(live, "_blank")}>
      <Card.Header>
        <Avatar
          squared
          size='lg'
          alt={`${title} logo`}
          src={img}
        />
        <Grid.Container css={{ pl: '$6' }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: '$xs' }}>
              {title}
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: '$accents8' }}>{new URL(live).hostname.replace(/www./, '')}</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: '$2' }}>
        <Text>{description}</Text>
      </Card.Body>
      <Card.Footer>
        <Row justify="flex-end" gap={1}>
          <Button size='sm' onClick={() => window.open(code, "_blank")}>Code</Button>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;
