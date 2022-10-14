import style from "./grid.module.css"
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";

export default function Grid(props) {
    console.log()
    return (
        <Container className={style.mainBox}>
            <Row xs={1} md={2}>
                {props.children.map(e => <Col className={style.fake}> {e}</Col>)}
            </Row>
        </Container>
    );
}
