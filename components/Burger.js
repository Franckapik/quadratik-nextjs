import { useSpring, animated } from "@react-spring/web";
import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Col } from "react-bootstrap";

export const Burger = () => {
  const [isOpen, setOpen] = useState(false);
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay : 1000, 
      config :  {
        duration : 2000
      }
    }),
    []
  )
  return (
    <animated.div style={props}>
    <Col md={1} className="d-flex burger justify-content-center pt-5">
      <Hamburger toggled={isOpen} toggle={setOpen} color="#FFFFFF" />
    </Col>
  </animated.div>


  );
};
