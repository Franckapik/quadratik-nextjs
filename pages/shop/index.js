import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { LayoutHome } from "../../components/LayoutHome";
import { useAttributes } from "../../hooks/useAttributes";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { ParentCategorie } from "../../components/shop/ParentCategorie";
import { CardWrap } from "../../components/shop/CardWrap";

const Shop = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();
  const parentCategories = useFetchCategories((cat) => cat.fk_parent == 0).map((cat) => ({ ...cat, ["label"]: cat.label.substring(5) }));
  const [viewedCategory, setViewedCategory] = useState(1);

  return (
    <>
      <LayoutHome header cart home dark categories={parentCategories} viewedCategory={viewedCategory} />
      <div className="s0_page_index d-none d-md-flex position-fixed text_dark">
        {parentCategories.filter((cat) => cat.id == viewedCategory)[0]?.label}
        <div className="trait"></div>Boutique
      </div>{" "}
      <Row className="layout_space bg_creme_light shop_main_row ">
        <CardWrap>
          <img src="/shop/Anemone-7.png" />
          <span className="shop_product_title ft2 ">Anemone-710</span>
          <span className="shop_product_collection ft6 text-uppercase text-nowrap">Diffuseur 2D classiques</span>
        </CardWrap>
        {parentCategories.map((firstCat, i) => {
          return <ParentCategorie key={"ParentCategory" + i} firstCat={firstCat} attributes={attributes} setViewedCategory={setViewedCategory} />;
        })}
      </Row>
    </>
  );
};

export default Shop;
