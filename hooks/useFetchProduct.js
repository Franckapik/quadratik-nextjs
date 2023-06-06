import { useQuery } from "react-query";
import { CategoryFetchById, attributesAllFetch, productFetchById, variantFetchByParentId } from "../components/dolibarrApi/fetch";
import { useValues } from "./useValues";

export const useFetchProduct = (variantId, defaultProductId, childCatId) => {

  console.log(defaultProductId);

  const { data: noVariantAttributes, isSuccess: noVariantSucceed } = useQuery(["noVariant", { id: variantId, onlyId: false }], () => productFetchById(variantId), { staleTime: Infinity,  enabled: defaultProductId != undefined });
  const { data: category, isSuccess: categorySucceed } = useQuery(["category", { childCatId: childCatId }], () => CategoryFetchById(childCatId), { staleTime: Infinity, enabled: !!childCatId });
  const { data: productAttributes, isSuccess: variantsAttributesSucceed } = useQuery(["variants", { defaultProductId: defaultProductId }], () => variantFetchByParentId(defaultProductId), {
    select: (data) => data.find((v) => v.fk_product_child === variantId).attributes,
    staleTime: Infinity,
    enabled: defaultProductId != 0 && defaultProductId != undefined,
  });

  const { data: allAttributes, isSuccess: allAttributesSucceed } = useQuery(["allAttributes"], () => attributesAllFetch(), { staleTime: Infinity });
  const { data: defaultProduct, isSuccess: defaultProductSucceed } = useQuery(["defaultProduct", { defaultProductId: defaultProductId, onlyId: false }], () => productFetchById(defaultProductId), { staleTime: Infinity, enabled: defaultProductId != undefined && defaultProductId != 0 });

  const { data: allValues, isSuccess: allValuesSucceed } = useValues(productAttributes);

  if (defaultProductId == 0) {
    // is not a variant
    const isAllSuccess = noVariantSucceed && categorySucceed;
console.log(isAllSuccess);

    return { allAttributes: null, defaultProduct: null, category: category, productAttributes: noVariantAttributes, isAllSuccess: isAllSuccess, allValues: null, isVariant: false };
  } else if (defaultProductId != undefined) {
    // is a variant

    const isAllSuccess = variantsAttributesSucceed && allAttributesSucceed && categorySucceed && allValuesSucceed && defaultProductSucceed;

    return { allAttributes, defaultProduct, category, productAttributes, isAllSuccess, allValues, isVariant: true };
  } else {
    return { allAttributes: null, defaultProduct: null, category: null, productAttributes: null, isAllSuccess: false, allValues: null, isVariant: null };

  }
};
