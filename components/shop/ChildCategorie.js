import React from "react";
import { useQuery } from "react-query";
import { objectsInCategory } from "../dolibarrApi/fetch";
import { CardProduct } from "./CardProduct";

export const ChildCategorie = ({ childCatId, defaultProductId, childCatLabel }) => {
  const { data: variantsIds, isSuccess: variantsIdsSucceed } = useQuery(["variantsIds", { childCatId: childCatId }], () => objectsInCategory(childCatId, true), { staleTime: Infinity });
  return (
    <>
     {variantsIdsSucceed &&
        variantsIds.map((vid, i) => {
          return <CardProduct key={"Variant" + i} variantId={vid} childCatLabel={childCatLabel} defaultProductId={defaultProductId} childCatId={childCatId} />;
        })} 
    </> 
  );
};
