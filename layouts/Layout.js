import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import * as React from "react";
import SvgComponent from "../components/Waves";
import Link from "next/link";

function Layout({children}) {
  return (
    <Container fluid>
      <Row>
        <Col sm={1}>
          <Row>
            <Col sm={8} className="menu">
              <i className="fal fa-light fa-bars fa-2x burger"></i>
              <span className="horizontal">Boutique</span>
            </Col>
            <Col sm={4} className="main"></Col>
          </Row>
        </Col>
        <Col sm={11} className="main">
         {children}
        </Col>
      </Row>
    </Container>
  );
}


export default Layout;
