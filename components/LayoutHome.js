import Link from "next/link";
import { useState } from "react";
import { Col, ListGroup, Offcanvas, Row } from "react-bootstrap";
import { Burger } from "./Burger";

export const LayoutHome = ({ noburger, cart, contact, shop, home, product, dark, categories, viewedCategory, text_dark, fixed, setDisplay }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Row className="position-absolute h-100 text-uppercase w-100 pb-3 layout_home">
        <Row className={`header justify-content-end align-items-center text-uppercase w-100 ft4 ${dark ? "bg_dark" : ""} ${fixed ? "position-fixed" : "position-sticky"} ${text_dark ? "text_dark" : ""}`}>
          {!noburger ? (
            <Col xs={4} md={1}>
              <Burger onClick={toggleShow} toggled={show}></Burger>
            </Col>
          ) : null}
          {categories ? (
            <>
              {categories.map((a, i) => {
                if (!a.label.includes("Top")) {
                  //no Top 3
                  return (
                    <Col key={"categoryNav" + i} className="p-2 d-none d-md-flex justify-content-center ms-2 me-2" xs={4} md={1} style={{ backgroundColor: a.id == viewedCategory ? "#9fb07ca9" : "inherit" }}>
                      <Link href={"#tag" + a.id} className="cursor">
                        {a.label}
                      </Link>
                    </Col>
                  );
                }
              })}
            </>
          ) : null}
          {product ? (
            <>
              {product.map((a, i) => (
                <Col key={"productNav" + i} className="p-2 d-none d-md-flex justify-content-center text_creme ms-5 me-5" xs={4} md={1} style={{ backgroundColor: i == viewedCategory ? "#9fb07ca9" : "inherit" }}>
                  <div onClick={() => setDisplay(i)} className="cursor">
                    {a}
                  </div>
                </Col>
              ))}
            </>
          ) : null}

          <Col></Col>
          {home ? (
            <Col xs={4} md={1} className="text-center">
              <Link href={"/"}>Accueil</Link>
            </Col>
          ) : null}
          {shop ? (
            <Col xs={4} md={1} className="text-center">
              <Link href={"/shop"}>Boutique</Link>
            </Col>
          ) : null}

          {cart ? (
            <Col xs={4} md={1} className="text-center">
              <Link href={"/shop/cart"}>
                <i className="fad fa-shopping-cart fa-2x"></i>
              </Link>
            </Col>
          ) : null}
          {contact ? (
            <Col xs={4} md={1} className="text-center">
              <Link href={"/#s5_contact"}>Contact</Link>
            </Col>
          ) : null}
          <Col md={1} className="d-none d-md-flex me-4"></Col>
        </Row>
      </Row>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-uppercase me-4">Quadratik</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <Link href="/">
              <ListGroup.Item className="ft2">Accueil</ListGroup.Item>
            </Link>
            <Link href="/shop">
              <ListGroup.Item className="ft2">Boutique</ListGroup.Item>
            </Link>
            <Link href="/quadralab?childCat=6&vid=146&dpid=8">
              <ListGroup.Item className="ft2">Quadralab</ListGroup.Item>
            </Link>
            <Link href="/">
              <ListGroup.Item className="ft2">Les réalisations</ListGroup.Item>
            </Link>
            <Link href="/#s5_contact">
              <ListGroup.Item className="ft2">Contact</ListGroup.Item>
            </Link>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
