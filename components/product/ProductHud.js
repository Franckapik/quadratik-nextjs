import { Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";
import ProductCanvas from "./ProductCanvas";

export const ProductHud = () => {

  //just on page render
  const price = useProductStore.getState().price
  const nomenclature = useProductStore.getState().nomenclature

  //need to re-render the page
  const fmin = useProductStore(state => state.fmin);
  const fmax = useProductStore(state => state.fmax);
  const cwidth = useProductStore(state => state.cwidth);
  const sizes = useProductStore(state => state.sizes);
  
  return (
    <Row className="product_modele_main h-100">
      <Col md={5} className="d-flex flex-column justify-content-evenly ps-5">
        <Row>
          <p className="ft05 mb-1">
            {nomenclature.simple} {price}{" "}
          </p>
          <span className="ft4">REF : {nomenclature.structurel}</span>
        </Row>
        <Row></Row>
        <Row className="align-items-center">
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">S</div>
          {fmin} Hz - {fmax} Hz
        </Row>
        <Row className="align-items-center">
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">E</div> {(cwidth*10).toFixed(0)} mm
        </Row>
        <Row className="align-items-center">
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">D</div> {sizes.longueur} x {sizes.largeur} x {sizes.epaisseur} mm
        </Row>
      </Col>
      <Col md={7} className="product_canvas_container">
        <ProductCanvas></ProductCanvas>
      </Col>
    </Row>
  );
};
