import { queryTypes, useQueryState, useQueryStates } from "next-usequerystate";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DiffusorOffset } from "../../components/DiffusorOffset";
import { attributesFetch, productsFetch } from "../../components/dolibarrApi/fetch";
import { PerformanceCharts } from "../../components/product/PerformanceCharts";
import Select_Options from "../../components/product/SelectOptions";
import Shop3D from '../../components/Shop3D';
import { usePrice } from "../../hooks/usePrice";
import Layout from "../../layouts/Layout";

const Product = () => {
  const [display, setDisplay] = useState("model");
  const [nomenclature, setNomenclature] = useState("nomenclature");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valuesSelected, setValuesSelected] = useState({});
  const [productSelected,setProductSelected] = useState(false);
  const isInitialMount = useRef(true);

  const [product3D, set3DProduct] = useQueryStates(
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

  const attributesAdvanced = ["H", "V", "I", "C"];

  const [basePrice, totalPrice] = usePrice(productSelected)

  useEffect(() => {
    console.log("SELECTED", valuesSelected);
    console.log("VALUES", values);
    console.log("ATTRIBUTES", attributes);
    console.log("PRODUCTSELECTED", productSelected);
    console.log("PRODUCT3D", product3D);
  }, [valuesSelected, productSelected, product3D]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const ids = Object.values(valuesSelected);
      const selection = values.filter((a) => ids.includes(a.id));
      const productPrices = selection.map((a) => {
        const attributeParent = attributes.filter((b) => a.fk_product_attribute === b.id)[0];
        const obj = {};
        const arr = a.value.split(",");
        obj["ref"] = a.ref;
        obj["id"] = a.id;
        obj["attribute_ref"] = attributeParent.ref;
        obj["attribute_id"] = attributeParent.id;
        obj["notInPrice"] = attributeParent.ref === "P" || attributeParent.ref === "N";
        obj["operation"] = arr[3];
        obj["price_value"] = arr[2];
        obj["value_3D"] = arr[0];
        return obj;
      });

      setProductSelected(productPrices);
    }
  }, [valuesSelected]);

  useEffect(()=> { //generation de l'object 3D
if (productSelected) {
   const product3D = productSelected.reduce((a,i) => ({...a, [i.attribute_ref] : i.value_3D}), {})
   set3DProduct(product3D)
}
  }, [productSelected])

  useEffect(() => { //get all attributes
    attributesFetch.get("?sortfield=t.ref&sortorder=ASC&limit=100").then((response) => {
      setAttributes(response.data);
    });
  }, []);

  useEffect(() => { //gets all values from attributes
    Promise.all(
      attributes.map((a) => {
        if (!attributesAdvanced.includes(a.ref)) {
          return attributesFetch
            .get("/" + a.id + "/values")
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error);
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
      .catch((error) => console.log(error));
  }, [attributes]);

  useEffect(() => { //generate nomenclature
    setNomenclature({
      structurel:
        product3D.D + "N" + product3D.N + "W" + product3D.W + "L" + product3D.L + "P" + product3D.P + "E" + product3D.E + product3D.M,
      complet:
        product3D.D +
        "N" +
        product3D.N +
        "W" +
        product3D.W +
        "L" +
        product3D.L +
        "P" +
        product3D.P +
        "E" +
        product3D.E +
        product3D.M +
        "C" +
        product3D.C +
        "I" +
        product3D.I +
        "H" +
        product3D.H +
        "V" +
        product3D.V,
      simple: properties.ref + "-" + product3D.N + product3D.P + (product3D.L == "2" ? "L" : ""),
    });
  }, [product3D, properties, setNomenclature]);

  useEffect(() => {
    productsFetch.get("/" + product3D.PRODUCTID + "?includeparentid=true").then((response) => {
      setProperties(response.data);
    });
  }, [product3D.PRODUCTID, setProperties]);

  const [ratio, setRatio] = useQueryState("ratio", queryTypes.boolean.withDefault(false));

  const [amax, setAmax] = useState(4);
  const [cwidth, setCwidth] = useState(31);

  const fmin = Math.round((((344 / 2 / product3D.P / 10) * amax) / product3D.N) * 1000);
  const fmax = Math.round(344 / 2 / (cwidth / 100));

  return (
    <>
      <Layout>
        <Row>
          <Col sm={4} className="attributes_col">
            {!loading && (
              <Select_Options
                setValuesSelected={setValuesSelected}
                set3DProduct={set3DProduct}
                product3D={product3D}
                setPrice={setPrice}
                price={price}
                attributesAdvanced={attributesAdvanced}
                attributes={attributes}
                values={values}
              ></Select_Options>
            )}{" "}
            Prix {Math.round(totalPrice) + " €"}
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
                      <li onClick={() => set3DProduct({ C: "motif0" })}>Motif0</li>
                      <li onClick={() => set3DProduct({ C: "motif1" })}>Motif1</li>
                      <li onClick={() => set3DProduct({ C: "motif2" })}>Motif2</li>
                      <li onClick={() => set3DProduct({ I: !product3D.I })}>Invert</li>
                      <li
                        onClick={() => {
                          switch (product3D.N) {
                            case 7:
                              set3DProduct({ H: -3, V: -3 });
                              break;
                            case 11:
                              set3DProduct({ H: 6, V: -5 });
                              break;
                            case 13:
                              set3DProduct({ H: -6, V: -6 });
                              break;

                            default:
                              break;
                          }
                        }}
                      >
                        Optimiser
                      </li>
                    </ul>
                    <DiffusorOffset product3D={product3D} set3DProduct={set3DProduct}></DiffusorOffset>
                  </Col>
                  <Col>
                    <div className="canvas_container">
                      <Shop3D
                        style={{ position: "absolute" }}
                        product3D={product3D}
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
              <li>
                {fmin} Hz -{fmax} Hz
              </li>
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
