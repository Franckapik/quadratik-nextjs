import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { objectsInCategory } from "../../components/dolibarrApi/fetch";
import ProductCanvas from "../../components/quadralab/ProductCanvas";
import { ProductHud } from "../../components/quadralab/ProductHud";
import QuadralabOptions from "../../components/quadralab/QuadralabOptions";
import { useProductStore } from "../../hooks/store";
import { useAttributes } from "../../hooks/useAttributes";
import { Layout } from "../../components/Layout";

const Quadralab = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();

  const [defaultProduct, setDefaultProduct] = useState({});
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      {!error ? (
        <Row className="d-flex align-items-start ft4 quadralab_main_row">
          <Layout onePage header>
            {" "}
            <Col md={3} className="flex-column justify-content-start quadralab_attributes_col h-100 p-4">
              {!fetching ? <QuadralabOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}
            </Col>
            <Col md={3} className="flex-column justify-content-start quadralab_hud_col h-100 p-4">
              <ProductHud></ProductHud>
            </Col>
            <Col md={11} className="d-flex flex-column justify-content-evenly ps-5 pe-5">
              <Row className="quadralab_preview_row ">{!loading ? <ProductCanvas></ProductCanvas> : "Chargement du modèle"}</Row>
            </Col>{" "}
          </Layout>
        </Row>
      ) : (
        "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
      )}
    </>
  );
};

export default Quadralab;
