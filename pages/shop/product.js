import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { attributesAllFetch, attributesFetchById, objectsInCategory } from "../../components/dolibarrApi/fetch";
import { Modele3D } from "../../components/product/Modele3D";
import { PerformanceCharts } from "../../components/product/PerformanceCharts";
import ProductOptions from "../../components/product/ProductOptions";
import { ProductNavBar } from "../../components/product/ProductNavBar";
import { useNomenclature } from "../../hooks/useNomenclature";
import { useRouter } from "next/router";
import { queryTypes, useQueryState, useQueryStates } from "next-usequerystate";
import { useProductStore } from "../../hooks/store";

const Product = () => {
  const [display, setDisplay] = useState("model");
  const [error, setError] = useState(false);
  const [attributes, setAttributes] = useState({});
  const [defaultProduct, setDefaultProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [productParent, setProductParent] = useState(false);

  const [product, setProduct] = useState(false);
  const [p3d, setProduct3D] = useState(false);


  const [ratio, setRatio] = useState(false);

  // retrouver ces variables différemment en utilisant un global state ou bien un hook ?
  const [amax, setAmax] = useState(4);
  const [cwidth, setCwidth] = useState(4);

  const fmin = Math.round((((344 / 2 / p3d.P / 10) * amax) / p3d.N) * 1000);
  const fmax = Math.round(344 / 2 / (cwidth / 100));

  const [valuesSelected, setValuesSelected] = useQueryStates(
    {
      PID: queryTypes.string.withDefault(8),
      TAG: queryTypes.string.withDefault(1),
    },
    {
      history: "push",
    }
  );

  const router = useRouter();

  // Get the query parameter from the URL
  const { TAG } = router.query;

  //get default product from category
  useEffect(() => {
    objectsInCategory(valuesSelected.TAG)
      .get()
      .then((response) => {
        var attributes = JSON.parse(response.data[0].note_private);
        setDefaultProduct({...response.data[0], attributes : attributes});
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [valuesSelected]);

  useEffect(() => {
    attributesAllFetch() // get all attributes
      .get()
      .then((response) => {
        const attributes = response.data;
        if (attributes.length) {
          Promise.all(
            attributes.map((a) =>
              attributesFetchById(a.id) //get all values according to attributes
                .get()
                .then((response) => {
                  return response.data;
                }) .catch((error) => {
                  return error;
                })
            )
          )
            .then((values) => {
              const filteredValues = values.filter((item) => item).flat(); //no undefined and same level
              const attributesAndValues = Object.entries(attributes).reduce((acc, [key, val] = item) => {
                const v = filteredValues.filter((a) => a.fk_product_attribute == val.id).sort((a,b) => a.id-b.id);
                let newV = {};
                if (v.length) {
                  newV = Object.entries(v).reduce((acc, [key, val] = item) => {                    
                    return {
                      ...acc,
                      [key]: {
                        v_id: val.id,
                        v_ref: val.ref,
                        v_3d: val.value?.split(",")[0],
                        v_label: val.value?.split(",")[1],
                        v_operator: val.value?.split(",")[3],
                        v_factor: val.value?.split(",")[2],
                      },
                    };
                  }, 0);
                }
    
                return {
                  ...acc,
                  [key]: {
                    a_id: val.id,
                    a_ref: val.ref,
                    a_position: val.position,
                    a_label: val.label,
                    values: newV,
                  },
                };
              }, 0);

              useProductStore.setState({attributes : attributesAndValues})
              setAttributes(attributesAndValues);
              setLoading(false);
            })
            .catch((error) => {
              return error
            });
            
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

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




  return (
    <Row className="section">
      <ProductNavBar />
      {!error ? (
        <Row className="d-flex align-items-start ft4 product_main_row ">
          <Col md={1}></Col>
          <Col md={3} className="d-flex flex-column justify-content-start product_attributes_col bg_darker h-100 p-4">
            {!loading ? <ProductOptions attributes={attributes} defaultProduct={defaultProduct}  /> : "Chargement des options du produit"}
            {/*  {totalPrice && "Prix: " + totalPrice + " €"} */}
          </Col>
          <Col md={7} className="d-flex flex-column justify-content-evenly ps-5 pe-5">
            <Row className="justify-content-between text-center">
              <Col className="product_tab bg_darker" onClick={() => setDisplay("model")}>
                Model
              </Col>
              <Col />
              <Col className="product_tab " onClick={() => setDisplay("coefDif")}>
                Coef
              </Col>
              <Col />
              <Col className="product_tab " onClick={() => setDisplay("plot")}>
                Plot
              </Col>
              <Col />
            </Row>
            <Row className="product_preview_row border_creme bg_darker">
              {display === "coefDif" ? <PerformanceCharts /> : null}
              {display === "plot" ? <img src={"/performances/Spatial/D2N7P5W50.png"} style={{ height: "100%", width: "auto", margin: "auto" }} /> : null}
              {display === "model" ? <Modele3D p3d={p3d} ratio={ratio} amax={amax} setAmax={setAmax} cwidth={cwidth} setCwidth={setCwidth} setProduct={setProduct} /> : null}
            </Row>
            {/*             <Row>
              <Col>
                {fmin} Hz -{fmax} Hz
              </Col>
              <Col>Taille de cellule : {Math.round(cwidth * 10)} mm</Col>
              <Col>{nomenclature.structurel}</Col>
              <Col>{nomenclature.simple}</Col>
            </Row> */}
          </Col>
          {/*  <Col md={8} className="product_preview_col">
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
          </Col> */}
        </Row>
      ) : (
        "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
      )}
    </Row>
  );
};

export default Product;
