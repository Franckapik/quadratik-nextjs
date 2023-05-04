import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Layout } from "../../components/Layout";
import { objectsInCategory } from "../../components/dolibarrApi/fetch";
import ProductCanvas from "../../components/quadralab/ProductCanvas";
import QuadralabOptions from "../../components/quadralab/QuadralabOptions";
import { useProductStore } from "../../hooks/store";
import { useAttributes } from "../../hooks/useAttributes";
import Link from "next/link";

const DiffusorView2D = () => {
  const report2D = useProductStore((state) => state.report2D);
  const ratio = useProductStore((state) => state.ratio);

  return (
    <Row>
      <Row className="">
        {Array(report2D.Type)
          .fill("")
          .map((a, i) => {
            return <Col className="text-center">{ratio ? report2D[i]?.ratio : report2D[i]?.hauteur}</Col>;
          })}
      </Row>
      <Row className="align-items-end">
        {Array(report2D.Type)
          .fill("")
          .map((a, i) => {
            return <Col className="border_creme" style={{ height: report2D[i]?.ratio * 10 }}></Col>;
          })}
      </Row>
      <Row className="">
        {Array(report2D.Type)
          .fill("")
          .map((a, i) => {
            return <Col className="text-center">{i}</Col>;
          })}
      </Row>
      Obtenir le rapport détaillé
    </Row>
  );
};

const PerformanceWidget = ({ icon, value, color, performance }) => {
  console.log(icon);
  return (
    <div className="m-2">
      <div className="flex quadralab_round quadralab_game_border dark_bg ">
        <i className={icon}></i>
      </div>
      <div className="flex quadralab_line quadralab_game_border ">
        <div className="bg_red h-100" style={{ width: `${performance}%`, backgroundColor: color }}></div>
      </div>
      <div className="text-end">{value}</div>
    </div>
  );
};

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
  const area = sizes.longueur * sizes.largeur / 1000;
  const volume = area * sizes.profondeur / 1000;
  const price = useProductStore.getState().price;
  const nomenclature = useProductStore.getState().nomenclature;
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const cwidth = useProductStore((state) => state.cwidth);
  const valuesSelected = useProductStore((state) => state.valuesSelected);

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
                <Col md={12} className="d-flex flex-column justify-content-evenly ps-5 pe-5 quadralab_canvas_container">
                  {!loading ? <ProductCanvas></ProductCanvas> : "Chargement du modèle"}
                </Col>
                <Row className="justify-content-center align-items-center quadralab_title ">
                <Link href={{ pathname: "/shop/product", query: valuesSelected }}>
                  <p className="ft4 mb-1">Modèle similaire disponible : {nomenclature?.simple} ({price} €) </p>
                  </Link>
                </Row>
                <Col className=" flex flex-column quadralab_hud_col quadralab_params">
                  <Row>
                  <p className="bg_darker text-center m-2 p-2"> REF :  {nomenclature?.structurel} </p>
                    <PerformanceWidget icon="fad fa-bolt" value={`${fmin} Hz - ${fmax} Hz`} color="red" performance={((fmax - fmin) * 100) / 10000} /> {/* 10k audio frequency */}
                    <PerformanceWidget icon="fad fa-sort-size-down" value={`${(cwidth * 10).toFixed(0)} mm`} color="red" performance={100 - (cwidth * 10 * 100) / 90} />
                    <PerformanceWidget icon="fad fa-box-open" value={`${area} m2 // ${volume} m3`} color="red" performance={volume * 100 / 0.144}/> {/* 120 * 60 * 20cm */}
                  </Row>
                  <DiffusorView2D />
                  <Row>
                   <p>Fabrication d'un modèle Quadratik sur mesure </p> 
<p>  {sizes.longueur} x {sizes.largeur} x {sizes.profondeur} cm</p>

                     <Button variant="primary" type="submit" className="quadralab_devis_button m-auto mt-4">
                    Demander un devis
                  </Button></Row>
                 
                </Col>
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
