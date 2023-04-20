import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
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
 {/*      <ListGroup className="ml-2">
              <ListGroupItem className="border-0 bg-transparent">
                <i className="fas fa-ruler-combined mr-2"></i> {width} x{" "}
                {length} x {depth} cm
              </ListGroupItem>
              <ListGroupItem className="border-0 bg-transparent">
                <i className="fas fa-grip-lines-vertical mr-2"></i> {thickness}{" "}
                cm
              </ListGroupItem>
              <ListGroupItem className="border-0 bg-transparent">
                <i className="fas fa-square-full mr-2"></i> {cwidth.toFixed(2)}{" "}
                cm
              </ListGroupItem>
              <ListGroupItem
                className="border-0 bg-transparent"
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-file-export mr-2 "></i> 2D report
              </ListGroupItem>
            </ListGroup> */}
      <Col md={12} className="d-flex flex-column justify-content-evenly ps-5">
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
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">C</div> {(cwidth*10).toFixed(0)} mm
        </Row>
        <Row className="align-items-center">
          <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">D</div> {sizes.longueur} x {sizes.largeur} x {sizes.profondeur} cm
        </Row>
      </Col>
    </Row>
  );
};
