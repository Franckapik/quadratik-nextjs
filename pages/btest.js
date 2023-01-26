import { Col, Container, Row } from "react-bootstrap"

const Btest = () => (
    <Container >
        <Row>
            <Col xs={5} style={{backgroundColor : "red"}}>col5</Col>
        </Row>
        <Row className="justify-content-end">
            <Col xxl={3} xl={5} l={8} md={10}  style={{backgroundColor : "blue", height : "15vh"}}><img style={{width : "100%"}} src="/cards.png"></img></Col>
        </Row>
    </Container>
)

export default Btest;