import { queryTypes, useQueryState, useQueryStates } from "next-usequerystate";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DiffusorOffset } from "../../components/DiffusorOffset";
import { attributesAllFetch, attributesFetchById, productFetchById } from "../../components/dolibarrApi/fetch";
import { PerformanceCharts } from "../../components/product/PerformanceCharts";
import Select_Options from "../../components/product/SelectOptions";
import Shop3D from "../../components/Shop3D";
import { useNomenclature } from "../../hooks/useNomenclature";
import { usePrice } from "../../hooks/usePrice";
import Layout from "../../layouts/Layout";

const Product = () => {
  const [display, setDisplay] = useState("model");
  const [error, setError] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState(false);
  const [loading, setLoading] = useState(true);

  const [valuesSelected, setValuesSelected] = useQueryStates(
    {
      PID: queryTypes.string.withDefault(8),
      TAG : queryTypes.string.withDefault("Diffuseur"),
      P: queryTypes.string.withDefault(11),
      W: queryTypes.string.withDefault(25),
      L: queryTypes.string.withDefault(28),
      E: queryTypes.string.withDefault(22),
      N: queryTypes.integer.withDefault(14),
      C: queryTypes.integer.withDefault(0),
      I: queryTypes.boolean.withDefault(false),
      V: queryTypes.integer.withDefault(-3),
      H: queryTypes.integer.withDefault(-3),
      D: queryTypes.string.withDefault(36),
      M: queryTypes.string.withDefault(38),
    },
    {
      history: "push",
    }
  );
  const [productParent, setProductParent] = useState(false);

  const [product, setProduct] = useState(false);
  const [p3d, setProduct3D] = useState(false);

  const notInForm = ["H", "V", "I", "C", "PID", "TAG"];

  const [basePrice, totalPrice] = usePrice(product, productParent);
  const nomenclature = useNomenclature(p3d, productParent);
  const [ratio, setRatio] = useState(false);

  const [amax, setAmax] = useState(4);
  const [cwidth, setCwidth] = useState(4);

  const fmin = Math.round((((344 / 2 / p3d.P / 10) * amax) / p3d.N) * 1000);
  const fmax = Math.round(344 / 2 / (cwidth / 100));

  const makeProductSelected = (newValues) => {
    const product = Object.entries(newValues).reduce((acc, [key, val] = item) => {
      const v = values.filter((a) => a.id == val);
       if (notInForm.includes(key)) {
        return { ...acc, [key]: val };
      } else {
        const attribute_value =  v[0].value.split(",");
        return { ...acc, [key]: {
          ...v[0], 
          ["value3D"] : attribute_value[0], 
          ["operation"] : attribute_value[3],
          ["attribute_price"] : attribute_value[2]
        } };
      } 
    }, {});
    
    product.PID = newValues.PID;
    return product;
  };

  //get all attributes
  useEffect(() => {
    attributesAllFetch()
      .get()
      .then((response) => {
        setAttributes(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

  //gets all values from attributes
  useEffect(() => {
    Promise.all(
      attributes.map((a) => {
        if (!notInForm.includes(a.ref)) {
          return attributesFetchById(a.id)
            .get("")
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error);
              setError(error);
            });
        }
      })
    )
      .then((valuesData) => {
        const filteredValues = valuesData.filter((item) => item).flat(); //no undefined and same level
        if (filteredValues.length > 0) {
          setValues(filteredValues);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, [attributes]);

  //maker a product from initialValues or new valuesSelected
  useEffect(() => {
    if (valuesSelected && values) {
      const product = makeProductSelected(valuesSelected);
      setProduct(product);
    }
  }, [valuesSelected, values]);

  //make a 3D product for nomenclature and 3D model
  useEffect(() => {
    if (product) {
      const p3d = Object.entries(product).reduce((acc, [key, val] = entry) => {
        if (typeof val === "object") {
          return { ...acc, [key]: val.value3D };
        } else {
          return { ...acc, [key]: val };
        }
        return acc
      }, {});
    setProduct3D(p3d);
    }
  }, [product]);

  //looking for the  parent of the product for prices and nomenclature
  useEffect(() => {
    productFetchById(valuesSelected.PID)
      .get()
      .then((response) => {
        setProductParent(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [valuesSelected]);

  return (
    <>
      <div className="shop_menu">
        {" "}
        <Navbar expand="lg">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="?TAG=Diffuseurs">Diffuseurs</Nav.Link>
                <Nav.Link href="#link">Absorbeurs</Nav.Link>
                <Nav.Link href="#link">Reflecteurs</Nav.Link>
                <Nav.Link href="#link">Accessoires</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Layout>
        <Row>
          {!error ? (
            <>
              <Col sm={4} className="attributes_col">
                {!loading ? (
                  <Select_Options
                    setValuesSelected={setValuesSelected}
                    notInForm={notInForm}
                    attributes={attributes}
                    values={values}
                    product={product}
                    prices={[basePrice, totalPrice]}
                    valuesSelected={valuesSelected}
                    nomenclature={nomenclature}
                  ></Select_Options>
                ) : (
                  "Chargement des options du produit"
                )}
                {totalPrice && "Prix: " + totalPrice + " €"}
              </Col>
              <Col sm={7} className="preview_col">
                <ul>
                  {" "}
                  <li onClick={() => setDisplay("model")}>Model</li>
                  <li onClick={() => setDisplay("coefDif")}>Coef</li>
                  <li onClick={() => setDisplay("plot")}>Plot</li>
                </ul>
                <Row className="preview_row">
                  {display === "coefDif" ? <PerformanceCharts /> : null}
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
                          <li onClick={() => setProduct((prevProduct) => ( {...prevProduct, C: 0} ))}>Motif0</li>
                          <li onClick={() => setProduct((prevProduct) => ( {...prevProduct, C: 1} ))}>Motif1</li>
                          <li onClick={() => setProduct((prevProduct) => ( {...prevProduct, C: 2} ))}>Motif2</li>
                          <li onClick={() => setProduct((prevProduct) => ( {...prevProduct, I: !prevProduct.I } ))}>Invert</li>
                          <li
                            onClick={() => {
                              console.log(p3d.N)
                              switch (p3d.N) {
                                case "7":
                                  setProduct((prevProduct) => ( {...prevProduct, H: -3, V : -3 } ))
                                  break;
                                case "11":
                                  setProduct((prevProduct) => ( {...prevProduct, H: 6, V : -5 } ))
                                  break;
                                case "13":
                                  setProduct((prevProduct) => ( {...prevProduct, H: -6, V : -6 } ))
                                  break;

                                default:
                                  break;
                              }
                            }}
                          >
                            Optimiser
                          </li>
                        </ul>
                        {p3d && <DiffusorOffset p3d={p3d} setProduct={setProduct}></DiffusorOffset>}
                      </Col>
                      <Col>
                        <div className="canvas_container">
                         {p3d && Object.keys(p3d).length ? (
                            <Shop3D
                              style={{ position: "absolute" }}
                              p3d = {p3d}
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
                  ) : null}
                </Row>
                <Row>
                  <li>
                    {fmin} Hz -{fmax} Hz
                  </li>
                  <li>Taille de cellule : {Math.round(cwidth * 10)} mm</li>
                  <li>{nomenclature.structurel}</li>
                  <li>{nomenclature.simple}</li>
                </Row>
              </Col>
            </>
          ) : (
            "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
          )}
        </Row>
      </Layout>
    </>
  );
};

export default Product;
