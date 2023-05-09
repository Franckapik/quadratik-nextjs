import { animated, useInView } from "@react-spring/web";
import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Col, Offcanvas } from "react-bootstrap";

export const Burger = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const [isOpen, setOpen] = useState(false);
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    }),
    {}
  );

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</Offcanvas.Body>
      </Offcanvas>
      <animated.div ref={ref} style={springs} className="burger">
        <Hamburger onClick={toggleShow} toggled={isOpen} toggle={setOpen} color="#FFFFFF" />
      </animated.div>
    </>
  );
};
