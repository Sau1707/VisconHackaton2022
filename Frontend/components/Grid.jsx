import style from "./Grid.module.css"
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";

export default function Grid(props) {
    console.log()
    return (
        <Container className={style.mainBox} style={{ ...props.style }}>
            <Row xs={1} md={2}>
                {props.children.map((e, i) => (
                    <Col
                        key={i}
                        className={style.fake}>
                        {e}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
