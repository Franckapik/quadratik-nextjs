import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useBearStore } from "../../hooks/store";

export const S1_Product = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const scroll = useBearStore((state) => state.scroll)
  const height = useBearStore((state) => state.height)


  useEffect(() => {
    if (scroll > height * 1.5) {
      handleSelect(1);
    } else {
      handleSelect(0);
    }
  });

  return (
    <Row id="s1_product" className="section justify-content-start align-items-center m-0 ">
      <Col md={1} className="d-none d-md-flex"></Col>
      <Col md={5} className="s1_square"> 
        <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} controls={false} interval={null}>
          <Carousel.Item>
            <img className="d-block w-100 s1_image_hover" src="../difrender10wrot30.png" alt="First slide" />
            <img className="d-block w-100" src="../difrender10w.png" alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 s1_image_hover" src="../absorbeurrot30.png" alt="Second slide" />
            <img className="d-block w-100" src="../absorbeur.png" alt="First slide" />
          </Carousel.Item>
        </Carousel>
      </Col>
      <Col md={6} className="s1_product_order">
        <Row className="justify-content-center ">
          <Col md={10} className="d-flex flex-column align-items-center justify-content-center s1_col_product">
            <Row className="d-flex border_creme s1_product_name text-center text-md-end">
              <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} controls={false} interval={null}>
                <Carousel.Item>
                  <div className="p-4">
                    <p>
                      <div className="ft3 text-uppercase">Le diffuseur</div>
                    </p>
                    <div className="ft1 text-uppercase mt-2 mt-md-4">Woodik-7</div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                <div className="p-4">
                    <p>
                      <div className="ft3 text-uppercase">L'absorbeur</div>
                    </p>
                    <div className="ft1 text-uppercase mt-2 mt-md-4">Quadrablack</div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </Row>
            <Row className="d-none border_creme s1_product_physic dark_bg d-md-flex justify-content-start align-items-center">
              <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} controls={false} interval={null}>
                <Carousel.Item>
                  <img className="d-block w-100" src="./physic_dif.svg" alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="./physic_abs.svg" alt="Second slide" />
                </Carousel.Item>
              </Carousel>
            </Row>
            <Row className="text-uppercase text-center justify-content-center">
              <p className="m-0 pb-2 ft5">Commande en ligne </p>
              <Button variant="primary" className="button_home">
                <i className="fad fa-store"></i> Entrer dans l'atelier
              </Button>
              <p className="m-0 pt-2 pb-2 ft4">
                <span className="s1_product_sub_blue">Fabrication</span>
                <span className=""> Artisanale </span>
                <span className="s1_product_sub_red"> Française</span>{" "}
              </p>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
