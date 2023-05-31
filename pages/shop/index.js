import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { LayoutHome } from "../../components/LayoutHome";
import { useAttributes } from "../../hooks/useAttributes";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { ParentCategorie } from "../../components/shop/ParentCategorie";
import { CardWrap } from "../../components/shop/CardWrap";
import { useQueries, useQuery } from "react-query";
import { attributesAllFetch, listCategories, valuesFetchByAttributesId } from "../../components/dolibarrApi/fetch";

const Shop = () => {
  //Data
   const [attributesHook, fetching] = useAttributes();
  const [viewedCategory, setViewedCategory] = useState(1);

  const {data : attributes} = useQuery(['attributes'], () => attributesAllFetch().get().then(response => response.data), {staleTime : 60_000} )
  const {data : parentCategories, isSuccess : ParentCategoriesSucceed} = useQuery(['parentCategories'], () => listCategories((cat) => cat.fk_parent == 0), {staleTime : 60_000} )
  const valuesQueries = useQueries(
   attributes?.map((a) => {
      return {
        queryKey: ['values', a.id],
        queryFn: () => valuesFetchByAttributesId(a.id),
      }
    }) ?? [],
  )
  return (
    <>
      <LayoutHome header cart home dark categories={parentCategories} viewedCategory={viewedCategory} />
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
