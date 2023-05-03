import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { attributesAllFetch, attributesFetchById, listCategories } from "../../components/dolibarrApi/fetch";
import { useProductStore } from "../../hooks/store";
import { FirstCategory } from "../../components/shop/FirstCategory";
import { ParentProduct } from "../../components/shop/ParentProduct";
import { ShopNavBar } from "../../components/shop/ShopNavBar";
import { useAttributes } from "../../hooks/useAttributes";
import { Layout } from "../../components/Layout";

const Product = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();

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


  return (
    <Layout onePage header>
    <Row className="section">
      <Row className="show_row_tag">
      <div className="shop_page_vertical_title">Boutique - {categories.filter(cat => cat.id === viewedCategory)[0]?.label}</div>
        <Col md={3} className="d-flex flex-column p-0 justify-content-start align-items-start h-100 text_dark">
          <Row className="ft1 w-100 h-100">
            <Col md={3} className=" shop_fixed_col d-flex flex-column justify-content-start align-items-center bg_creme p-5  fixed-top">
              <img src="/logo/logo.svg" alt="Image du logo Quadratik dans la boutique" /> <div className="text-nowrap text-uppercase shop_header_quadratik_title ft2 pt-3">Quadratik</div>
              <ParentProduct categories={categories} viewedCategory={viewedCategory}></ParentProduct>
            </Col>
          </Row>
        </Col>
        <Col md={8} className="d-flex flex-column justify-content-evenly h-100 ps-5">
{/*           <ShopNavBar categories={categories} />
 */}          {categories
            .filter((cat) => cat.fk_parent == 0)
            .map((firstCat, i) => (
              <FirstCategory categories={categories} firstCat={firstCat} attributes={attributes} setViewedCategory={setViewedCategory} />
            ))}
        </Col>
      </Row>
    </Row>
    </Layout>
  );
};

export default Product;
