import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AchievementGrid() {
  return (
    <Container>
      <Row xs={1} md={2}>
        <Col xs={1} md={2}></Col>
        <Col md="auto"></Col>
        <Col md="auto"></Col>
      </Row>
      <Row xs={1} md={2}>
        <Col xs={1} md={2}></Col>
        <Col md="auto"></Col>
        <Col md="auto"></Col>
      </Row>
    </Container>
  );
}

export default AchievementGrid;