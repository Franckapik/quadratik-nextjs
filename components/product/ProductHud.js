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
    <Row className="">
      <Col md={4} className="d-flex flex-column justify-content-evenly ps-5">
        <Row>
          <p className="text-uppercase ft05">
            {nomenclature?.simple}  <p className=" ft1 mt-3 text_green bg_darker">{price + " €"}</p>
          </p>
         
      </Row>
        <Row className="align-items-center">
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">S</div>
          {fmin} Hz - {fmax} Hz
        </Row>
        <Row className="align-items-center">
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">C</div> {(cwidth*10).toFixed(0)} mm
        </Row>
        <Row className="align-items-center">
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">D</div> {sizes.longueur} x {sizes.largeur} x {sizes.profondeur} cm
        </Row>
        <Row></Row>
      </Col>
      <Col md={8} className="product_canvas_container">
        <ProductCanvas></ProductCanvas>
      </Col>
    </Row>
  );
};
