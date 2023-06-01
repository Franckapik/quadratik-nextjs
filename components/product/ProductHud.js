import { Button, Carousel, Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";
import { PerformanceWidget } from "../quadralab/PerformanceWidget";
import ProductOptions from "./ProductOptions";

export const ProductHud = ({ product, display }) => {
  //just on page render

  //need to re-render the page
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const cwidth = useProductStore((state) => state.cwidth);
  const sizes = useProductStore((state) => state.sizes);
  const area = (sizes.longueur * sizes.largeur) / 1000;
  const volume = ((area * sizes.profondeur) / 1000).toFixed(5);

  return (
    <Row className="text_dark w-100 justify-content-center ">
      {display != 3 ? (
        <Row className="d-inline product_modele_desc">
          <p>REF : {product.nomenclature.structurel}</p>
          <p className="modele_phrase">{product.description.category_desc.replace("$PRODUCT", product.nomenclature.simple)}</p>
        </Row>
      ) : null}
      <Row className="d-inline product_modele_desc_details justify-content-center">
        <Carousel activeIndex={display} controls={false} indicators={false}>
          <Carousel.Item>{product.description.parent_description}</Carousel.Item>

          <Carousel.Item>
            <Row>
              <Col>
                <PerformanceWidget icon="fad fa-bolt" value={`${fmin} Hz - ${fmax} Hz`} color="#f26565" performance={((fmax - fmin) * 100) / 10000} tooltip={"La plage de fréquence traitée"} /> {/* 10k audio frequency */}
                <PerformanceWidget icon="fad fa-sort-size-down" value={`${(cwidth * 10).toFixed(0)} mm`} color="#f1b672" performance={100 - (cwidth * 10 * 100) / 90} tooltip={"La taille des cellules. Plus elle est petite, plus les aigus sont traités"} />
                <PerformanceWidget icon="fad fa-box-open" value={`${area} m2 // ${volume} m3`} color="#7cb0eb" performance={(volume * 100) / 0.144} tooltip={"L'aire traitée par le diffuseur et le volume (boite) qu'il occupe"} /> {/* 120 * 60 * 20cm */}
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>3</Carousel.Item>
          {/*           <Carousel.Item><ProductOptions product={product} /></Carousel.Item>  */}
        </Carousel>
      </Row>

      <Row className="product_right_cart">
        <Col className="d-flex flex-column justify-content-center text-center align-items-center ft05">{product.prices.price + " €"}</Col>
        <Col className="d-flex  justify-content-center text-center align-items-center">
          <Button variant="primary" type="submit" id="product_submit" className="m-2">
            Ajouter au panier
          </Button>
          <Button variant="secondary" className="m-2">
            Modifier Quadralab
          </Button>
        </Col>
      </Row>
    </Row>
  );
};
