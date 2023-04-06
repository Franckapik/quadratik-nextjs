import { Col, Row } from "react-bootstrap";
import { DiffusorOffset } from "../DiffusorOffset";
import Shop3D from "../Shop3D";

export const Modele3D = ({ p3d, setProduct, ratio, amax, setAmax, cwidth, setCwidth }) => {
  return (
    <Row className="product_modele_main h-100">
      <Col md={5} className="d-flex flex-column justify-content-evenly ps-5">
<Row><p className="ft05 mb-1">Woodik - 710</p><span className="ft4">REF : D1N7W50L1P10E5MM</span></Row>
<Row></Row>
<Row className="align-items-center"><div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">S</div>983 Hz - 4300 Hz</Row>
<Row className="align-items-center"><div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">E</div> 40 mm</Row>
<Row className="align-items-center"><div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">D</div> 500x 100 x 5 mm</Row>



{/*         <Row>
          <Col onClick={() => setProduct((prevProduct) => ({ ...prevProduct, C: 0 }))}>Motif0</Col>
          <Col onClick={() => setProduct((prevProduct) => ({ ...prevProduct, C: 1 }))}>Motif1</Col>
          <Col onClick={() => setProduct((prevProduct) => ({ ...prevProduct, C: 2 }))}>Motif2</Col>
          <Col onClick={() => setProduct((prevProduct) => ({ ...prevProduct, I: !prevProduct.I }))}>Invert</Col>
          <Col
            onClick={() => {
              console.log(p3d.N);
              switch (p3d.N) {
                case "7":
                  setProduct((prevProduct) => ({ ...prevProduct, H: -3, V: -3 }));
                  break;
                case "11":
                  setProduct((prevProduct) => ({ ...prevProduct, H: 6, V: -5 }));
                  break;
                case "13":
                  setProduct((prevProduct) => ({ ...prevProduct, H: -6, V: -6 }));
                  break;

                default:
                  break;
              }
            }}
          >
            Optimiser
          </Col>
        </Row>
        {p3d && <DiffusorOffset p3d={p3d} setProduct={setProduct}></DiffusorOffset>} */}
      </Col>
      <Col md={7} className="product_canvas_container">
       {p3d && Object.keys(p3d).length ? <Shop3D p3d={p3d} ratio={ratio} amax={amax} setAmax={setAmax} cwidth={cwidth} setCwidth={setCwidth}></Shop3D> : "Chargemement modèle"}
      </Col>
    </Row>
  );
};
