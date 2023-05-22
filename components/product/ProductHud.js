import { Button, Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";
import ProductCanvas from "./ProductCanvas";
import { PerformanceRow } from "./PerformanceRow";
import ProductOptions from "./ProductOptions";

export const ProductHud = ({attributes, defaultProduct,setLoading, fetching}) => {
  //just on page render
  const price = useProductStore((state) => state.price);
  const nomenclature = useProductStore.getState().nomenclature;

  //need to re-render the page
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const cwidth = useProductStore((state) => state.cwidth);
  const sizes = useProductStore((state) => state.sizes);
  const tag = useProductStore((state) => state.tag);

  return (
    <Row className="text_dark">
      <Row className="text-center text-md-start">
        <p className=" text-uppercase ft05">{nomenclature?.simple} </p>
        <p>REF : {nomenclature?.structurel}</p>
      </Row>
      <Row className="d-flex flex-md-column">
        {tag != 2 ? (
          <>
            <PerformanceRow value={`${fmin} Hz - ${fmax} Hz`} text="Spectre de fréquences traité" icon="fad fa-bolt ft2" />
            <PerformanceRow value={`${(cwidth * 10).toFixed(0)} mm`} text="Taille d'une cellule" icon="fad fa-sort-size-down ft2" />{" "}
          </>
        ) : null}
        <PerformanceRow value={`${sizes.longueur} x ${sizes.largeur} x ${sizes.profondeur} cm`} text="Dimension du modèle" icon="fad fa-box-open ft2" />
      </Row>
      <Row>              {!fetching ? <ProductOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}
</Row>
      <Row className="product_right_cart">
        <Col className="d-flex flex-column justify-content-center text-center align-items-center">
        {price + " €"}
        </Col>
        <Col className="justify-content-center text-center">
          <Button variant="primary" type="submit" id="product_submit">
            Ajouter au panier
          </Button>
        </Col>
      </Row>
    </Row>
  );
};
