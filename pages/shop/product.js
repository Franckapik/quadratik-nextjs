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
import React, { useState, useEffect } from "react";
import { Button, Col, Row, Table, Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Line } from "react-chartjs-2";
import Select_Options from "../../components/product/SelectOptions";
import Layout from "../../layouts/Layout";
import dataCsv from "../../public/performances/CSV/D2N7P15W50.csv";
import Shop3D from "../../components/Shop3D";
import axios from "axios";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


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
        <td onClick={() => setProduct({ V: product.V - 1 })}>
          <i className="fas fa-arrow-up p-0"></i>
        </td>
        <td></td>
      </tr>
      <tr>
        <td onClick={() => setProduct({ H: product.H + 1 })}>
          <i className="fas fa-arrow-left"></i>
        </td>
        <td>
          {product.V} / {product.H}
        </td>

        <td onClick={() => setProduct({ H: product.H - 1 })}>
          <i className="fas fa-arrow-right"></i>
        </td>
      </tr>
      <tr>
        <td></td>
        <td onClick={() => setProduct({ V: product.V + 1 })}>
          <i className="fas fa-arrow-down"></i>
        </td>
        <td></td>
      </tr>
    </tbody>
  </Table>
);

const Product = ({ p_selected }) => {
  const [display, setDisplay] = useState("model");
  const [nomenclature, setNomenclature] = useState("nomenclature");
  const [parentID, setParentID] = useState(false);
  /*   const [product, setProduct] = useState(initialProduct);
   */

  const [properties, setProperties] = useState([]);
  const [parentProperties, setParentProperties] = useState([]);
  const [price, setPrice] = useState(false);

  const [product, setProduct] = useQueryStates(
    {
      PRODUCTID: queryTypes.integer.withDefault(8),
      P: queryTypes.integer.withDefault(10),
      W: queryTypes.integer.withDefault(50),
      L: queryTypes.integer.withDefault(1),
      E: queryTypes.integer.withDefault(5),
      N: queryTypes.integer.withDefault(7),
      C: queryTypes.string.withDefault("motif1"),
      I: queryTypes.boolean.withDefault(false),
      V: queryTypes.integer.withDefault(-3),
      H: queryTypes.integer.withDefault(-3),
      D: queryTypes.string.withDefault("D2"),
      M: queryTypes.string.withDefault("MP"),
    },
    {
      history: "push",
    }
  );

  useEffect(() => {
    setNomenclature({
      structurel: product.D + "N" + product.N + "W" + product.W + "L" + product.L + "P" + product.P + "E" + product.E + product.M,
      complet: product.D + "N" + product.N + "W" + product.W + "L" + product.L + "P" + product.P + "E" + product.E + product.M + "C" + product.C + "I" + product.I + "H" + product.H + "V" + product.V,
      simple : properties.ref + "-" + product.N + product.P + (product.L == "2" ? "L" : "")
    })
  }, [product, properties, setNomenclature])

  const getProduct = axios.create({
    baseURL: "https://shop.quadratik.fr/api/index.php/products",
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "4BWD37pVYZ9quAL6m9zrzB2U96al4vdE",
    },
  });

  useEffect(() => {
    getProduct.get("/" + product.PRODUCTID + "?includeparentid=true").then((response) => {
      setProperties(response.data);
      setParentID(properties.fk_product_parent)
    });
  }, [product.PRODUCTID, setProperties]);

 
  useEffect(() => {
    if (parentID) {
      console.log("ici"+ response.data)

      getProduct.get("/" + parentID).then((response) => {
        console.log("ici"+ response.data)
        setParentProperties(response.data)
      });
    }

  }, [parentID, setParentProperties]);

  const [ratio, setRatio] = useQueryState("ratio", queryTypes.boolean.withDefault(false));

  const [amax, setAmax] = useState(4);
  const [cwidth, setCwidth] = useState(31);

  const fmin = Math.round((((344 / 2 / product.P / 10) * amax) / product.N) * 1000);
  const fmax = Math.round(344 / 2 / (cwidth / 100));

  return (
    <>
      <Layout>
        <Row>
          <Col sm={4} className="attributes_col">
            {price}
            <Select_Options setProduct={setProduct} product={product} setPrice={setPrice} price={price}></Select_Options>
            Prix {Math.round(price) + " €"}
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
                      <li onClick={() => setProduct({ C: "motif0" })}>Motif0</li>
                      <li onClick={() => setProduct({ C: "motif1" })}>Motif1</li>
                      <li onClick={() => setProduct({ C: "motif2" })}>Motif2</li>
                      <li onClick={() => setProduct({ I: !product.I })}>Invert</li>
                      <li
                        onClick={() => {
                          switch (product.N) {
                            case 7:
                              setProduct({ H: -3, V: -3 });
                              break;
                            case 11:
                              setProduct({ H: 6, V: -5 });
                              break;
                            case 13:
                              setProduct({ H: -6, V: -6 });
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
            <Row>
              <li>{fmin} Hz -{fmax} Hz</li>
              <li>Taille de cellule : {Math.round(cwidth * 10)} mm</li>
              <li>{nomenclature.structurel}</li>
              <li>{nomenclature.simple}</li>
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
