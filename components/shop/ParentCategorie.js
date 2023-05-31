import { useInView } from "@react-spring/web";
import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useProductStore } from "../../hooks/store";
import { listCategories, objectsInCategory, variantFetchByParentId } from "../dolibarrApi/fetch";
import { CardWrap } from "./CardWrap";
import { ChildCategorie } from "./ChildCategorie";

export const ParentCategorie = ({ firstCat, attributes, setViewedCategory }) => {
  const [ref, inView] = useInView();
  const {data : childCategories, isSuccess : ChildCategoriesSucceed} = useQuery(['childCategories', {parentId : firstCat.id}], () => listCategories((cat) => cat.fk_parent == firstCat.id), {staleTime : 60_000} )
  const {data : defaultProductId, isSuccess : defaultProductIdSucceed} = useQuery(['defaultProductId', {parentId : firstCat.id}], () => objectsInCategory(firstCat.id, true), {staleTime : 60_000} )
  const {data : variants, isSuccess : VariantsSucceed} = useQuery(['variants', {defaultProductId : defaultProductId}], () => variantFetchByParentId(defaultProductId), {staleTime : 60_000, enabled : defaultProductId !== undefined && defaultProductId?.length !== 0})
  
  useEffect(() => {
    if (inView) {
      setViewedCategory(firstCat.id);
      useProductStore.setState({ tag: firstCat.id });
    }
  }, [inView]);

  return (
    <>
      <CardWrap categorie>
        <div className="shop_categorie text-dark">
          <Row className="shop_categorie_logo justify-content-center">
            <img src="/logo/logo.svg" alt="Image du logo Quadratik dans la boutique" />
          </Row>
          <p className="ft05 mt-5 text-center">{firstCat.label}</p>
          <div className="ft4 mt-5" dangerouslySetInnerHTML={{ __html: firstCat.description }}></div>
        </div>
      </CardWrap>

        {ChildCategoriesSucceed && defaultProductIdSucceed && childCategories.map((childCat,i) => {
        return <ChildCategorie key={"ChildCategory" + i} childCatId={childCat.id} childCatLabel={childCat.label} defaultProductId={defaultProductId} attributes={attributes} variants={variants} />;
      })} 
    </>
  );
};
