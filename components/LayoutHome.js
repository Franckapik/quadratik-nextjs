import { Col, Offcanvas, Row } from "react-bootstrap";
import { Burger } from "./Burger";
import Link from "next/link";
import { useState } from "react";

export const LayoutHome = ({ children, header, onePage, noburger, cart, contact, shop, home, sticky }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      {header ? (
        <Row className="position-absolute h-100 text-uppercase m-0 p-0 w-100 ">
          {!noburger ? (
            <Col>
              <Burger  onClick={toggleShow} toggled={show}></Burger>
            </Col>
          ) : null}
          <Row className="justify-content-end d-none d-md-flex">
            {cart ? (
              <Col md={1}>
                {" "}
                <Link href={"/shop/panier"}>Panier</Link>
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
            <Col md={1} className="d-none d-md-flex"></Col>
          </Row>
        </Row>
      ) : null}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
