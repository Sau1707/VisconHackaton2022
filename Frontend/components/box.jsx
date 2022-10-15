import style from "./example.module.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router'


export default function Box(props) {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.children}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}