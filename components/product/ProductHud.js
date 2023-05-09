import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";
import ProductCanvas from "./ProductCanvas";

const PerformanceRow = ({ value, text, icon }) => (
  <Col className="d-flex flex-column d-md-flex flex-md-row align-items-center  m-1 m-md-4 ">
    <OverlayTrigger
      key={"top"}
      placement={"top"}
      overlay={
        <Tooltip id={`tooltip-freq`}>
          <span className="p-4">{text}</span>
        </Tooltip>
      }
    >
      <>
        <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-md-4 ">
          <i className={icon} />
        </div>
       <span className="d-none d-md-flex">{value}</span> 
       <span className="d-md-none ft8">{value}</span> 
      </>
    </OverlayTrigger>
  </Col>
);

export const ProductHud = () => {
  //just on page render
  const price = useProductStore.getState().price;
  const nomenclature = useProductStore.getState().nomenclature;

  //need to re-render the page
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const cwidth = useProductStore((state) => state.cwidth);
  const sizes = useProductStore((state) => state.sizes);
  const tag = useProductStore((state) => state.tag);

  return (
    <Row className="">
      <Col md={5} className="d-flex flex-column justify-content-evenly ps-2 ps-md-4">
        <Row className="text-center text-md-start">
          <p className=" text-uppercase ft05 m-md-3">{nomenclature?.simple} </p>
        </Row>
        <Row className="d-flex flex-md-column">
          {tag != 2 ? (
            <>
              <PerformanceRow value={`${fmin} Hz - ${fmax} Hz`} text="Spectre de fréquences traité" icon="fad fa-bolt ft2" />
              <PerformanceRow value={`${(cwidth * 10).toFixed(0)} mm`} text="Taille d'une cellule" icon="fad fa-sort-size-down ft2" />{" "}
            </>
          ) : null}
          <PerformanceRow value={`${sizes.longueur} x ${sizes.largeur} x ${sizes.profondeur} cm`} text="Dimension du modèle" icon="fad fa-box-open ft2" />
        </Row>{" "}
      </Col>
      <Col md={7} className="d-none d-md-flex product_canvas_container">
        <ProductCanvas></ProductCanvas>
      </Col>
    </Row>
  );
};
