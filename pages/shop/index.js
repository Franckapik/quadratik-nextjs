import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { LayoutHome } from "../../components/LayoutHome";
import { listCategories } from "../../components/dolibarrApi/fetch";
import { CardWrap } from "../../components/shop/CardWrap";
import { ParentCategorie } from "../../components/shop/ParentCategorie";
import { useAttributes } from "../../hooks/useAttributes_old";

const Shop = () => {
  //Data
   const [attributesHook, fetching] = useAttributes();
  const [viewedCategory, setViewedCategory] = useState(1);

  const {data : parentCategories, isSuccess : ParentCategoriesSucceed} = useQuery(['parentCategories'], () => listCategories((cat) => cat.fk_parent == 0), {staleTime : Infinity} )

  return (
    <>
      <LayoutHome header cart home fixed dark categories={parentCategories} viewedCategory={viewedCategory} />
      <div className="s0_page_index d-none d-md-flex position-fixed text_dark">
        {ParentCategoriesSucceed && parentCategories.filter((cat) => cat.id == viewedCategory)[0]?.label}
        <div className="trait"></div>Boutique
      </div>{" "}
      <Row className="layout_space bg_creme_light shop_main_row ">
        <CardWrap>
          <img src="/shop/Anemone-7.png" />
          <span className="shop_product_title ft2 ">Anemone-710</span>
          <span className="shop_product_collection ft6 text-uppercase text-nowrap">Diffuseur 2D classiques</span>
        </CardWrap>
        {ParentCategoriesSucceed && parentCategories.map((firstCat, i) => {
          return <ParentCategorie key={"ParentCategory" + i} firstCat={firstCat} attributes={attributesHook} setViewedCategory={setViewedCategory} />;
        })}
      </Row>
    </>
  );
};

export default Shop;
