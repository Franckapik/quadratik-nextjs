import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Absorbeur from '../models3D/Absorbeur';

export const S1_Product = ({ vh, scroll }) => {

  const [index, setIndex] = useState(0);


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
if(scroll > vh * 1.5) {
  console.log(scroll);
  handleSelect(1)
  console.log("ici");
} else {
  handleSelect(0)

}
  })


  return (
    <Row id="s1_product" className="justify-content-start align-items-center m-0 ">
      <Col md={1}></Col>
      <Col md={5} className="s1_square text-end pt-3">


<Carousel activeIndex={index} onSelect={handleSelect} indicators={false} controls={false} interval={null}>
      <Carousel.Item>
        <img
          className="d-block w-100 image-hover"
          src="../difrender10wrot30.png"
          alt="First slide"
        />
        <img
          className="d-block w-100"
          src="../difrender10w.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 image-hover"
          src="../absorbeurrot30.png"
          alt="Second slide"
        />
        <img
          className="d-block w-100"
          src="../absorbeur.png"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>

  </Col>
      <Col md={5} className="">
        <Row>
          <Col md={3}></Col>
          <Col md={9} className="d-flex flex-column align-items-center justify-content-center">
            <div className="border_creme s1_product_name">
            <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} controls={false} interval={null}>
            <Carousel.Item>
            <h2 className="pt-4 p-3"><p><span>Le diffuseur</span></p><strong>Woodik-7</strong> </h2>
      </Carousel.Item>
      <Carousel.Item>
      <h2 className="pt-4 p-3"><p><span>L'Absorbeur</span></p><strong>Quadrablack</strong> </h2>

      </Carousel.Item>
    </Carousel>
            </div>
            <div className="border_creme s1_product_physic dark_bg d-flex justify-content-center align-itmes-center">
            <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} controls={false} interval={null}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./physic_dif.svg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./physic_abs.svg"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
            </div>
            <Row className="text-uppercase text-center justify-content-center mt-4">
              <p className="m-0 pb-2 button_subtitle">Commande en ligne </p>
              <Button variant="primary" className="button_home">
              <i className="fad fa-store"></i> Entrer dans l'atelier
              </Button>
              <p className="m-0 pt-2 pb-2 button_subtitle">
                <span className="s1_product_sub_blue">Fabrication</span>
                <span className=""> Artisanale </span>
                <span className="s1_product_sub_red"> Française</span>{" "}
              </p>
            </Row>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Col>
      {/*       <Col md={6}></Col>
      <Col md={5} className="d-flex flex-column p-4 m-auto ">
        <Row className="text-center s1_product_text_presentation">
          <h2>Solutions acoustiques</h2>
          <p>
            Le diffuseur Woodik améliore l’acoustique par sa structure irrégulière calculée sur une gamme de fréquences
          </p>
        </Row>

        <Row className="text-center align-items-center ">
          <Col style={{ transitionDuration: "1s", opacity: scroll > 1.5 * vh ? 0.2 : 1 }} className="">
            Diffusion
            <p>
              <img src="./physic_dif.svg"></img>
            </p>
          </Col>
          <Col style={{ transitionDuration: "1s", opacity: scroll < 1.5 * vh ? 0.2 : 1 }} className="">
            Absorption
            <p>
              <img src="./physic_abs.svg"></img>
            </p>
          </Col>
        </Row>
        <Row className="s1_product_list align-items-center text-center">
          <ListGroup>
            <ListGroup.Item>rééquilibre les ondes sonores</ListGroup.Item>
            <ListGroup.Item>supprime les effets indésirables</ListGroup.Item>
            <ListGroup.Item>le son entoure vos oreilles</ListGroup.Item>
            <ListGroup.Item>les productions sont aérées et précises</ListGroup.Item>
          </ListGroup>{" "}
        </Row>
        <Row className="text-uppercase text-center justify-content-center mt-4">
          <p className="m-0 pb-2 button_subtitle">Commande en ligne </p>
          <Col md={8}>
            {" "}
            <Button variant="primary" className="button_home">
              Entrer dans l'atelier
            </Button>
          </Col>
        </Row>
      </Col>
      <Col md={1}></Col> */}
    </Row>
  );
};
