import { animated, easings, Globals, useSpring } from "@react-spring/web";
import { AdaptiveDpr, Stats } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MathUtils } from "three";
import { LoadCamera } from "../threejs/loadCamera";
import { LoadLight } from "../threejs/loadLight";
import { LoadMesh } from "../threejs/loadMesh";

Globals.assign({ frameLoop: "always" });

export const S2_Customers = ({ scroll, vh, mobile }) => {


  return (
    <Row id="s2_customers " className="section p-0 m-0 justify-content-md-start justify-content-md-start">
      <Col md={1} className="text-end p-0 d-none d-md-flex ">

      </Col>
      

      <Col md={10} className="mt-2">
        <div className="d-flex flex-column w-100 h-100 justify-content-evenly s2_customers_photo dark_bg" >
        <Row className="align-items-stretch justify-content-center">
          <Col md={3} className="text-center text-md-start">
            <img src="/customers/customer1.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className=" d-flex flex-column justify-content-evenly align-items-center mt-5">
            <Row className="s2_sentence_pro text-center">
              <h2 className="">Professionnel</h2>
              <span className="s2_sub2">quelles que soient les dimensions de votre espace</span>
            </Row>
            <Row>
              <Button variant="primary" className="s2_studio_button">
                <i className="fad fa-projector"></i>Découvrir les réalisations
              </Button>
            </Row>
          </Col>
          <Col  md={3} className="text-center text-md-end d-none d-md-flex">
            <img src="/customers/customer2.png" alt="Image du studio Disco casino" />
          </Col>
        </Row>
        <Row className="d-md-flex align-items-stretch justify-content-center ">
          <Col className="w-12 text-start ">
            <img src="/customers/customer3.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="w-25  ">
            <img src="/customers/customer4.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="w-25  ">
            <img src="/customers/customer5.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="w-25  ">
            <img src="/customers/customer6.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="w-12 text-end ">
            <img src="/customers/customer7.png" alt="Image du studio Disco casino" />
          </Col>
        </Row>      </div >
      </Col>
    </Row>
  );
};
