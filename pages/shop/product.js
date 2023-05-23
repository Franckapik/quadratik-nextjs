import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Carousel, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { LayoutHome } from "../../components/LayoutHome";
import { listCategories, objectsInCategory } from "../../components/dolibarrApi/fetch";
import { variantPost } from "../../components/dolibarrApi/post";
import { PerformanceSpatial } from "../../components/product/ParformanceSpatial";
import { PerformanceCharts } from "../../components/product/PerformanceCharts";
import ProductCanvas from "../../components/product/ProductCanvas";
import { ProductHud } from "../../components/product/ProductHud";
import { useProductStore } from "../../hooks/store";
import { useAttributes } from "../../hooks/useAttributes";

const Product = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();
  const [defaultProduct, setDefaultProduct] = useState({});
  const [loading, setLoading] = useState(true);

  //Display
  const [display, setDisplay] = useQueryState("Display", queryTypes.integer.withDefault(0));

  //get default product from tag category
  const [tag, setTAG] = useQueryState("TAG", queryTypes.integer.withDefault(1));
  useProductStore.setState({ tag: tag }); //global state

  const [categories, setCategories] = useState([]);
  const nomenclature = useProductStore((state) => state.nomenclature);
  const price = useProductStore((state) => state.price);
  const baseprice = useProductStore((state) => state.baseprice);

  const [index, setIndex] = useState(0);

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
      price_impact: price - baseprice,
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
    <>
      <LayoutHome viewedCategory={display} setDisplay={setDisplay} product={["modele", "performances", "spacialisation"]} text_dark shop cart />
      <div className="s0_page_index  d-none d-md-flex">
        {defaultProduct.label}
        <div className="trait"></div>Aperçu du modèle
      </div>
      <div className="product_custom d-none d-md-flex p-2" onClick={() => setDisplay(3)}>
        Personnaliser le modèle <i className="fad fa-chevron-right pt-4 "></i>
      </div>
      <Row className="layout_space">
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Col md={6} className="product_right bg_creme layout_space">
              <ProductHud display={display} fetching={fetching} attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} />
            </Col>
            <Col md={6} className="product_left flex-column">
              <Row className="justify-content-center">
                <Carousel indicators={false} activeIndex={display} controls={false}>
                  <Carousel.Item>
                    <Carousel  indicators={false} activeIndex={index} controls={false}>
                      <Carousel.Item>
                        <img className="d-block product_carousel_img m-auto" src="/shop/format_product.png" alt="First slide" />
                        <Carousel.Caption>
                          <h3>{nomenclature?.simple}</h3>
                          <p>Traite intégralement la plage de fréquences 1024 - 3542 Hz</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                      <img className="d-block product_carousel_img m-auto" src="/shop/format_product.png" alt="First slide" />
                        <Carousel.Caption>
                          <h3>Second slide label</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                      <img className="d-block product_carousel_img m-auto" src="/shop/format_product.png" alt="First slide" />
                        <Carousel.Caption>
                          <h3>Third slide label</h3>
                          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>{" "}
                    <div class="carousel-indicators">
                      <img  onClick={() => setIndex(0)} className="d-block product_thumbnail m-2" src="/shop/format_product.png" alt="First slide" />
                      <img  onClick={() => setIndex(1)} className="d-block product_thumbnail m-2" src="/shop/format_product.png" alt="First slide" />
                      <img  onClick={() => setIndex(2)} className="d-block product_thumbnail m-2" src="/shop/format_product.png" alt="First slide" />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <PerformanceCharts nomenclature={nomenclature} />
                  </Carousel.Item>
                  <Carousel.Item>
                    <PerformanceSpatial nomenclature={nomenclature} />
                  </Carousel.Item>
                  <Carousel.Item className="product_canvas_container">
                    <ProductCanvas></ProductCanvas>
                  </Carousel.Item>
                </Carousel>
              </Row>
            </Col>
          </Form>
        </FormProvider>
      </Row>
    </>
  );
};

export default Product;