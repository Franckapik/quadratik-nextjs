import { queryTypes, useQueryState } from "next-usequerystate";
import { useRouter } from "next/router";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
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
      <LayoutHome viewedCategory={display} setDisplay={setDisplay} product={["modele", "performances", "spacialisation"]} text_dark shop cart fixed />
      {productSuccess ? (
        <>
          <div className="s0_page_index  d-none d-md-flex">
            {product.description.parent_label}
            <div className="trait"></div>Aperçu du modèle
          </div>
          <Link href={{ pathname: "/quadralab", query: { childCat: router.query.childCat, vid: router.query.vid, dpid: router.query.dpid } }}>
            <div className="product_custom d-none d-md-flex p-2">
              Modifier dans le quadralab <i className="fad fa-th pt-4 "></i>
            </div>
          </Link>
          <Row className="layout_space">
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Col md={6} className="product_left flex-column">
                  <ProductViewLeft product={product} display={display} />
                </Col>
                <Col md={6} className="product_right bg_creme layout_space">
                  <ProductDetailsRight product={product} display={display} changeAttributes={changeAttributes} />
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
