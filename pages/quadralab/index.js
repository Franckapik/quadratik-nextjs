import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { objectsInCategory } from "../../components/dolibarrApi/fetch";
import ProductCanvas from "../../components/quadralab/ProductCanvas";
import { QuadralabHud } from "../../components/quadralab/QuadralabHud";
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
        <Row className="d-flex ft4 quadralab_main_row">
          <Layout header>
            {!fetching ? <QuadralabOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}
            <Col md={12} className="flex-column justify-content-start p-4">
              <QuadralabHud></QuadralabHud>
            </Col>
            <Col md={12} className="d-flex flex-column justify-content-evenly ps-5 pe-5 quadralab_canvas_container">
              {!loading ? <ProductCanvas></ProductCanvas> : "Chargement du modèle"}
            </Col>{" "}
            <Row className="quadralab_display flex-nowrap">
              <Form.Check type={"switch"} id="custom-switch" label={"Hauteur(cm) / Ratio"} onChange={(e) => useProductStore.setState({ ratio: e.target.checked })} />
              <Form.Check type={"switch"} id="custom-switch" label={"Highlight"} onChange={(e) => useProductStore.setState({ ratio: e.target.checked })} />
            </Row>
          </Layout>
        </Row>
      ) : (
        "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
      )}
    </>
  );
};

export default Quadralab;
