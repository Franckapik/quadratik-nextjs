import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import { listCategories, objectsInCategory, variantFetchByParentId } from "../../components/dolibarrApi/fetch";
import { ProductNavBar } from "../../components/quadralab/ProductNavBar";
import { useAttributes } from "../../hooks/useAttributes";
import { CardProduct } from "../../components/shop/CardProduct";
import { useInView } from "@react-spring/web";
import { useProductStore } from "../../hooks/store";

const Shop_Modele = ({ childCat, firstCat, attributes }) => {
  const [defaultProduct, setDefaultProduct] = useState(false);
  const [variants, setVariants] = useState(false);
  const [listProducts, setListProducts] = useState(false);

  useEffect(() => {
    objectsInCategory(firstCat.id)
      .get()
      .then((response) => {
        setDefaultProduct(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [firstCat]);

  useEffect(() => {
    if (defaultProduct) {
      variantFetchByParentId(defaultProduct.id)
        .get()
        .then((response) => {
          setVariants(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [defaultProduct]);

  //get attributes from variants and make valueSelected object
  useEffect(() => {
    if (variants) {
      objectsInCategory(childCat.id)
        .get()
        .then((response) => {
          if (response.data.length) {
            const pwithAttributes = Object.values(response.data).map((a, i) => {
              const g = Object.values(variants).filter((val) => val.fk_product_child === a.id)[0];
              const valuesSelected = g.attributes.reduce((acc, cur) => {
                let a_ref = Object.values(attributes).filter((val) => val.a_id === cur.id)[0].a_ref;
                return { ...acc, [a_ref]: cur.fk_prod_attr_val };
              }, {});
              return { ...a, valuesSelected: { ...valuesSelected } };
            });
            setListProducts(pwithAttributes);
          }
        })
        .catch((error) => {
          console.log(error);
          /*  setError(error); */ //waiting for work on absorbeurs
        });
    }
  }, [childCat, variants]);

  return (
    <>
      {" "}
      {listProducts &&
        listProducts.map((variant, i) => {
          return <CardProduct product={variant} childCat={childCat} attributes={attributes} />;
        })}
    </>
  );
};

const ParentCategorie = ({ firstCat, childCategories, attributes, setViewedCategory }) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setViewedCategory(firstCat.id);
      useProductStore.setState({tag : firstCat.id})
    }
  }, [inView]);

  return (
    <>
      <Col ref={ref} id={firstCat.id} className="shop_card  m-2 d-flex flex-column justify-content-center align-items-center border_creme_light">
        <div className="bg_creme_light shop_categorie text-dark">
          <img src="/logo/logo.svg" alt="Image du logo Quadratik dans la boutique" className="d-flex mt-4 mx-auto" />
          {firstCat.label}
        </div>
      </Col>
      <>
        {childCategories
          .filter((cat) => cat.fk_parent == firstCat.id)
          .map((childCat, childIndex) => {
            return <Shop_Modele firstCat={firstCat} childCat={childCat} attributes={attributes} />;
          })}
      </>
    </>
  );
};

const Product = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();

  const [categories, setCategories] = useState([]);
  const parentCategories = categories.filter((cat) => cat.fk_parent == 0);
  const childCategories = categories.filter((cat) => cat.fk_parent !== 0);
  const [viewedCategory, setViewedCategory] = useState(1);

  //get all categories
  useEffect(() => {
    listCategories()
      .get()
      .then((response) => {
        function compare(a, b) {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        }

        setCategories(response.data.sort(compare));
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

  return (
    <Layout onePage header cart sticky>
      <div className="s0_page_index position-fixed">
        {parentCategories.filter((cat) => cat.id == viewedCategory)[0]?.label}
        <div className="trait"></div>Boutique
      </div>
      <Row className="section">
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
      </Row>
    </Layout>
  );
};

export default Product;
