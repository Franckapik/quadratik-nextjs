import React from "react";
import { Breadcrumb, Col, Row } from "react-bootstrap";

export const ShopNavBar = ({ categories }) => {
  return (
    <Row className="shop_header_row zup dark_bg ">
      {/*  <Col md={1} className=""></Col>
            <Col md={3} className="justify-content-start d-flex flex-column p-0 m-0 ">
              <Row className="ft05 h-100">
                <Col md={10} className="d-flex flex-column justify-content-center align-items-center ">
                  <img src="/logo/logo.svg" alt="Image du logo Quadratik dans la boutique" /> <div className="text-nowrap text-uppercase shop_header_quadratik_title ft2 pt-3">Quadratik</div>
                </Col>
                <Col md={2} className=""></Col>
              </Row>
            </Col> */}
      <Row className="d-md-flex justify-content-end text-uppercase m-0 p-0 ft2 h-100 align-items-center ">
        <Col md={8}>
          <Breadcrumb className="ft4 m-0 shop_breadcrumb">
            {categories
              .filter((cat) => cat.fk_parent == 0)
              .map((a, i) => (
                <Breadcrumb.Item href={'#' + a.id} /* active */>{a.label}</Breadcrumb.Item>
              ))}
          </Breadcrumb>
        </Col>
        <Col md={2}>Accueil</Col>
        <Col md={2}>Contact</Col>
      </Row>
    </Row>
  );
};
