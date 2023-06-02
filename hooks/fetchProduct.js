import { useQuery } from "react-query";
import { CategoryFetchById, attributesAllFetch, productFetchById, variantFetchByParentId } from "../components/dolibarrApi/fetch";
import { useValues } from "./useValues";

export const fetchProduct = (variantId, defaultProductId, childCatId) => {
  //fetching at start
  const { data: variantAttributes, isSuccess: variantsAttributesSucceed } = useQuery(["variants", { defaultProductId: defaultProductId }], () => variantFetchByParentId(defaultProductId), {
    select: (data) => data.find((v) => v.fk_product_child === variantId).attributes,
    staleTime: Infinity,
    enabled: defaultProductId !== undefined && defaultProductId?.length !== 0,
  });
  const { data: noVariant, isSuccess: noVariantSucceed } = useQuery(["noVariant", { id: variantId, onlyId: false }], () => productFetchById(variantId), { staleTime: Infinity, enabled: !!defaultProductId?.length == 0 });
  const { data: allAttributes, isSuccess: allAttributesSucceed } = useQuery(["allAttributes"], () => attributesAllFetch(), { staleTime: Infinity });
  const { data: defaultProduct, isSuccess: defaultProductSucceed } = useQuery(["defaultProduct", { defaultProductId: defaultProductId, onlyId: false }], () => productFetchById(defaultProductId), { staleTime: Infinity, enabled: defaultProductId !== undefined && defaultProductId?.length !== 0 });
  const { data: category, isSuccess: categorySucceed } = useQuery(["category", { childCatId: childCatId }], () => CategoryFetchById(childCatId), { staleTime: Infinity, enabled: !!childCatId });

  const { data: allValues, isSuccess: allValuesSucceed } = useValues(variantAttributes);

  const isAllSucess = variantsAttributesSucceed && allAttributesSucceed && defaultProductSucceed && categorySucceed && allValuesSucceed;

  return { noVariant, allAttributes, defaultProduct, category, variantAttributes, isAllSucess, allValues };
};
