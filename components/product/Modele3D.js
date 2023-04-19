import { Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";
import Shop3D from "../Shop3D";

export const Modele3D = () => {
  const price = useProductStore((state) => state.price);
  const nomenclature = useProductStore((state) => state.nomenclature);
  /*   const {fmin, fmax, cwidth} = useProductStore((state) => ({fmin : state.fmin, fmax : state.fmax, cwidth : state.cwidth})) */
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
          {"fmin"} Hz - {"fmax"} Hz
        </Row>
        <Row className="align-items-center">
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">E</div> 40 mm
        </Row>
        <Row className="align-items-center">
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">D</div> 500x 100 x 5 mm
        </Row>
      </Col>
      <Col md={7} className="product_canvas_container">
        <Shop3D></Shop3D>
      </Col>
    </Row>
  );
};
