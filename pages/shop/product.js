import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { queryTypes, useQueryStates, useQueryState } from "next-usequerystate";
import React, { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Line } from "react-chartjs-2";
import Select_Options from "../../components/product/SelectOptions";
import Layout from "../../layouts/Layout";
import dataCsv from "../../public/performances/CSV/D2N7P15W50.csv";
import Shop3D from "../../components/Shop3D";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

console.log(dataCsv);

const options = {
  //no points on line
  elements: {
    point: {
      borderWidth: 0,
      radius: 0,
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
};

const labels = dataCsv.map((a, i) => a["Frequency [Hz]"]);
const difCoef = dataCsv.map((a, i) => parseFloat(a["Diffusion Coefficient"].replace(/,/g, ".")));
const scatCoef = dataCsv.map((a, i) => parseFloat(a["Scattering Coefficient"].replace(/,/g, ".")));

const data = {
  labels: labels,
  datasets: [
    {
      label: "Diffusion",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: difCoef,
      tension: 0.2,
    },
    {
      label: "Scattering",
      backgroundColor: "blue",
      borderColor: "blue",
      data: scatCoef,
      tension: 0.2,
    },
  ],
};

const DiffusorOffset = ({ product, setProduct }) => (
  <Table style={{ textAlign: "center" }} className="table-borderless table-sm">
    <tbody>
      <tr>
        <td></td>
        <td onClick={() => setProduct({ VERT: product.VERT - 1 })}>
          <i className="fas fa-arrow-up p-0"></i>
        </td>
        <td></td>
      </tr>
      <tr>
        <td onClick={() => setProduct({ HOR: product.HOR + 1 })}>
          <i className="fas fa-arrow-left"></i>
        </td>
        <td>
          {product.VERT} / {product.HOR}
        </td>

        <td onClick={() => setProduct({ HOR: product.HOR - 1 })}>
          <i className="fas fa-arrow-right"></i>
        </td>
      </tr>
      <tr>
        <td></td>
        <td onClick={() => setProduct({ VERT: product.VERT + 1 })}>
          <i className="fas fa-arrow-down"></i>
        </td>
        <td></td>
      </tr>
    </tbody>
  </Table>
);

const Product = ({ p_selected }) => {
  const [display, setDisplay] = useState("model");
  /*   const [product, setProduct] = useState(initialProduct);
   */
  const [product, setProduct] = useQueryStates(
    {
      DEPTH: queryTypes.integer.withDefault(10),
      WIDTH: queryTypes.integer.withDefault(50),
      LENGTH: queryTypes.integer.withDefault(1),
      THICK: queryTypes.integer.withDefault(5),
      PRIME: queryTypes.integer.withDefault(7),
      MOTIF: queryTypes.string.withDefault("motif1"),
      INVERT: queryTypes.boolean.withDefault(false),
      VERT: queryTypes.integer.withDefault(-3),
      HOR: queryTypes.integer.withDefault(-3),
    },
    {
      history: "push",
    }
  );

  const [ratio, setRatio] = useQueryState("ratio", queryTypes.boolean.withDefault(false));

  const [amax, setAmax] = useState(4);
  const [cwidth, setCwidth] = useState(31);

  const fmin = Math.round((((344 / 2 / product.DEPTH / 10) * amax) / product.PRIME) * 1000);
  const fmax = Math.round(344 / 2 / (cwidth / 100));

  return (
    <>
      <Layout>
        <Row>
          <Col sm={4} className="attributes_col">
            <Select_Options setProduct={setProduct} product={product}></Select_Options>
            Prix
            <div className="d-grid gap-2 m-3 mt-5">
              <Button variant="outline-primary m-2" size="lg" type="submit">
                Ajouter au panier
              </Button>{" "}
              <Button variant="outline-secondary m-2" size="lg">
                Configurer
              </Button>{" "}
            </div>
          </Col>
          <Col sm={7} className="preview_col">
            <ul>
              {" "}
              <li onClick={() => setDisplay("model")}>Model</li>
              <li onClick={() => setDisplay("coefDif")}>Coef</li>
              <li onClick={() => setDisplay("plot")}>Plot</li>
            </ul>
            <Row className="preview_row">
              {display === "coefDif" ? <Line options={options} data={data} /> : null}
              {display === "plot" ? (
                <img
                  src={"/performances/Spatial/D2N7P5W50.png"}
                  style={{ height: "100%", width: "auto", margin: "auto" }}
                />
              ) : null}
              {display === "model" ? (
                <>
                  <Col sm={2}>
                    <ul>
                      <li onClick={() => setProduct({ MOTIF: "motif0" })}>Motif0</li>
                      <li onClick={() => setProduct({ MOTIF: "motif1" })}>Motif1</li>
                      <li onClick={() => setProduct({ MOTIF: "motif2" })}>Motif2</li>
                      <li onClick={() => setProduct({ INVERT: !product.INVERT })}>Invert</li>
                      <li
                        onClick={() => {
                          switch (product.PRIME) {
                            case 7:
                              setProduct({ HOR: -3, VERT: -3 });
                              break;
                            case 11:
                              setProduct({ HOR: 6, VERT: -5 });
                              break;
                            case 13:
                              setProduct({ HOR: -6, VERT: -6 });
                              break;

                            default:
                              break;
                          }
                        }}
                      >
                        Optimiser
                      </li>
                    </ul>
                    <DiffusorOffset product={product} setProduct={setProduct}></DiffusorOffset>
                  </Col>
                  <Col>
                    <div className="canvas_container">
                      <Shop3D
                        style={{ position: "absolute" }}
                        product={product}
                        ratio={ratio}
                        amax={amax}
                        setAmax={setAmax}
                        cwidth={cwidth}
                        setCwidth={setCwidth}
                      ></Shop3D>
                    </div>
                  </Col>
                </>
              ) : null}
            </Row>
          </Col>
        </Row>
      </Layout>
      <div className="shop_menu">
        {" "}
        <Navbar expand="lg">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Diffuseurs</Nav.Link>
                <Nav.Link href="#link">Absorbeurs</Nav.Link>
                <Nav.Link href="#link">Reflecteurs</Nav.Link>
                <Nav.Link href="#link">Accessoires</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Product;
