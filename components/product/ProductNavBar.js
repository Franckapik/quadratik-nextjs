import { Col, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const ProductNavBar = () => {

    return (
    <Row className="product_navbar_row ft1 align-items-center">
      <Col md={2}>Diffuseurs</Col>
      <Col md={2}>Absorbeurs</Col>
      <Col md={2}>Accessoires</Col>
      <Col md={3}></Col>
{/*         <Navbar >
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Nav.Link href="?TAG=Diffuseurs">Diffuseurs</Nav.Link>
              <Nav.Link href="?TAG=Absorbeurs">Absorbeurs</Nav.Link>
              <Nav.Link href="#link">Accessoires</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
      </Row>)
}