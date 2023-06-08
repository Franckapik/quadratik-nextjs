import { Col, Row } from "react-bootstrap";
import { Burger } from "./Burger";
import Link from "next/link";

export const Layout = ({ children, header, onePage, noburger, cart, contact, shop, home, sticky }) => {
  return (
    <>
      {header ? (
        <Row style={{ position: sticky ? "sticky" : "inherit" }} className="s0_header text-uppercase m-0 p-0 w-100 ">
          {!noburger ? (
            <Col>
              <Burger></Burger>
            </Col>
          ) : null}
          <Row className="justify-content-end d-none d-md-flex">
          {cart ? (
            <Col md={1}>
             
              <Link href={"/shop/cart"}>Panier</Link>
            </Col>
          ) : null}
          {shop ? (
            <Col md={1}>
              <Link href={"/shop"}>Boutique</Link>
            </Col>
          ) : null}
          {home ? (
            <Col md={1}>
              <Link href={"/"}>Accueil</Link>
            </Col>
          ) : null}
          {contact ? (
            <Col md={1}>
              <Link href={"/contact"}>Contact</Link>
            </Col>
          ) : null}
          <Col md={1} className="d-none d-md-flex"></Col></Row>
        </Row>
      ) : null}
      <Row>
        {onePage ? <Col md={1} className="d-none d-md-flex"></Col> : null}
        <Col md={onePage ? 11 : 12}>{children}</Col>
      </Row>
    </>
  );
};
