import { useInView } from "@react-spring/web";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { useFetchProduct } from "../../hooks/useFetchProduct";
import { useFetchVariant } from "../../hooks/useFetchVariants";
import { ChildCategorie } from "./ChildCategorie";
import { CardWrap } from "./CardWrap";
import { useQuery } from "react-query";
import { listCategories, objectsInCategory, variantFetchByParentId } from "../dolibarrApi/fetch";

export const ParentCategorie = ({ firstCat, attributes, setViewedCategory }) => {
  const [ref, inView] = useInView();
  const {data : childCategories, isSuccess : ChildCategoriesSucceed} = useQuery(['childCategories', {parentId : firstCat.id}], () => listCategories((cat) => cat.fk_parent == firstCat.id), {staleTime : 60_000} )
  const {data : parentProductId, isSuccess : ParentproductSucceed} = useQuery(['parentProductId', {parentId : firstCat.id}], () => objectsInCategory(firstCat.id, true), {staleTime : 60_000} )
  const {data : variants, isSuccess : VariantsSucceed} = useQuery(['variants', {parentProductId : parentProductId}], () => variantFetchByParentId(parentProductId), {staleTime : 60_000, enabled : parentProductId !== undefined} )

  
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

{/*        {ChildCategoriesSucceed && VariantsSucceed && childCategories.map((childCat,i) => {
        return <ChildCategorie key={"ChildCategory" + i} childCat={childCat} attributes={attributes} variants={variants} />;
      })} */}
    </>
  );
};
