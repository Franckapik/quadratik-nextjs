import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import * as React from "react";
import SvgComponent from "../components/Waves";
import Link from "next/link";

function HomePage() {
  return (
    <Container fluid>
      <Row>
        <Col sm={1}>
          <Row>
            <Col sm={8} className="menu">
              <i className="fal fa-light fa-bars fa-2x burger"></i>
            </Col>
            <Col sm={4} className="main"></Col>
          </Row>
        </Col>
        <Col sm={11} className="main">
          <Home_Main />
        </Col>
      </Row>
    </Container>
  );
}

const Home_Main = () => (
  <>
    <SvgComponent className="waves" />
    <Link href={"/quadralab/quadralab"}>
      <img className="logo_main" src="/logo.png" />
    </Link>
  </>
);

export default HomePage;
