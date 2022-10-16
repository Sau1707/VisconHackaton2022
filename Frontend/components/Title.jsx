export default function Title(props) {
    return (
        <div style={{ marginTop: 30, marginBottom: 30, textAlign: "center" }}>
            <h1> {props.title} </h1>
            <h5> {props.desc} </h5>
        </div>
    )
}