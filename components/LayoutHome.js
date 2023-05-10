import { Button, Col, ListGroup, Offcanvas, Row } from "react-bootstrap";
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
              <Burger onClick={toggleShow} toggled={show}></Burger>
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
          <Offcanvas.Title className="text-uppercase me-4">Quadratik</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {" "}
          <ListGroup variant="flush">
            <Link href="/"><ListGroup.Item className="ft2">Accueil</ListGroup.Item></Link>
            <Link href="/shop"> <ListGroup.Item className="ft2">Boutique</ListGroup.Item></Link>
            <Link href="/quadralab"><ListGroup.Item className="ft2">Quadralab</ListGroup.Item></Link>
            <Link href="/"><ListGroup.Item className="ft2">Les réalisations</ListGroup.Item></Link>
            <Link href="/contact"><ListGroup.Item className="ft2">Contact</ListGroup.Item></Link>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
