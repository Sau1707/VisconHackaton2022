import style from "./ChallengeBox.module.css"
import { Container, Row, Col } from "react-bootstrap"
import VerticalProgressBar from "./VerticalProgressBar"
import Box from "./box"

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis odio, interdum eu nibh in, volutpat ullamcorper massa. Maecenas consectetur, elit vitae dictum fringilla, leo odio ornare quam, congue mattis diam arcu id urna. Suspendisse ut tortor facilisis massa scelerisque fringilla et et nibh."


export default function ChallengeBox() {
    return (
        <Container className={style.mainBox}>
            <Row>
                <Col style={{ height: "fit-content" }}>
                    <h4 style={{ textAlign: "end", marginRight: 40 }}> You </h4>
                    <VerticalProgressBar right height={700} step={1} />
                </Col>
                <Col xs={6}>
                    <h4> Challeges </h4>
                    <Box
                        onOver
                        height={180}
                        front={
                            <h3 style={{ padding: 70 }}> Basket </h3>
                        }
                        back={
                            <div style={{ padding: 30 }}>
                                <h5> Basket: Challenge of the week </h5>
                                <h6> {loremIpsum} </h6>
                            </div>
                        }
                    />
                    <br />
                    <Box
                        height={180}
                        front={
                            <h3 style={{ padding: 70 }}> Aqua Fitness </h3>
                        }
                        back={
                            <div style={{ padding: 30 }}>
                                <h5> Aqua Fitness: Challenge of the week </h5>
                                <h6> {loremIpsum} </h6>
                            </div>
                        }
                    />
                    <br />
                    <Box
                        height={180}
                        front={
                            <h3 style={{ padding: 70 }}> BigAir </h3>
                        }
                        back={
                            <div style={{ padding: 30 }}>
                                <h5> BigAir: Challenge of the week </h5>
                                <h6> {loremIpsum} </h6>
                            </div>
                        }
                    />
                </Col>
                <Col>
                    <h4 style={{ textAlign: "start", marginLeft: 40 }}> Your competitor </h4>
                    <VerticalProgressBar left height={700} step={1} />
                </Col>
            </Row>
        </Container>
    )
}