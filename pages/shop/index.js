import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { LayoutHome } from "../../components/LayoutHome";
import { listCategories } from "../../components/dolibarrApi/fetch";
import { CardWrap } from "../../components/shop/CardWrap";
import { ParentCategorie } from "../../components/shop/ParentCategorie";

const Shop = () => {
  //Data
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
        {ParentCategoriesSucceed && parentCategories.map((firstCat, i) => {
          return <ParentCategorie key={"ParentCategory" + i} firstCat={firstCat} setViewedCategory={setViewedCategory} />;
        })}
      </Row>
    </>
  );
};

export default Shop;
