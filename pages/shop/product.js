import { queryTypes, useQueryState } from "next-usequerystate";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Carousel, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { LayoutHome } from "../../components/LayoutHome";
import { variantPost } from "../../components/dolibarrApi/post";
import { PerformanceSpatial } from "../../components/product/ParformanceSpatial";
import { PerformanceCharts } from "../../components/product/PerformanceCharts";
import ProductCanvas from "../../components/product/ProductCanvas";
import { ProductHud } from "../../components/product/ProductHud";
import { useProductStore } from "../../hooks/store";
import { useProduct } from "../../hooks/useProduct";

const Product = () => {
  //Data
  const router = useRouter();
  const { product, isSuccess: productSuccess } = useProduct(router.query.vid, router.query.dpid, router.query.childCat, { miniature: false });

  //Display
  const [display, setDisplay] = useQueryState("display", queryTypes.integer.withDefault(0));

  const [index, setIndex] = useState(0);

  const methods = useForm();

  const onSubmit = async () => {
    const variant = {
      weight_impact: 0,
      price_impact: product.prices.price - product.prices.basePrice,
      price_impact_is_percent: false,
      features: product.features,
      reference: product.nomenclature?.complet,
      ref_ext: product.nomenclature?.simple,
    };

    variantPost(product.defaultProductId)
      .post("", variant)
      .then((response) => {
        console.log("Ajout du variant [ID]:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <LayoutHome viewedCategory={display} setDisplay={setDisplay} product={["modele", "performances", "spacialisation"]} text_dark shop cart fixed />
      {productSuccess ? (
        <>
          <div className="s0_page_index  d-none d-md-flex">
            {product.description.parent_label}
            <div className="trait"></div>Aperçu du modèle
          </div>
          <div className="product_custom d-none d-md-flex p-2" onClick={() => setDisplay(display !== 3 ? 3 : 0)}>
            Personnaliser le modèle <i className="fad fa-chevron-right pt-4 "></i>
          </div>
          <Row className="layout_space">
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Col md={6} className="product_right bg_creme layout_space">
                  <ProductHud product={product} display={display} />
                </Col>
                <Col md={6} className="product_left flex-column">
                  <Row className="justify-content-center">
                    <Carousel indicators={false} activeIndex={display} controls={false}>
                      {product.image ? (
                        <Carousel.Item>
                          <Carousel indicators={false} activeIndex={index} controls={false}>
                            <Carousel.Item>
                              <img className="d-block product_carousel_img m-auto" src={`data:image/png;base64,${product.image.facePicture}`} alt="Front preview of the model" />
                              <Carousel.Caption>
                                <h3>{product.nomenclature.simple}</h3>
                                <p>Plage de fréquences 1024 Hz - 3542 Hz</p>
                              </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                              <img className="d-block product_carousel_img m-auto" src={`data:image/png;base64,${product.image.sidePicture}`} alt="product.image.sidePicture preview of the model" />
                              <Carousel.Caption>
                                <h3>Dimensions du modèle</h3>
                                <p>
                                  {product.dimensions.W} cm x {product.dimensions.L * product.dimensions.W} cm x {product.dimensions.E} cm{" "}
                                </p>
                              </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item className="product_canvas_container">
                              <ProductCanvas product={product}></ProductCanvas>
                              <Carousel.Caption>
                                <h3>Vue 3D</h3>
                                <p>blabka</p>
                              </Carousel.Caption>
                            </Carousel.Item>
                          </Carousel>
                          <div className="carousel-indicators">
                            <img onClick={() => setIndex(0)} className={`d-block product_thumbnail m-2 ${index === 0 ? "border_creme" : ""}`} src={`data:image/png;base64,${product.image.facePicture}`} alt="First slide thumbnail" />
                            <img onClick={() => setIndex(1)} className={`d-block product_thumbnail m-2 ${index === 1 ? "border_creme" : ""}`} src={`data:image/png;base64,${product.image.sidePicture}`} alt="Second slide thumbnail" />
                            <div onClick={() => setIndex(2)} className={`d-block product_thumbnail m-2 ${index === 2 ? "border_creme" : ""}`}>
                              <i className="fal fa-cube fa-4x mt-4"></i>
                            </div>
                          </div>
                        </Carousel.Item>
                      ) : (
                        "Aperçu non disponible"
                      )}
                      <Carousel.Item>
                        <PerformanceCharts nomenclature={product.nomenclature} />
                      </Carousel.Item>
                      <Carousel.Item>
                        <PerformanceSpatial nomenclature={product.nomenclature} />
                      </Carousel.Item>
                      <Carousel.Item className="product_canvas_container">
                        <ProductCanvas product={product}></ProductCanvas>
                      </Carousel.Item>
                    </Carousel>
                  </Row>
                </Col>
              </Form>
            </FormProvider>
          </Row>
        </>
      ) : (
        "Chargement du produit"
      )}
    </>
  );
};

export default Product;
