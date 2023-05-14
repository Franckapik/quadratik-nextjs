import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { LayoutHome } from "../../components/LayoutHome";
import { useAttributes } from "../../hooks/useAttributes";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { ParentCategorie } from "../../components/shop/ParentCategorie";

const Shop = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();

  const parentCategories = useFetchCategories((cat) => cat.fk_parent == 0).map((cat) => ({ ...cat, ["label"]: cat.label.substring(5) }));
  const [viewedCategory, setViewedCategory] = useState(1);

  return (
    <>
      <LayoutHome header cart home dark categories={parentCategories} viewedCategory={viewedCategory} />
      <div className="s0_page_index d-none d-md-flex position-fixed">
        {parentCategories.filter((cat) => cat.id == viewedCategory)[0]?.label}
        <div className="trait"></div>Boutique
      </div>{" "}
      <Row className="section shop_main_row ">
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
