import { Card, Col, Row, Button, Text } from "@nextui-org/react";

interface EducationCardProps {
  timeframe: string
  name: string
  degree: string
  img: string
  color: string
  link: string
}

export const EducationCard = ({timeframe, name, degree, img, color, link}:EducationCardProps) => (
  <Card css={{ w: "500px", h: "400px", margin: '1rem' }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text h3 color="white" css={{ textShadow: 'lg' }}>{name}</Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={img}
        objectFit="cover"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#0f111466",
        borderTop: "$borderWeights$light solid $gray800",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Row>
            <Col>
              <Text color="#d1d1d1" size={12}>{degree}</Text>
              <Text color="#d1d1d1" size={12}>{timeframe}</Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button
              flat
              auto
              rounded
              css={{ color: "#94f9f0", bg: "#94f9f026" }}
              onClick={() => window.open(link, '_blank')}
            >
              <Text
                css={{ color: color }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                VIEW
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

export default EducationCard;
