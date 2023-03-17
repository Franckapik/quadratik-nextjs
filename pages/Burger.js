import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Col } from "react-bootstrap";

export const Burger = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Col md={1} className="d-flex burger justify-content-center pt-5">
      <Hamburger toggled={isOpen} toggle={setOpen} color="#FFFFFF" />
    </Col>
  );
};
