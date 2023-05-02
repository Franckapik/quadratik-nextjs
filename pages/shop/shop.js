import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import { attributesAllFetch, attributesFetchById, documentByProductId, listCategories, objectsInCategory, variantFetchByParentId } from "../../components/dolibarrApi/fetch";
import { ProductHud } from "../../components/product/ProductHud";
import { PerformanceCharts } from "../../components/product/PerformanceCharts";
import { ProductNavBar } from "../../components/product/ProductNavBar";
import ProductOptions from "../../components/product/ProductOptions";
import { useProductStore } from "../../hooks/store";
import { useNomenclature } from "../../hooks/useNomenclature";
import Link from "next/link";

const ShopNavBar = ({ categories }) => {
  return (
    <Row className="shop_header_row zup dark_bg ">
      <Col md={1} className=""></Col>
      <Col md={3} className="justify-content-start d-flex flex-column p-0 m-0 ">
        <Row className="ft05 h-100">
          <Col md={10} className="bg_creme d-flex flex-column justify-content-center align-items-center ">
            <img src="/logo/logo.svg" alt="Image du logo Quadratik dans la boutique" /> <div className="text-nowrap text-uppercase shop_header_quadratik_title ft2 pt-3">Quadratik</div>
          </Col>
          <Col md={2} className=""></Col>
        </Row>
      </Col>
      <Col md={8} className="">
        <Row className="d-md-flex justify-content-end text-uppercase m-0 p-0 ft2 h-100 align-items-center ">
          <Col md={8}>
            <Breadcrumb className="ft4 m-0 shop_breadcrumb">
              {categories
                .filter((cat) => cat.fk_parent == 0)
                .map((a, i) => (
                  <Breadcrumb.Item href="#" /* active */>{a.label}</Breadcrumb.Item>
                ))}
            </Breadcrumb>
          </Col>
          <Col md={2}>Accueil</Col>
          <Col md={2}>Contact</Col>
        </Row>
      </Col>
    </Row>
  );
};

const DefaultProduct = ({ tagId }) => {
  const [defaultProduct, setDefaultProduct] = useState(false);
  const [document, setDocument] = useState(false);

  useEffect(() => {
    objectsInCategory(tagId)
      .get()
      .then((response) => {
        setDefaultProduct(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tagId]);

  useEffect(() => {
    if (defaultProduct?.id) {
      documentByProductId(defaultProduct.id)
        .get()
        .then((response) => {
          setDocument(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [defaultProduct]);

  return (
    <>
      {defaultProduct ? (
        <Col className=" d-flex flex-column w-100 justify-content-evenly align-item-center">
          <Row className="shop_default_row">{document.ecmfiles_infos ? <img src={"http://shop.quadratik.fr/document.php?hashp=" + document.ecmfiles_infos[0].share} /> : "pas d'image"}</Row>
          <Row className="text-end m-2 ft2 ">
            <span> La référence : {defaultProduct.ref}</span>
          </Row>
        </Col>
      ) : (
        "image de remplacement"
      )}
    </>
  );
};

const FirstCategory = ({ categories, firstCat, attributes }) => {
  const [defaultProduct, setDefaultProduct] = useState(false);
  const [variants, setVariants] = useState(false);

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

  return (
    <>
      {firstCat.label + firstCat.id}

      {categories
        .filter((cat) => cat.fk_parent == firstCat.id)
        .map((SubCat, i) => {
          return (
            <>
              <SubCategory subcategory={SubCat} variants={variants} attributes={attributes} />
            </>
          );
        })}
    </>
  );
};

const SubCategory = ({ subcategory, variants, attributes }) => {
  const [listProducts, setListProducts] = useState(false);

  //get attributes from variants and make valueSelected object
  useEffect(() => {
    if (variants.length) {
      objectsInCategory(subcategory.id)
        .get()
        .then((response) => {
          if (response.data.length) {
            const pwithAttributes = Object.values(response.data).map((a, i) => {
              const g = Object.values(variants).filter((val) => val.fk_product_child === a.id)[0];
              const valuesSelected = g.attributes.reduce((acc, cur) => {
                let a_ref = Object.values(attributes).filter((val) => val.a_id === cur.id)[0].a_ref;
                return { ...acc, [a_ref]: cur.fk_prod_attr_val };
              }, {});
              return { ...a, ...g, valuesSelected: {...valuesSelected} };
            });
            setListProducts(pwithAttributes);
          }
        })
        .catch((error) => {
          console.log(error);
          /*  setError(error); */ //waiting for work on absorbeurs
        });
    }
  }, [subcategory, variants]);

  return (
    <Row className="pb-5 bg_darker shop_subcategory ">
      <Row className="ft05 justify-content-start mb-4 ps-4 pt-4 pb-4  ft2">{subcategory.label.split("-")[1]}</Row>
      <Row className="justify-content-center">{subcategory.description}</Row>
      <Row className="">
        {listProducts.length
          ? listProducts.map((a, i) => {
              return <CardProduct product={a} subcategory={subcategory} attributes={attributes}></CardProduct>;
            })
          : null}
      </Row>
    </Row>
  );
};

const CardProduct = ({ product, subcategory, attributes }) => {


  const nomenclature = useNomenclature(product.valuesSelected, subcategory.fk_parent, attributes)

  const [document, setDocument] = useState(false);
  useEffect(() => {
    if (product?.id) {
      documentByProductId(product.id)
        .get()
        .then((response) => {
          setDocument(response.data);
        })
        .catch((error) => {
          /* console.log(error); */
        });
    }
  }, [product]);

  return (
    <>
      {true ?  (
        <Col md={4} className="shop_card_col d-flex flex-column align-items-center justify-content-evenly">
          <Row className="p-3">{document?.ecmfiles_infos ? <img src={"http://shop.quadratik.fr/document.php?hashp=" + document?.ecmfiles_infos[0].share} /> : "pas d'image"}</Row>
          <Row className="text-center p-3 ft5 shop_card_price text_dark ">
   {/*          <span>{product.ref}</span> */}
          </Row>
          <Row className="text-center p-3 ft2 ">
          <Link href={{ pathname: '/shop/product', query: product.valuesSelected }}><span>{nomenclature.simple}</span></Link>
            
            <span>{Math.round(product.price)} €</span>
          </Row>
        </Col>
      ) : (
        "image de remplacement"
      )}
    </>
  );
};

const Product = () => {
  //Data
  const [attributes, setAttributes] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState({});
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(true);

  //Display
  const [display, setDisplay] = useState("model");
  const [error, setError] = useState(false);

  const [categories, setCategories] = useState([]);

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

  // get attributes (ex : Width) and then values (ex: 50cm)
  useEffect(() => {
    attributesAllFetch()
      .get()
      .then((response) => {
        const attributes = response.data;
        if (attributes.length) {
          Promise.all(
            attributes.map((a) =>
              attributesFetchById(a.id)
                .get()
                .then((response) => {
                  return response.data;
                })
                .catch((error) => {
                  return error;
                })
            )
          )
            .then((values) => {
              const filteredValues = values.filter((item) => item).flat(); //no undefined and same level
              const attributesAndValues = Object.entries(attributes).reduce((acc, [key, val] = item) => {
                const v = filteredValues.filter((a) => a.fk_product_attribute == val.id).sort((a, b) => a.id - b.id);
                let newV = {};
                if (v.length) {
                  newV = Object.entries(v).reduce((acc, [key, val] = item) => {
                    return {
                      ...acc,
                      [key]: {
                        v_id: val.id,
                        v_ref: val.ref,
                        v_3d: val.value?.split(",")[0],
                        v_label: val.value?.split(",")[1],
                        v_operator: val.value?.split(",")[3],
                        v_factor: val.value?.split(",")[2],
                      },
                    };
                  }, 0);
                }

                return {
                  ...acc,
                  [key]: {
                    a_id: val.id,
                    a_ref: val.ref,
                    a_position: val.position,
                    a_label: val.label,
                    values: newV,
                  },
                };
              }, 0);

              useProductStore.setState({ attributes: attributesAndValues }); //global state
              setAttributes(attributesAndValues);
              setFetching(false);
            })
            .catch((error) => {
              return error;
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

  return (
    <Row className="section">
      <ShopNavBar categories={categories} />
      <Row className="show_row_tag">
        <Col md={1}>
          <div className="shop_page_vertical_title">Boutique</div>
        </Col>
        <Col md={3} className="d-flex flex-column p-0 justify-content-start align-items-start h-100 text_dark">
          <Row className="ft1 w-100 h-100 ">
            <Col md={10} className="bg_creme shop_firstcategory">
              "Produit parent en state"
            </Col>
            <Col md={2} className=""></Col>
          </Row>
        </Col>
        <Col md={8} className="d-flex flex-column justify-content-evenly h-100 ps-5">
          sous-categroeies
          {categories
            .filter((cat) => cat.fk_parent == 0)
            .map((firstCat, i) => (
              <FirstCategory categories={categories} firstCat={firstCat} attributes={attributes} />
            ))}
        </Col>
      </Row>
      {/*  <Row className="d-flex ft4 shop_main_row ">
        {categories
          .filter((cat) => cat.fk_parent == 0)
          .map((firstCat, i) => (
            <Row className="show_row_tag">
              <Col md={1}> 
                <div className="shop_page_vertical_title">Boutique</div>
              </Col>
              <Col md={3} className="d-flex flex-column p-0 justify-content-start align-items-start h-100 text_dark">
                <Row className="ft1 w-100 h-100 ">
                  <Col md={10} className="bg_creme shop_firstcategory">
                    <Row className="p-2 bg_lighter">{">" + firstCat.label.split("-")[1]}</Row>
                    <DefaultProduct tagId={firstCat.id}></DefaultProduct>
                    <Row className="text-justify m-4 ft6 ">{firstCat.description}</Row>
                  </Col>
                  <Col md={2} className=""></Col>
                </Row>
              </Col>
              <Col md={8} className="d-flex flex-column justify-content-evenly h-100 ps-5">
                {categories
                  .filter((cat) => cat.fk_parent == firstCat.id)
                  .map((SubCat, i) => {
                    return (
                      <>
                        <SubCategory subcategory={SubCat} />
                      </>
                    );
                  })}
              </Col>
            </Row>
          ))}
      </Row> */}
    </Row>
  );
};

export default Product;
