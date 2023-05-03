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
import { FormProvider, useForm } from "react-hook-form";

const Quadralab = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();

  const [defaultProduct, setDefaultProduct] = useState({});
  const [loading, setLoading] = useState(false);

  //get default product from tag category
  const [tag, setCategories] = useQueryState("TAG", queryTypes.integer.withDefault(1));
  useProductStore.setState({ tag: tag }); //global state
  const methods = useForm();

  const sizes = useProductStore((state) => state.sizes);
  const price = useProductStore.getState().price;
  const nomenclature = useProductStore.getState().nomenclature;

  const onSubmit = (data) => console.log(data);

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
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                {!fetching ? <QuadralabOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}
                <Col md={12} className="flex-column justify-content-start p-4">
                  <QuadralabHud></QuadralabHud>
                </Col>
                <Col md={12} className="d-flex flex-column justify-content-evenly ps-5 pe-5 quadralab_canvas_container">
                  {!loading ? <ProductCanvas></ProductCanvas> : "Chargement du modèle"}
                </Col>
                <Row className="justify-content-center align-items-center quadralab_title border_creme">
                  {sizes.longueur} x {sizes.largeur} x {sizes.profondeur} cm
                  <p className="ft05 mb-1">{nomenclature?.simple}</p>
                  <p>{price} €</p>
                  <p> {nomenclature?.structurel} </p>
                </Row>
                <Row className="quadralab_display flex-nowrap">
                  <Form.Check type={"switch"} id="custom-switch" label={"Hauteur(cm) / Ratio"} onChange={(e) => useProductStore.setState({ ratio: e.target.checked })} />
                  <Form.Check type={"switch"} id="custom-switch" label={"Surbrillance"} onChange={(e) => useProductStore.setState({ highlights: e.target.checked })} />
                </Row>
              </Form>
            </FormProvider>
          </Layout>
        </Row>
      ) : (
        "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
      )}
    </>
  );
};

export default Quadralab;
