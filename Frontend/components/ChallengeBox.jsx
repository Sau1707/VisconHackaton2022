import style from "./ChallengeBox.module.css"
import ConfettiGenerator from "confetti-js";
import { useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useRouter } from 'next/router'

import VerticalProgressBar from "./VerticalProgressBar"
import Box from "./box"

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis odio, interdum eu nibh in, volutpat ullamcorper massa. Maecenas consectetur, elit vitae dictum fringilla, leo odio ornare quam, congue mattis diam arcu id urna. Suspendisse ut tortor facilisis massa scelerisque fringilla et et nibh."

const barsHeight = 600

// TODO: change box height

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

    const redirect = (e) => {
        e.preventDefault();
        `${props.href}${props.sportsData[sport1].number}` ? router.push(`${props.href}${props.sportsData[sport1].number}`) : null
    }


    const redirect1 = (e) => {
        e.preventDefault();
        `${props.href}${props.sportsData[sport2].number}` ? router.push(`${props.href}${props.sportsData[sport2].number}`) : null
    }

    const redirect2 = (e) => {
        e.preventDefault();
        `${props.href}${props.sportsData[sport3].number}` ? router.push(`${props.href}${props.sportsData[sport3].number}`) : null
    }


    var sport1 = "Aikido"
    var sport2 = "Freies Sporttreiben"
    var sport3 = "Zumba"

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
                        <h4> Challeges </h4>
                        <div onClick={redirect}>
                            <Box
                                onOver
                                height={200}
                                front={
                                    <h3 style={{ padding: 80 }}>{sport1}</h3>
                                }
                                back={
                                    <div style={{ padding: 30 }}>
                                        <h5>{sport1}: Challenge of the week </h5>
                                        <h6> {props.sportsData[sport1].summary} </h6>
                                    </div>
                                }
                            />
                        </div>
                        <br />
                        <div onClick={redirect1}>
                            <Box
                                height={200}
                                front={
                                    <h3 style={{ padding: 80 }}>{sport2}</h3>
                                }
                                back={
                                    <div style={{ padding: 30 }}>
                                        <h5>{sport2}: Challenge of the week </h5>
                                        <h6> {props.sportsData[sport2].summary} </h6>
                                    </div>
                                }
                            />
                        </div>
                        <br />
                        <div onClick={redirect2}>
                            <Box
                                height={200}
                                front={
                                    <h3 style={{ padding: 80 }}> {sport3} </h3>
                                }
                                back={
                                    <div style={{ padding: 30 }}>
                                        <h5>{sport3}: Challenge of the week </h5>
                                        <h6> {props.sportsData[sport3].summary} </h6>
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