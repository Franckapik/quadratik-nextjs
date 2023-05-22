import { useState } from "react";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";
import { PerformanceWidget } from "../quadralab/PerformanceWidget";
import ProductOptions from "./ProductOptions";

export const ProductHud = ({ display, attributes, defaultProduct, setLoading, fetching }) => {
  //just on page render
  const price = useProductStore((state) => state.price);
  const nomenclature = useProductStore.getState().nomenclature;

  //need to re-render the page
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const cwidth = useProductStore((state) => state.cwidth);
  const sizes = useProductStore((state) => state.sizes);
  const area = (sizes.longueur * sizes.largeur) / 1000;
  const volume = ((area * sizes.profondeur) / 1000).toFixed(5);

  const [custom, setCustom] = useState(0);

  return (
    <Row className="text_dark align-items-end w-100 ">
      
      <Row className="d-inline product_modele_desc">
      <p>REF : {nomenclature?.structurel}</p>

        <p className="modele_phrase">Le diffuseur acoustique <span className="text-uppercase">{nomenclature?.simple} </span> renvoie les ondes sonores dans toutes les directions.</p>
      </Row>
      <Row className="d-inline product_modele_desc_details">
        <Carousel activeIndex={display}>
          <Carousel.Item>
          Les diffuseurs acoustiques sont des pièces en bois de forme irrégulière. Les unités de différentes profondeurs reflètent les fréquences sonores dans de nombreuses directions dans la pièce.
          </Carousel.Item>

          <Carousel.Item>
            <Row>
              <Col>
                <PerformanceWidget icon="fad fa-bolt" value={`${fmin} Hz - ${fmax} Hz`} color="#f26565" performance={((fmax - fmin) * 100) / 10000} tooltip={"La plage de fréquence traitée"} /> {/* 10k audio frequency */}
                <PerformanceWidget icon="fad fa-sort-size-down" value={`${(cwidth * 10).toFixed(0)} mm`} color="#f1b672" performance={100 - (cwidth * 10 * 100) / 90} tooltip={"La taille des cellules. Plus elle est petite, plus les aigus sont traités"} />
                <PerformanceWidget icon="fad fa-box-open" value={`${area} m2 // ${volume} m3`} color="#7cb0eb" performance={(volume * 100) / 0.144} tooltip={"L'aire traitée par le diffuseur et le volume (boite) qu'il occupe"} /> {/* 120 * 60 * 20cm */}
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            {!fetching ? <ProductOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}{" "}
          </Carousel.Item>
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
