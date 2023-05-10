import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Layout } from "../../components/Layout";
import { listCategories, objectsInCategory } from "../../components/dolibarrApi/fetch";
import { PerformanceCharts } from "../../components/product/PerformanceCharts";
import ProductCanvas from "../../components/product/ProductCanvas";
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
  const [tag, setTAG] = useQueryState("TAG", queryTypes.integer.withDefault(1));
  useProductStore.setState({ tag: tag }); //global state

  const [categories, setCategories] = useState([]);
  const parentCategories = categories.filter((cat) => cat.fk_parent == 0).map((cat) => ({ ...cat, ["label"]: cat.label.substring(5) }));
  const nomenclature = useProductStore((state) => state.nomenclature);
  const price = useProductStore((state) => state.price);

  //get all categories
  useEffect(() => {
    listCategories()
      .get()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

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

  const methods = useForm();

  const onSubmit = async (data) => {
    const features = Object.entries(data).reduce((acc, [i, a] = cur) => {
      const getAttributeRef = Object.values(attributes).filter((val) => val.a_ref === i)[0];
      return {
        ...acc,
        [getAttributeRef.a_id]: a,
      };
    }, {});

    const variant = {
      weight_impact: 0,
      price_impact: price - basePrice,
      price_impact_is_percent: false,
      features: features,
      reference: nomenclature?.complet,
      ref_ext: nomenclature?.simple,
    };

    variantPost(defaultProduct.id)
      .post("", variant)
      .then((response) => {
        console.log("Ajout du variant [ID]:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout onePage header shop cart>
      <div className="s0_page_index d-none d-md-flex">
        {defaultProduct.label}
        <div className="trait"></div>Details du modèle
      </div>
      <Row className="">
        <ProductNavBar categories={parentCategories} />
        {!error ? (
          <Row >
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)} className="d-flex flex-column flex-md-row justify-content-evenly ft4  ">
              <Col md={3}>{!fetching ? <ProductOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}</Col>
              <Col md={9} className="p-2">
                <Row className="justify-content-start text-center">
                  <Col className="ft6 p-2 product_tab   me-2 bg_darker text-uppercase" style={{ top: display === "model" ? "1px" : "0px" }} onClick={() => setDisplay("model")}>
                    Modele
                  </Col>
                  <Col className="ft6 p-2 product_tab  me-2 bg_darker text-uppercase" style={{ top: display === "coefDif" ? "1px" : "0px" }} onClick={() => setDisplay("coefDif")}>
                    Performances
                  </Col>
                  <Col className="ft6 p-2 product_tab bg_darker text-uppercase " style={{ top: display === "plot" ? "1px" : "0px" }} onClick={() => setDisplay("plot")}>
                    Spacialisation
                  </Col>
                </Row>
                <Row className="producthud_content border_creme bg_darker p-2">
                  {!loading ? (
                    <>
                      {display === "coefDif" ? <PerformanceCharts /> : null}
                      {display === "plot" ? <img src={"/performances/Spatial/D2N7P5W50.png"} style={{ height: "100%", width: "auto", margin: "auto" }} /> : null}
                      {display === "model" ? <ProductHud /> : null}
                    </>
                  ) : (
                    "Chargement du modèle"
                  )}
                </Row>{" "}
                {/* // only for mobile */}
                <Row className="d-md-none border_creme  mt-4">
                  <ProductCanvas></ProductCanvas>
                </Row>
              </Col>
            </Form>
          </FormProvider>
          </Row>
        ) : (
          "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
        )}
      </Row>
    </Layout>
  );
};

export default Product;
