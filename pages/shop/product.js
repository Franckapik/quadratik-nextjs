import { queryTypes, useQueryState } from "next-usequerystate";
import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { LayoutHome } from "../../components/LayoutHome";
import { variantPost } from "../../components/dolibarrApi/post";
import { ProductDetailsRight } from "../../components/product/ProductDetailsRight";
import { ProductViewLeft } from "../../components/product/ProductViewLeft";
import { useFetchProduct } from "../../hooks/useFetchProduct";
import { useComputeProduct } from "../../hooks/useComputeProduct";
import Link from "next/link";

const Product = () => {
  //Data
  const router = useRouter();
  const { allAttributes, defaultProduct, category, productAttributes, isAllSuccess, allValues, isVariant } = useFetchProduct(router.query.vid, router.query.dpid, router.query.childCat);
  const { product, isSuccess: productSuccess, changeAttributes } = useComputeProduct(allAttributes, productAttributes, allValues, category, defaultProduct, isAllSuccess, router.query.vid, isVariant);
  //Display
  const [display, setDisplay] = useQueryState("display", queryTypes.integer.withDefault(0));
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
      <LayoutHome viewedCategory={display} setDisplay={setDisplay} product={router.query.dpid != 0 ? ["modele", "performances", "spacialisation"] : ["modele"]} text_dark shop cart fixed />
      {productSuccess ? (
        <>
          <div className="s0_page_index  d-none d-md-flex">
            {product.description.parent_label || product.nomenclature.simple}
            <div className="trait"></div>Aperçu du modèle
          </div>
          {router.query.dpid != 0 ? (
            <Link href={{ pathname: "/quadralab?childCat=6&vid=146&dpid=8", query: { vid: router.query.vid, dpid: router.query.dpid, childCat: router.query.childCat } }}>
              <div className="product_custom d-none d-md-flex p-2">
                Modifier dans le quadralab <i className="fad fa-th pt-4 "></i>
              </div>
            </Link>
          ) : null}

          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Row className="layout_space ">
                <Col md={6} className=" d-none d-md-flex product_right_bg bg_creme"></Col>
                <Col md={6} className="product_left d-flex flex-column h-100">
                  <ProductViewLeft product={product} display={display} setDisplay={setDisplay} />
                </Col>
                <Col md={6} className="product_right bg_creme d-flex flex-column align-items-center">
                  <ProductDetailsRight product={product} display={display} changeAttributes={changeAttributes} />
                </Col>
              </Row>
            </Form>
          </FormProvider>
        </>
      ) : (
        <>
         
          <i className="fas fa-spinner fa-spin"></i> "Chargement du produit"
        </>
      )}
    </>
  );
};

export default Product;
