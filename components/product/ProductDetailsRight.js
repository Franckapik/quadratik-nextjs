import { Button, Carousel, Col, Row } from "react-bootstrap";
import { PerformanceWidget } from "../PerformanceWidget";
import ProductOptions from "../ProductOptions";
import { useRef } from "react";

export const ProductDetailsRight = ({ product, display }) => {
  return (
    <Col className="text_dark product_modele_desc d-flex flex-column justify-content-between ">
      <Row className="d-inline ">
        <p>REF : {product.nomenclature.structurel}</p>
        <p className="modele_phrase">{product.description.category_desc.replace("$PRODUCT", product.nomenclature.simple)}</p>
      </Row>
      <Row className="d-inline justify-content-center">
        <Carousel activeIndex={display} controls={false} indicators={false}>
          <Carousel.Item>{product.description.parent_description}</Carousel.Item>
          <Carousel.Item>
            <Row >
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <PerformanceWidget icon="fad fa-bolt" value={`${product.dimensions.fmin} Hz - ${product.dimensions.fmax} Hz`} color="#f26565" performance={((product.dimensions.fmax - product.dimensions.fmin) * 100) / 10000} tooltip={"La plage de fréquence traitée"} />
                <PerformanceWidget icon="fad fa-sort-size-down" value={`${(product.dimensions.c * 10).toFixed(0)} mm`} color="#f1b672" performance={100 - (product.dimensions.c * 10 * 100) / 90} tooltip={"La taille des cellules. Plus elle est petite, plus les aigus sont traités"} />
                <PerformanceWidget
                  icon="fad fa-box-open"
                  value={`${product.dimensions.area / 10000} m2 // ${product.dimensions.volume / 1000000} m3`}
                  color="#7cb0eb"
                  performance={((product.dimensions.volume / 1000000) * 100) / 0.144}
                  tooltip={"L'aire traitée par le diffuseur et le volume (boite) qu'il occupe"}
                />
              </Col>
            </Row>
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
