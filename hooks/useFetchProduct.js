import { useQuery } from "react-query";
import { CategoryFetchById, attributesAllFetch, productFetchById, variantFetchByParentId } from "../components/dolibarrApi/fetch";
import { useValues } from "./useValues";

export const useFetchProduct = (variantId, defaultProductId, childCatId) => {
  if (defaultProductId.length === 0) {
    // is not a variant

    const { data: hasNoDefaultProduct, isSuccess: noVariantSucceed } = useQuery(["noVariant", { id: variantId, onlyId: false }], () => productFetchById(variantId), { staleTime: Infinity, enabled: !!defaultProductId?.length == 0 });
    console.log(hasNoDefaultProduct);
    return { allAttributes: {}, defaultProduct: [], category: {}, variantAttributes: {}, isAllSuccess: true, allValues: {}, isVariant: false };
  } else {
    // is a variant

    const { data: variantAttributes, isSuccess: variantsAttributesSucceed } = useQuery(["variants", { defaultProductId: defaultProductId }], () => variantFetchByParentId(defaultProductId), {
      select: (data) => data.find((v) => v.fk_product_child === variantId).attributes,
      staleTime: Infinity,
      enabled: typeof defaultProductId !== "undefined" && defaultProductId?.length !== 0,
    });

    const { data: allAttributes, isSuccess: allAttributesSucceed } = useQuery(["allAttributes"], () => attributesAllFetch(), { staleTime: Infinity });
    const { data: defaultProduct, isSuccess: defaultProductSucceed } = useQuery(["defaultProduct", { defaultProductId: defaultProductId, onlyId: false }], () => productFetchById(defaultProductId), { staleTime: Infinity, enabled: defaultProductId !== undefined && defaultProductId?.length !== 0 });
    const { data: category, isSuccess: categorySucceed } = useQuery(["category", { childCatId: childCatId }], () => CategoryFetchById(childCatId), { staleTime: Infinity, enabled: !!childCatId });

    const { data: allValues, isSuccess: allValuesSucceed } = useValues(variantAttributes);

    const isAllSuccess = variantsAttributesSucceed && allAttributesSucceed && categorySucceed && allValuesSucceed;

    return { allAttributes, defaultProduct, category, variantAttributes, isAllSuccess, allValues, isVariant: true };
  }
};
