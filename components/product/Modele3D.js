import { Col, Row } from "react-bootstrap";
import { DiffusorOffset } from "../DiffusorOffset";
import Shop3D from "../Shop3D";

export const Modele3D = ({p3d, setProduct, ratio,
    amax,
    setAmax,
    cwidth,
    setCwidth}) => {
    return (
        <>
                  <Col md={2}>
                    <Row>
                      <Col onClick={() => setProduct((prevProduct) => ({ ...prevProduct, C: 0 }))}>Motif0</Col>
                      <Col onClick={() => setProduct((prevProduct) => ({ ...prevProduct, C: 1 }))}>Motif1</Col>
                      <Col onClick={() => setProduct((prevProduct) => ({ ...prevProduct, C: 2 }))}>Motif2</Col>
                      <Col onClick={() => setProduct((prevProduct) => ({ ...prevProduct, I: !prevProduct.I }))}>
                        Invert
                      </Col>
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
                    {p3d && <DiffusorOffset p3d={p3d} setProduct={setProduct}></DiffusorOffset>}
                  </Col>
                  <Col>
                    <div className="product_canvas_container">
                      {p3d && Object.keys(p3d).length ? (
                        <Shop3D
                          style={{ position: "absolute" }}
                          p3d={p3d}
                          ratio={ratio}
                          amax={amax}
                          setAmax={setAmax}
                          cwidth={cwidth}
                          setCwidth={setCwidth}
                        ></Shop3D>
                      ) : (
                        "Chargemement modèle"
                      )}
                    </div>
                  </Col>
                </>
    )
}