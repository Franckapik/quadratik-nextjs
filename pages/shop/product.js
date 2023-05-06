import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import { objectsInCategory } from "../../components/dolibarrApi/fetch";
import { PerformanceCharts } from "../../components/product/PerformanceCharts";
import { ProductHud } from "../../components/product/ProductHud";
import { ProductNavBar } from "../../components/product/ProductNavBar";
import ProductOptions from "../../components/product/ProductOptions";
import { useProductStore } from "../../hooks/store";
import { useAttributes } from "../../hooks/useAttributes";

const Product = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();
  const [defaultProduct, setDefaultProduct] = useState({});
  const [loading, setLoading] = useState(true);

  //Display
  const [display, setDisplay] = useState("model");

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
    <Layout onePage header>
      <div className="s0_page_index">
        {defaultProduct.label}
        <div className="trait"></div>Details du modèle
      </div>
      <Row className="section flex_column">
        <ProductNavBar />
        {!error ? (
          <Row className="d-flex justify-content-evenly ft4 product_main_row ">
            <Col md={2} className="d-flex flex-column justify-content-start product_attributes_col bg_darker p-4">
              {!fetching ? <ProductOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}
            </Col>
            <Col md={9} className="d-flex flex-column justify-content-start ps-5 pe-5">
              <Row className="justify-content-start text-center">
                <Col className="ft6 p-2 product_tab bg_darker text-uppercase" onClick={() => setDisplay("model")}>
                  Modele
                </Col>
                <Col />
                <Col className="ft6 p-2 product_tab  text-uppercase" onClick={() => setDisplay("coefDif")}>
                  Performances
                </Col>
                <Col />
                <Col className="ft6 p-2 product_tab text-uppercase " onClick={() => setDisplay("plot")}>
                  Spacialisation
                </Col>
                <Col />
              </Row>
              <Row className="producthud_content border_creme bg_darker">
                {!loading ? (
                  <>
                    {display === "coefDif" ? <PerformanceCharts /> : null}
                    {display === "plot" ? <img src={"/performances/Spatial/D2N7P5W50.png"} style={{ height: "100%", width: "auto", margin: "auto" }} /> : null}
                    {display === "model" ? <ProductHud /> : null}
                  </>
                ) : (
                  "Chargement du modèle"
                )}
              </Row>
            </Col>
          </Row>
        ) : (
          "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
        )}
      </Row>
    </Layout>
  );
};

export default Product;
