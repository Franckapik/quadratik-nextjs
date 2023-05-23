import React from "react";
import { Col } from "react-bootstrap";

export const CardWrap = ({ children }) => {
  return (
    <Col  className="shop_card d-flex flex-column justify-content-center align-items-center border_creme_light text_dark">
      {children}
    </Col>
  );
};
