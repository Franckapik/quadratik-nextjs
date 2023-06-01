import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CategoryFetchById, productFetchById } from "../components/dolibarrApi/fetch";

export const useDescription = (defaultProductId, childCatId, variantId) => {
  const [description, setDescription] = useState(false);
  const { data: defaultProduct, isSuccess: defaultProductSucceed } = useQuery(["defaultProduct", { defaultProductId: defaultProductId?.length ? defaultProductId : [variantId], onlyId: false }], () => productFetchById([defaultProductId?.length ? defaultProductId : [variantId]]), { staleTime: Infinity});
  const { data: category, isSuccess: categorySucceed } = useQuery(["category", { childCatId: childCatId}], () => CategoryFetchById(childCatId), { staleTime: Infinity, enabled: !!childCatId });

  console.log(defaultProduct);

  useEffect(() => {
    if(defaultProductSucceed && categorySucceed) {
      setDescription({
        parent_label : defaultProduct.label,
        parent_description : defaultProduct.description,
        date_creation : defaultProduct.date_creation,
        date_modification : defaultProduct.date_modification,
        category_label : category.label,
        category_desc : category.description,
        category_id : category.id,
        category_entity : category.entity,
        category_parent : category.fk_parent
      })
    }
  }, [defaultProductSucceed, categorySucceed])

  return {data : description, isSuccess : description && categorySucceed && defaultProductSucceed };
};
