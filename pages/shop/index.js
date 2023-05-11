import { useInView } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { LayoutHome } from "../../components/LayoutHome";
import { CardProduct } from "../../components/shop/CardProduct";
import { useProductStore } from "../../hooks/store";
import { useAttributes } from "../../hooks/useAttributes";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { useFetchProduct } from "../../hooks/useFetchProduct";
import { useFetchVariant } from "../../hooks/useFetchVariants";

const ChildCategorie = ({ childCat, attributes, variants }) => {
  const [listProducts, setListProducts] = useState(false);
  const childProduct = useFetchProduct(childCat);

  const addAttributes = (variants, attributes, variantId) => {
    const variant = Object.values(variants).filter((val) => val.fk_product_child === variantId)[0];
    if (variant !== undefined) {
      const valuesSelected = variant.attributes.reduce((acc, cur) => {
        let a_ref = Object.values(attributes).filter((val) => val.a_id === cur.id)[0].a_ref;
        return { ...acc, [a_ref]: cur.fk_prod_attr_val };
      }, {});
      return { ...variant, valuesSelected: { ...valuesSelected } };
    }
  };

  useEffect(() => {
    if (childProduct.length && variants) {
      const variantsWithAttributes = childProduct.map((variant) => addAttributes(variants, attributes, variant));
      setListProducts(variantsWithAttributes);
    }
  }, [childProduct, variants]);

  return (
    <>
      {listProducts &&
        listProducts.map((variant, i) => {
          return <CardProduct variant={variant} childCat={childCat} attributes={attributes} />;
        })}
    </>
  );
};

const ParentCategorie = ({ firstCat, attributes, setViewedCategory }) => {
  const [ref, inView] = useInView();
  const childCategories = useFetchCategories((cat) => cat.fk_parent == firstCat.id);
  const parentProduct = useFetchProduct(firstCat, 0);
  const variants = useFetchVariant(parentProduct);

  useEffect(() => {
    if (inView) {
      setViewedCategory(firstCat.id);
      useProductStore.setState({ tag: firstCat.id });
    }
  }, [inView]);

  return (
    <>
      <Col ref={ref} id={firstCat.id} className="shop_card  m-2 d-flex flex-column justify-content-center align-items-center border_creme_light">
        <div className="bg_creme_light shop_categorie text-dark p-5">
          <Row className="shop_categorie_logo">
            {" "}
            <img src="/logo/logo.svg" alt="Image du logo Quadratik dans la boutique" className="d-flex mt-4 mx-auto" />
          </Row>
          <p className="ft05 mt-5 text-center">{firstCat.label}</p>
          <div className="ft4 mt-5 text-justify" dangerouslySetInnerHTML={{ __html: firstCat.description }}></div>
        </div>
      </Col>
      <>
        {childCategories.map((childCat) => {
          return <ChildCategorie childCat={childCat} attributes={attributes} variants={variants} />;
        })}
      </>
    </>
  );
};

const Shop = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();

  const parentCategories = useFetchCategories((cat) => cat.fk_parent == 0).map((cat) => ({ ...cat, ["label"]: cat.label.substring(5) }));
  const [viewedCategory, setViewedCategory] = useState(1);

  return (
    <>
      <LayoutHome header cart home />
      <div className="s0_page_index d-none d-md-flex position-fixed">
        {parentCategories.filter((cat) => cat.id == viewedCategory)[0]?.label}
        <div className="trait"></div>Boutique
      </div>{" "}
      <Row className="section">
        <Col md={1}></Col>
        <Col>
          <Row>
            {parentCategories.map((firstCat) => {
              return <ParentCategorie firstCat={firstCat} attributes={attributes} setViewedCategory={setViewedCategory} />;
            })}
          </Row>
        </Col>
      </Row>
      {/*     
     
             <ProductNavBar categories={parentCategories} viewedCategory={viewedCategory} />
         
        <Row className="shop_main_row">
          <Col className="shop_card m-2 d-flex flex-column justify-content-center align-items-center border_creme_light text-dark">
            <img src="/shop/Anemone-7.png" />
            <span className="shop_product_title ft2 ">Anemone-710</span>
            <span className="shop_product_collection ft6 text-uppercase text-nowrap">Diffuseur 2D classiques</span>
          </Col>
          {parentCategories.map((firstCat, firstIndex) => {
            return <ParentCategorie firstCat={firstCat} childCategories={childCategories} attributes={attributes} setViewedCategory={setViewedCategory} />;
          })}
        </Row>
      */}
    </>
  );
};

export default Shop;
