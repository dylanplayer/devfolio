import { Card, Avatar, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

interface WorkCardProps {
  company: string
  url: string
  title: string
  description: string
  timeframe: string
  img: string
}

const WorkCard = ({company, url, title, description, timeframe, img}:WorkCardProps) => {
  return (
    <Card css={{ p: '$6', mw: '400px', bg:'$blue200', margin: '1rem' }} isPressable isHoverable onClick={() => window.open(url, "_blank")}>
      <Card.Header>
        <div style={{width: '50px', height: '50px', position: 'relative'}}>
          <Image src={img} alt={`${title} logo`} layout={'fill'} objectFit={'contain'}/>
        </div>
        <Grid.Container css={{ pl: '$6' }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: '$xs' }}>{title}</Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: '$accents8' }}>{company}</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: '$2' }}>
        <Text>{description}</Text>
      </Card.Body>
      <Card.Footer>
        <Text css={{ color: '$accents8' }}>{timeframe}</Text>
      </Card.Footer>
    </Card>
  );
}

export default WorkCard;
