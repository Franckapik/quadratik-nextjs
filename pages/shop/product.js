import { queryTypes, useQueryStates } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DiffusorOffset } from "../../components/DiffusorOffset";
import { attributesAllFetch, attributesFetchById, productFetchById } from "../../components/dolibarrApi/fetch";
import { Modele3D } from "../../components/product/Modele3D";
import { PerformanceCharts } from "../../components/product/PerformanceCharts";
import Select_Options from "../../components/product/SelectOptions";
import Shop3D from "../../components/Shop3D";
import { useNomenclature } from "../../hooks/useNomenclature";
import { usePrice } from "../../hooks/usePrice";

const Product = () => {
  const [display, setDisplay] = useState("model");
  const [error, setError] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState(false);
  const [loading, setLoading] = useState(true);

  const [valuesSelected, setValuesSelected] = useQueryStates(
    {
      PID: queryTypes.string.withDefault(8),
      TAG: queryTypes.string.withDefault("Diffuseurs"),
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

  // retrouver ces variables différemment en utilisant un global state ou bien un hook ?
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
        const attribute_value = v[0].value.split(",");
        return {
          ...acc,
          [key]: {
            ...v[0],
            ["value3D"]: attribute_value[0],
            ["operation"]: attribute_value[3],
            ["attribute_price"]: attribute_value[2],
          },
        };
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
          if (isNaN(val.value3D)) {
            return { ...acc, [key]: val.value3D };
          } else {
            return { ...acc, [key]: parseInt(val.value3D) };
          }
        } else {
          return { ...acc, [key]: val };
        }
        return acc;
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
    <Row className="section">
      <Row>
        <Navbar expand="lg">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="?TAG=Diffuseurs">Diffuseurs</Nav.Link>
              <Nav.Link href="?TAG=Absorbeurs">Absorbeurs</Nav.Link>
              <Nav.Link href="#link">Reflecteurs</Nav.Link>
              <Nav.Link href="#link">Accessoires</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      {!error ? (
        <Row>
          {/*  <Col md={1}></Col> */}
          <Col md={3} className="product_attributes_col h-100">
            {!loading ? (
              <Select_Options setValuesSelected={setValuesSelected} notInForm={notInForm} attributes={attributes} values={values} product={product} prices={[basePrice, totalPrice]} valuesSelected={valuesSelected} nomenclature={nomenclature}></Select_Options>
            ) : (
              "Chargement des options du produit"
            )}
            {totalPrice && "Prix: " + totalPrice + " €"}
          </Col>
          <Col md={8} className="product_preview_col">
            <Row>
              <Col onClick={() => setDisplay("model")}>Model</Col>
              <Col onClick={() => setDisplay("coefDif")}>Coef</Col>
              <Col onClick={() => setDisplay("plot")}>Plot</Col>
            </Row>
            <Row className="product_preview_row border_creme">
              {display === "coefDif" ? <PerformanceCharts /> : null}
              {display === "plot" ? <img src={"/performances/Spatial/D2N7P5W50.png"} style={{ height: "100%", width: "auto", margin: "auto" }} /> : null}
              {display === "model" ? <Modele3D p3d={p3d} ratio={ratio} amax={amax} setAmax={setAmax} cwidth={cwidth} setCwidth={setCwidth} setProduct={setProduct} /> : null}
            </Row>
            <Row>
              <Col>
                {fmin} Hz -{fmax} Hz
              </Col>
              <Col>Taille de cellule : {Math.round(cwidth * 10)} mm</Col>
              <Col>{nomenclature.structurel}</Col>
              <Col>{nomenclature.simple}</Col>
            </Row>
          </Col>
        </Row>
      ) : (
        "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
      )}
    </Row>
  );
};

export default Product;
