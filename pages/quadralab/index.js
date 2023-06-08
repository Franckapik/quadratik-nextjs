import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { CardOptions } from "../../components/CardOptions";
import { LayoutHome } from "../../components/LayoutHome";
import { PerformancesCard } from "../../components/PerformancesCard";
import { ModalReport2D } from "../../components/quadralab/ModalReport2D";
import ProductCanvas from "../../components/quadralab/QuadralabCanvas";
import QuadralabOptions from "../../components/quadralab/QuadralabOptions";
import { QuadralabView1D } from "../../components/quadralab/QuadralabView1D";
import { useProductStore } from "../../hooks/store";
import { useComputeProduct } from "../../hooks/useComputeProduct";
import { useFetchProduct } from "../../hooks/useFetchProduct";

const Quadralab = () => {
  //Data

  const router = useRouter();
  const { allAttributes, defaultProduct, category, productAttributes, isAllSuccess, allValues, isVariant } = useFetchProduct(router.query.vid, router.query.dpid, router.query.childCat);
  const { product, isSuccess: productSuccess, changeAttributes } = useComputeProduct(allAttributes, productAttributes, allValues, category, defaultProduct, isAllSuccess, router.query.vid, isVariant);
  const quadralabRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (quadralabRef != undefined && quadralabRef.current != null) {
      setHeight(quadralabRef.current?.clientHeight);
    }
  }, [quadralabRef]);

  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const methods = useForm();

  const [dimensionView, setDimensionView] = useState(true);

  const onSubmit = (data) => console.log(data);

  return (
    <Row>
      <LayoutHome header home shop />

      {productSuccess ? (
        <Row className="section quadralab_main_row layout_space" ref={quadralabRef}>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <img className="quadralab_bg" src="/logo/logo_marquee.svg" alt="" />
              <Row className="justify-content-center mt-md-5">
                <>
                  <Col md={3} className="order-md-1">
                    <QuadralabOptions height={height} product={product} changeAttributes={changeAttributes} />
                  </Col>

                  <Col md={3} className="order-md-3">
                    <CardOptions title="performances" opened={height > 700 ? "1" : "0"}>
                    <p className="text-center mb-4">
        <i className="fad fa-stream"></i> REF : {product.nomenclature?.structurel}
      </p>
                      <PerformancesCard product={product} />
                    </CardOptions>
                  </Col>
                </>
                <Col md={5} className="order-md-2 quadralab_title p-0">
                  <CardOptions title="Visualisation 3D" opened={"1"} transparent>
                    <Row className="justify-content-center align-items-center mt-4 ">
                      <Col>
                        <Form.Check type={"switch"} id="dimension-switch" onChange={(e) => setDimensionView(!dimensionView)} />
                        <p>3D / 2D</p>
                      </Col>
                      <Col className="d-flex flex-column align-items-center">
                        <Form.Check type={"switch"} id="ratio-switch" onChange={(e) => useProductStore.setState({ ratio: e.target.checked })} />
                        <p>Cm / %</p>{" "}
                      </Col>
                      <Col className="d-flex flex-column align-items-center">
                        <Form.Check type={"switch"} id="highlight-switch" onChange={(e) => useProductStore.setState({ highlights: e.target.checked })} />
                        <p>Surbrillance</p>
                      </Col>
                    </Row>
                    <Row className="quadralab_canvas_container">{dimensionView ? <ProductCanvas product={product}></ProductCanvas> : <QuadralabView1D product={product} />}</Row>
                  </CardOptions>

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

              <ModalReport2D product={product} show={show} setShow={setShow} handleClose={handleClose} />
            </Form>
          </FormProvider>
        </Row>
      ) : null}
    </Row>
  );
};

export default Quadralab;
