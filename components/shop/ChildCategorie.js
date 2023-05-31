import React, { useEffect, useState } from "react";
import { CardProduct } from "./CardProduct";
import { useFetchProduct } from "../../hooks/useFetchProduct";
import { useFetchDefaultProduct } from "../../hooks/useFetchDefaultProduct";
import { useQuery } from "react-query";
import { objectsInCategory } from "../dolibarrApi/fetch";

/* export const ChildCategorie = ({ childCat, attributes, variants }) => {
  const [listProducts, setListProducts] = useState(false);
  const childProduct = useFetchProduct(childCat);
  console.log(childProduct);
  const defaultProduct = useFetchDefaultProduct(childCat.fk_parent);

  const addAttributes = (variants, attributes, variantId) => {
    const variant = Object.values(variants).filter((val) => val.fk_product_child === variantId)[0];
    if (variant !== undefined) {
      const valuesSelected = variant.attributes.reduce((acc, cur) => {
        let a_ref = Object.values(attributes).filter((val) => val.a_id === cur.id)[0].a_ref;
        return { ...acc, [a_ref]: cur.fk_prod_attr_val };
      }, {});
      return { ...variant, valuesSelected: { ...valuesSelected } };
    }
  };


  useEffect(() => {
    if (childProduct?.length && variants) {
      const variantsWithAttributes = childProduct.map((variant) => addAttributes(variants, attributes, variant));
      setListProducts(variantsWithAttributes);
    }
  }, [childProduct, variants]);

  return (
    <>
      {listProducts &&
        listProducts.map((variant, i) => {
          return <CardProduct key={"Variant" + i} defaultProduct={defaultProduct} variant={variant} childCat={childCat} attributes={attributes} />;
        })}
    </>
  );
};
 */

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
