import { animated, useInView } from "@react-spring/web";
import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Col } from "react-bootstrap";

export const Burger = () => {
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
    <animated.div ref={ref} style={springs}>
      <Col md={1} className="d-flex burger justify-content-center">
        <Hamburger toggled={isOpen} toggle={setOpen} color="#FFFFFF" />
      </Col>
    </animated.div>
  );
};
