import { Button, Carousel, Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";
import ProductCanvas from "./ProductCanvas";
import { PerformanceRow } from "./PerformanceRow";
import ProductOptions from "./ProductOptions";
import { PerformanceWidget } from "../quadralab/PerformanceWidget";
import { useState } from "react";

export const ProductHud = ({ attributes, defaultProduct, setLoading, fetching }) => {
  //just on page render
  const price = useProductStore((state) => state.price);
  const nomenclature = useProductStore.getState().nomenclature;

  //need to re-render the page
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const cwidth = useProductStore((state) => state.cwidth);
  const sizes = useProductStore((state) => state.sizes);
  const tag = useProductStore((state) => state.tag);
  const area = (sizes.longueur * sizes.largeur) / 1000;
  const volume = ((area * sizes.profondeur) / 1000).toFixed(5);

  const [custom, setCustom] = useState(0);

  return (
    <Row className="text_dark align-items-end w-100">
      <Row>
        {" "}
        <Carousel activeIndex={custom}>
          <Carousel.Item>
            <Row className="text-center text-md-start">
              <p className=" text-uppercase ft05">{nomenclature?.simple} </p>
              <p>REF : {nomenclature?.structurel}</p>
            </Row>
            <Row>
              <Col>
                <PerformanceWidget icon="fad fa-bolt" value={`${fmin} Hz - ${fmax} Hz`} color="#f26565" performance={((fmax - fmin) * 100) / 10000} tooltip={"La plage de fréquence traitée"} /> {/* 10k audio frequency */}
                <PerformanceWidget icon="fad fa-sort-size-down" value={`${(cwidth * 10).toFixed(0)} mm`} color="#f1b672" performance={100 - (cwidth * 10 * 100) / 90} tooltip={"La taille des cellules. Plus elle est petite, plus les aigus sont traités"} />
                <PerformanceWidget icon="fad fa-box-open" value={`${area} m2 // ${volume} m3`} color="#7cb0eb" performance={(volume * 100) / 0.144} tooltip={"L'aire traitée par le diffuseur et le volume (boite) qu'il occupe"} /> {/* 120 * 60 * 20cm */}
              </Col>
            </Row>
            <Row>
              {" "}
              <span onClick={() => setCustom(1)}>Personnaliser</span>
            </Row>
          </Carousel.Item>
          <Carousel.Item>{!fetching ? <ProductOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}  <Row onClick={() => setCustom(0)}>  <span >Default</span></Row></Carousel.Item>
        </Carousel>
      </Row>

      <Row className="product_right_cart">
        <Col className="d-flex flex-column justify-content-center text-center align-items-center ft05">{price + " €"}</Col>
        <Col className="d-flex flex-column justify-content-center text-center align-items-center">
          <Button variant="primary" type="submit" id="product_submit">
            Ajouter au panier
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

{
  /* <PerformanceRow value={`${fmin} Hz - ${fmax} Hz`} text="Spectre de fréquences traité" icon="fad fa-bolt ft2" />
<PerformanceRow value={`${(cwidth * 10).toFixed(0)} mm`} text="Taille d'une cellule" icon="fad fa-sort-size-down ft2" />{" "}
</>
) : null}
<PerformanceRow value={`${sizes.longueur} x ${sizes.largeur} x ${sizes.profondeur} cm`} text="Dimension du modèle" icon="fad fa-box-open ft2" /> */
}
