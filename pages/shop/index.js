import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { attributesAllFetch, attributesFetchById, listCategories } from "../../components/dolibarrApi/fetch";
import { useProductStore } from "../../hooks/store";
import { FirstCategory } from "../../components/shop/FirstCategory";
import { ParentProduct } from "../../components/shop/ParentProduct";
import { ShopNavBar } from "../../components/shop/ShopNavBar";

const Product = () => {
  //Data
  const [attributes, setAttributes] = useState(false);

  const [categories, setCategories] = useState([]);
  const [viewedCategory, setViewedCategory] = useState(0);

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
      <Row className="show_row_tag">
        <Col md={1}>
          <div className="shop_page_vertical_title">Boutique - {viewedCategory}</div>
        </Col>
        <Col md={3} className="d-flex flex-column p-0 justify-content-start align-items-start h-100 text_dark">
          <Row className="ft1 w-100 h-100">
            <Col md={3} className=" shop_fixed_col d-flex flex-column justify-content-start align-items-center bg_creme p-5  fixed-top">
              <img src="/logo/logo.svg" alt="Image du logo Quadratik dans la boutique" /> <div className="text-nowrap text-uppercase shop_header_quadratik_title ft2 pt-3">Quadratik</div>
              <ParentProduct categories={categories} viewedCategory={viewedCategory}></ParentProduct>
            </Col>
          </Row>
        </Col>
        <Col md={8} className="d-flex flex-column justify-content-evenly h-100 ps-5">
          <ShopNavBar categories={categories} />
          {categories
            .filter((cat) => cat.fk_parent == 0)
            .map((firstCat, i) => (
              <FirstCategory categories={categories} firstCat={firstCat} attributes={attributes} setViewedCategory={setViewedCategory} />
            ))}
        </Col>
      </Row>
    </Row>
  );
};

export default Product;
