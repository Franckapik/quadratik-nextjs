import { Button, Carousel, Col, Row } from "react-bootstrap";
import { PerformanceWidget } from "../shared/PerformanceWidget";
import ProductOptions from "../shared/ProductOptions";
import { useRef } from "react";
import { PerformancesCard } from "../shared/PerformancesCard";

export const ProductDetailsRight = ({ product, display }) => {
  return (
    <>
      <Col className="text_dark product_modele_desc d-flex flex-column ">
        <Row className="ft05"><span className="mb-4 p-0">{product.nomenclature.simple}</span> </Row>
        <Row className="d-inline">
          <Carousel activeIndex={display} controls={false} indicators={false} className="p-0">
            <Carousel.Item>
              <Row className="d-inline ">
                <span className="ps-0">REF : {product.nomenclature.structurel}</span>
                <p className="product_desc_modele mt-4 mb-5 p-0">{product.description.category_desc.replace("$PRODUCT", product.nomenclature.simple)}</p>
              </Row>
              <p className="product_desc_parent mt-5 mb-4 p-0"> {product.description.parent_description}</p>
            </Carousel.Item>
            <Carousel.Item>
              <PerformancesCard product={product} />
            </Carousel.Item>
            <Carousel.Item>La géométrie du diffuseur ain que la distance entre le diffuseur et le point d'écoute influenceront la façon dont les sons sont répartis et rayonnés dans l'environnement.</Carousel.Item>
          </Carousel>
        </Row>
      </Col>
      <Row className="text_dark product_right_cart">
        <Col className="d-flex flex-column justify-content-center text-center align-items-center ft05">{product.prices.price + " €"}</Col>
        <Col className="d-flex justify-content-center text-center align-items-center">
          <Button variant="primary" type="submit" id="product_submit">
           - Ajouter au panier -
          </Button>
        </Col>
      </Row>
    </>
  );
};
