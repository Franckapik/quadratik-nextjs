import { Button, Carousel, Col, Row } from "react-bootstrap";
import { PerformanceWidget } from "../PerformanceWidget";
import ProductOptions from "../ProductOptions";
import { useRef } from "react";
import { PerformancesCard } from "../PerformancesCard";

export const ProductDetailsRight = ({ product, display }) => {
  return (
    <Col className="text_dark product_modele_desc d-flex flex-column justify-content-between ">
      <Row> {product.nomenclature.simple}</Row>
      <Row className="d-inline justify-content-center">
        <Carousel activeIndex={display} controls={false} indicators={false}>
          <Carousel.Item>
            <Row className="d-inline ">
              <p>REF : {product.nomenclature.structurel}</p>
              <p className="modele_phrase">{product.description.category_desc.replace("$PRODUCT", product.nomenclature.simple)}</p>
            </Row>
            {product.description.parent_description}
          </Carousel.Item>
          <Carousel.Item>
            <PerformancesCard product={product} />
          </Carousel.Item>
          <Carousel.Item>Spacialisation details</Carousel.Item>
        </Carousel>
      </Row>
      <div className="product_right_cart">
        <Row className="d-flex flex-column justify-content-center text-center align-items-center ft05">{product.prices.price + " €"}</Row>
        <Row className="d-flex justify-content-center text-center align-items-center">
          <Button variant="primary" type="submit" id="product_submit" className="m-2">
            Ajouter au panier
          </Button>
        </Row>
      </div>
    </Col>
  );
};
