import style from "./ChallengeBox.module.css"
import ConfettiGenerator from "confetti-js";
import { useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useRouter } from 'next/router'

import VerticalProgressBar from "./VerticalProgressBar"
import Box from "./box"

import ACTIVITIES from "../activities.json"

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis odio, interdum eu nibh in, volutpat ullamcorper massa. Maecenas consectetur, elit vitae dictum fringilla, leo odio ornare quam, congue mattis diam arcu id urna. Suspendisse ut tortor facilisis massa scelerisque fringilla et et nibh."

const barsHeight = 600

export default function ChallengeBox(props) {

    useEffect(() => {
        if (props.user != 100) return
        const confettiSettings = {
            target: 'my-canvas',
            width: window.innerWidth - 20,
            height: window.innerHeight - 60,
            rotate: true
        };
        const confetti = new ConfettiGenerator(confettiSettings);
        setTimeout(() => confetti.render(), 4000);

        return () => confetti.clear();
    }, []) // add the var dependencies or not


    const router = useRouter()

    const redirect = (search) => {
        router.push(search)
    }

    const sport1 = props.sports[0]
    const sport2 = props.sports[1]
    const sport3 = props.sports[2]

    return (
        <>
            <canvas className={style.confetti} id="my-canvas" />
            <Container className={style.mainBox}>
                <Row>
                    <Col style={{ height: "fit-content" }}>
                        <h4 style={{ textAlign: "end", marginRight: 40 }}> You </h4>
                        <VerticalProgressBar right current={props.user} height={barsHeight} step={1} />
                    </Col>
                    <Col xs={6}>
                        <br />
                        <div onClick={() => redirect(sport1.search)}>
                            <Box
                                onOver
                                height={200}
                                image={sport1.src}
                                front={
                                    <></>
                                }
                                back={
                                    <div style={{ padding: 30 }}>
                                        <h5 className="with-eight" >{sport1.name.charAt(0).toUpperCase() + sport1.name.slice(1)}: Challenge of the week </h5>
                                        <h6 className="with-eight" > {sport1.summary} </h6>
                                    </div>
                                }
                            />
                        </div>
                        <br />
                        <div onClick={() => redirect(sport2.search)}>
                            <Box
                                height={200}
                                image={sport2.src}
                                front={
                                    <></>
                                }
                                back={
                                    <div style={{ padding: 30 }}>
                                        <h5 className="with-eight">{sport2.name.charAt(0).toUpperCase() + sport2.name.slice(1)}: Challenge of the week </h5>
                                        <h6 className="with-eight"> {sport2.summary} </h6>
                                    </div>
                                }
                            />
                        </div>
                        <br />
                        <div onClick={() => redirect(sport3.search)}>
                            <Box
                                height={200}
                                image={sport3.src}
                                front={
                                    <></>
                                }
                                back={
                                    <div style={{ padding: 30 }}>
                                        <h5 className="with-eight">{sport3.name.charAt(0).toUpperCase() + sport3.name.slice(1)}: Challenge of the week </h5>
                                        <h6 className="with-eight"> {sport3.summary} </h6>
                                    </div>
                                }
                            />
                        </div>
                    </Col>
                    <Col>
                        <h4 style={{ textAlign: "start", marginLeft: 40 }}> Your competitor </h4>
                        <VerticalProgressBar left current={props.competitor} height={barsHeight} step={1} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}