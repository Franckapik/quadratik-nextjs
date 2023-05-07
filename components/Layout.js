import { Col, Row } from "react-bootstrap";
import { Burger } from "./Burger";

export const Layout = ({ children, header, onePage, noburger, cart, contact, shop, home, sticky }) => {
  return (
    <>
      {header ? (
        <Row style={{position : sticky ? "sticky" : "relative"}} className="s0_header d-none d-md-flex justify-content-end text-uppercase m-0 p-0 w-100 ">
          {!noburger ? <Col>
            <Burger></Burger>
          </Col> : null}
          {cart ?<Col md={1}>Panier</Col> : null}
          {shop ?<Col md={1}>Boutique</Col> : null}
          {home ?<Col md={1}>Accueil</Col> : null}
          {contact ?<Col md={1}>Contact</Col> : null}
          <Col md={1} className="d-none d-md-flex"></Col>
        </Row>
      ) : null}
      <Row>
        {onePage ? <Col md={1}></Col> : null }
        <Col md={onePage ? 11 : 12}>{children}</Col>
      </Row>
    </>
  );
};
