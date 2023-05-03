import { Col, Row } from "react-bootstrap";
import { Burger } from "./Burger";

export const Layout = ({ children, header, onePage }) => {
  return (
    <>
      {header ? (
        <Row className="s0_header d-none d-md-flex justify-content-end text-uppercase m-0 p-0 w-100">
          <Col>
            <Burger></Burger>
          </Col>
          <Col md={1}>Boutique</Col>
          <Col md={1}>Contact</Col>
          <Col md={1} className="d-none d-md-flex"></Col>
        </Row>
      ) : null}
      <Row>
        {onePage ? <Col md={1}></Col> : null }
        <Col md={11}>{children}</Col>
      </Row>
    </>
  );
};
