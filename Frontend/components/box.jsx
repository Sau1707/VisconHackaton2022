import style from "./example.module.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function Box(props) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}