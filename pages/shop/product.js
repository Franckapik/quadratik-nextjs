import { queryTypes, useQueryState } from "next-usequerystate";
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
import { useAttributes } from "../../hooks/useAttributes";
import { useFetchDefaultProduct } from "../../hooks/useFetchDefaultProduct";
import { useFetchPicture } from "../../hooks/useFetchPicture";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { useQuery } from "react-query";

const Product = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();

  const {isLoading, data, isFetching} = useQuery(['post']);
  console.log(data);


  //Display
  const [display, setDisplay] = useQueryState("Display", queryTypes.integer.withDefault(0));

  //get default product from tag category
  const [tag, setTAG] = useQueryState("TAG", queryTypes.integer.withDefault(1));
  const [childCat, setChildCat] = useQueryState("childCat", queryTypes.integer.withDefault(1));

  useEffect(() => {
    useProductStore.setState({ tag: tag }); //"cannot render a component while ..."
  }, [tag]);

  const defaultProduct = useFetchDefaultProduct(tag);

  const nomenclature = useProductStore((state) => state.nomenclature);
  const price = useProductStore((state) => state.price);
  const baseprice = useProductStore((state) => state.baseprice);
  const [miniature, errorImg] = useFetchPicture(nomenclature, 'Miniature');
  const [face, errorFaceImg] = useFetchPicture(nomenclature, 'Face');
  const [side, errorSideImg] = useFetchPicture(nomenclature, 'Side');

  const childCategorie = useFetchCategories((cat) => cat.id == childCat);

  const [index, setIndex] = useState(0);

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
              <ProductHud childCat={childCategorie} description={defaultProduct.description} display={display} fetching={fetching} attributes={attributes} defaultProduct={defaultProduct} />
            </Col>
            <Col md={6} className="product_left flex-column">
              <Row className="justify-content-center">
                <Carousel indicators={false} activeIndex={display} controls={false}>
                  <Carousel.Item>
                    <Carousel indicators={false} activeIndex={index} controls={false}>
                      <Carousel.Item>
                        <img className="d-block product_carousel_img m-auto" src={`data:image/png;base64,${face}`} alt="Front preview of the model" />
                        <Carousel.Caption>
                          <h3>{nomenclature?.simple}</h3>
                          <p>Plage de fréquences 1024 - 3542 Hz</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img className="d-block product_carousel_img m-auto" src={`data:image/png;base64,${side}`} alt="Side preview of the model" />
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
                    <div className="carousel-indicators">
                      <img onClick={() => setIndex(0)} className="d-block product_thumbnail m-2"  src={`data:image/png;base64,${face}`} alt="First slide thumbnail" />
                      <img onClick={() => setIndex(1)} className="d-block product_thumbnail m-2"  src={`data:image/png;base64,${side}`} alt="Second slide thumbnail" />
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
