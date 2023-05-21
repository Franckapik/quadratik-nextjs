import { queryTypes, useQueryState } from "next-usequerystate";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Layout } from "../../components/Layout";
import { objectsInCategory } from "../../components/dolibarrApi/fetch";
import { DiffusorView2D } from "../../components/quadralab/DiffusorView2D";
import { ModalReport2D } from "../../components/quadralab/ModalReport2D";
import ProductCanvas from "../../components/quadralab/ProductCanvas";
import QuadralabOptions from "../../components/quadralab/QuadralabOptions";
import { useProductStore } from "../../hooks/store";
import { useAttributes } from "../../hooks/useAttributes";
import { QuadralabPerformances } from "../../components/quadralab/QuadralabPerformances";
import { LayoutHome } from "../../components/LayoutHome";
import { useScroll } from "../../hooks/useScroll";

const Quadralab = () => {
  //Data
  const quadralabRef = useRef(null);
  const [attributes, fetching, error] = useAttributes();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(quadralabRef.current.clientHeight);
  }, [quadralabRef]);

  const [defaultProduct, setDefaultProduct] = useState({});
  const [loading, setLoading] = useState(false);

  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get default product from tag category
  const [tag, setCategories] = useQueryState("TAG", queryTypes.integer.withDefault(1));
  useProductStore.setState({ tag: tag }); //global state
  const methods = useForm();

  const report2D = useProductStore((state) => state.report2D);
  const sizes = useProductStore((state) => state.sizes);
  const cwidth = useProductStore((state) => state.cwidth);
  const area = (sizes.longueur * sizes.largeur) / 1000;
  const volume = ((area * sizes.profondeur) / 1000).toFixed(5);
  const woodArea = (sizes.longueur * sizes.profondeur * (report2D.Type + 1) + sizes.largeur * sizes.profondeur * (report2D.Type + 1) + report2D.Cells * cwidth * cwidth) / 1000; //cm2
  const woodVolume = (woodArea * report2D.Thickness) / 1000; //m3
  const weightPoplar = (woodVolume * 530).toFixed(2); //kg pour le peuplier;
  const price = useProductStore.getState().price;
  const nomenclature = useProductStore.getState().nomenclature;
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const valuesSelected = useProductStore((state) => state.valuesSelected);

  const [dimensionView, setDimensionView] = useState(true);

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
      });
  }, [tag]);

  return (
    <>
      <LayoutHome header shop cart />

      {!error ? (
        <Row className="section quadralab_main_row layout_space" ref={quadralabRef}>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <img className="quadralab_bg" src="/logo/logo_marquee.svg" alt="" />

              {/*Canvas*/}

              <Row className="justify-content-center mt-md-5">
                {/* Options */}

                <>
                  {!fetching ? (
                    <Col md={3} className="order-md-1">
                      <QuadralabOptions height={height} attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} />{" "}
                    </Col>
                  ) : (
                    "Chargement des options du produit"
                  )}

                  {/*Parametres*/}
                  {!fetching ? (
                    <Col md={3} className="order-md-3">
                      <QuadralabPerformances height={height} nomenclature={nomenclature} fmin={fmin} fmax={fmax} cwidth={cwidth} weightPoplar={weightPoplar} report2D={report2D} area={area} volume={volume} sizes={sizes} woodArea={woodArea} woodVolume={woodVolume} />
                    </Col>
                  ) : (
                    "Chargement des performances du produit"
                  )}
                </>

                {/*Display*/}

                <Col md={5} className="order-md-2 quadralab_title p-0">
                  <Row className="text-center mt-4">
                    <Link href={{ pathname: "/shop/product", query: valuesSelected }}>
                      <p className="mb-1">
                        <i className="fad fa-store m-2"></i> Modèle similaire : {nomenclature?.simple} ({price} €)
                      </p>
                    </Link>
                  </Row>

                  <Row className="justify-content-center align-items-center mt-4 ">
                    {/*                     <Col>
                      {" "}
                      <Form.Check type={"switch"} id="dimension-switch" label={"3D / 2D"} onChange={(e) => setDimensionView(!dimensionView)} />
                    </Col> */}
                    <Col>
                      {" "}
                      <Form.Check type={"switch"} id="ratio-switch" label={"Cm / %"} onChange={(e) => useProductStore.setState({ ratio: e.target.checked })} />
                    </Col>
                    <Col>
                      {" "}
                      <Form.Check type={"switch"} id="highlight-switch" label={"Surbrillance"} onChange={(e) => useProductStore.setState({ highlights: e.target.checked })} />
                    </Col>
                  </Row>
                  <Row className="quadralab_canvas_container">
                    {" "}
                    <ProductCanvas></ProductCanvas>
                  </Row>

                  <Row className="quadralab_devis_button text-center w-100 justify-content-center">
                    <Col className="justify-content-evenly mt-4" md={4}>
                      <Button variant="secondary m-1" onClick={handleShow}>
                        Plans de fabrication
                      </Button>
                    </Col>
                    <Col className="justify-content-evenly mt-4" md={4}>
                      <Button variant="primary" type="submit">
                        Demander un devis
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <ModalReport2D sizes={sizes} area={area} volume={volume} fmin={fmin} woodArea={woodArea} woodVolume={woodVolume} report2D={report2D} show={show} setShow={setShow} handleClose={handleClose} />
            </Form>
          </FormProvider>
        </Row>
      ) : (
        "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
      )}
    </>
  );
};

export default Quadralab;
