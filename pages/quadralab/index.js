import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { attributesAllFetch, attributesFetchById, objectsInCategory } from "../../components/dolibarrApi/fetch";
import { ProductHud } from "../../components/quadralab/ProductHud";
import { PerformanceCharts } from "../../components/quadralab/PerformanceCharts";
import { ProductNavBar } from "../../components/quadralab/ProductNavBar";
import ProductOptions from "../../components/quadralab/ProductOptions";
import { useProductStore } from "../../hooks/store";
import ProductCanvas from "../../components/quadralab/ProductCanvas";

const Quadralab = () => {
  //Data
  const [attributes, setAttributes] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState({});
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  //Display
  const [display, setDisplay] = useState("model");
  const [error, setError] = useState(false);

  //get default product from tag category
  const [tag, setCategories] = useQueryState("TAG", queryTypes.integer.withDefault(1));
  useProductStore.setState({ tag: tag }); //global state

  useEffect(() => {
    objectsInCategory(tag)
      .get()
      .then((response) => {
        var attributes = JSON.parse(response.data[0].note_private);
        setDefaultProduct({ ...response.data[0], attributes: attributes });
      })
      .catch((error) => {
        console.log(error);
        /*  setError(error); */ //waiting for work on absorbeurs
      });
  }, [tag]);

  // get attributes (ex : Width) and then values (ex: 50cm)
  useEffect(() => {
    attributesAllFetch()
      .get()
      .then((response) => {
        const attributes = response.data;
        if (attributes.length) {
          Promise.all(
            attributes.map((a) =>
              attributesFetchById(a.id)
                .get()
                .then((response) => {
                  return response.data;
                })
                .catch((error) => {
                  return error;
                })
            )
          )
            .then((values) => {
              const filteredValues = values.filter((item) => item).flat(); //no undefined and same level
              const attributesAndValues = Object.entries(attributes).reduce((acc, [key, val] = item) => {
                const v = filteredValues.filter((a) => a.fk_product_attribute == val.id).sort((a, b) => a.id - b.id);
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

              useProductStore.setState({ attributes: attributesAndValues }); //global state
              setAttributes(attributesAndValues);
              setFetching(false);
            })
            .catch((error) => {
              return error;
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [tag]);

  return (
    <Row className="section align-items-center">
      {!error ? (
        <Row className="d-flex align-items-start ft4 quadralab_main_row  ">
          <Col md={1}></Col>
          <Col md={3} className="flex-column justify-content-start quadralab_attributes_col bg_darker h-100 p-4">
            {!fetching ? <ProductOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}
          </Col>
          <Col md={3} className="flex-column justify-content-start quadralab_hud_col h-100 p-4">
            <ProductHud></ProductHud>
          </Col>
          <Col md={11} className="d-flex flex-column justify-content-evenly ps-5 pe-5">
            <Row className="quadralab_preview_row ">{!loading ? <ProductCanvas></ProductCanvas> : "Chargement du modèle"}</Row>
          </Col>
        </Row>
      ) : (
        "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
      )}
    </Row>
  );
};

export default Quadralab;
