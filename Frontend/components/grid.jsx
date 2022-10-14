import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";

export default function Grid(props) {
    return (
        <Container>
            <Row>
                <Col xs={12} md={8}>
                    xs=12 md=8
                </Col>
                <Col xs={6} md={4}>
                    xs=6 md=4
                </Col>
            </Row>
        </Container>
    );
}
