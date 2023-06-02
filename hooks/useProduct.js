import { fetchProduct } from "./fetchProduct";
import { useComputeProduct } from "./useComputeProduct";

export const useProduct = (variantId, defaultProductId, childCatId) => {
  //on first render

  const { allAttributes, defaultProduct, category, variantAttributes, isAllSucess, allValues } = fetchProduct(variantId, defaultProductId, childCatId);
  const { product, isSuccess } = useComputeProduct(allAttributes, variantAttributes, allValues, category, defaultProduct, isAllSucess, variantId);

  //depending on product changes
  //fetching
  return { product, isSuccess };
};
