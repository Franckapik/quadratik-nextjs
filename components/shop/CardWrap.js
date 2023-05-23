import React from "react";
import { Col } from "react-bootstrap";

export const CardWrap = ({ children, categorie }) => {
  return (
    <Col  className={`shop_card d-flex flex-column justify-content-center align-items-center text_dark ${categorie ? "bg_creme" : "bg_backdrop"}`} >
      {children}
    </Col>
  );
};
