import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CategoryFetchById, attributesAllFetch, productFetchById, variantFetchByParentId } from "../components/dolibarrApi/fetch";
import { useDescription } from "./useDescription";
import { useDimensions } from "./useDimensions";
import { useNomenclature } from "./useNomenclature";
import { usePicture } from "./usePicture";
import { usePrice } from "./usePrice";
import { useValues } from "./useValues";
import { useValuesSelected } from "./useValuesSelected";

export const useProduct = (variantId, variantAttributes, defaultProductId, childCatId, { miniature }) => {
  //on first render
console.log(variantAttributes);
  const [product, setProduct] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  //fetching at start
/*   const { data: variantAttributes, isSuccess: variantsAttributesSucceed } = useQuery(["variants", { defaultProductId: defaultProductId }], () => variantFetchByParentId(defaultProductId), {
    select: (data) => data.find((v) => v.fk_product_child === variantId).attributes,
    staleTime: Infinity,
    enabled: defaultProductId !== undefined && defaultProductId?.length !== 0,
  }); */
  const { data: noVariant, isSuccess: noVariantSucceed } = useQuery(["noVariant", { id: variantId, onlyId: false }], () => productFetchById(variantId), { staleTime: Infinity, enabled: !!defaultProductId?.length == 0 });
  const { data: allAttributes, isSuccess: allAttributesSucceed } = useQuery(["allAttributes"], () => attributesAllFetch(), { staleTime: Infinity });
  const { data: defaultProduct, isSuccess: defaultProductSucceed } = useQuery(["defaultProduct", { defaultProductId: defaultProductId, onlyId: false }], () => productFetchById(defaultProductId), { staleTime: Infinity, enabled: defaultProductId !== undefined && defaultProductId?.length !== 0 });
  const { data: category, isSuccess: categorySucceed } = useQuery(["category", { childCatId: childCatId }], () => CategoryFetchById(childCatId), { staleTime: Infinity, enabled: !!childCatId });

  //depending on product changes
  //fetching
  const { data: allValues, isSuccess: allValuesSucceed } = useValues(variantAttributes);

  //calculate
  const valuesSelected = useValuesSelected(allAttributes, variantAttributes, allValues, "ref", "v_id");
  const values3D = useValuesSelected(allAttributes, variantAttributes, allValues, "ref", "v_3d");
  const valuesLabels = useValuesSelected(allAttributes, variantAttributes, allValues, "ref", "v_label");
  const valuesFactor = useValuesSelected(allAttributes, variantAttributes, allValues, "ref", "v_factor");
  const valuesOperator = useValuesSelected(allAttributes, variantAttributes, allValues, "ref", "v_operator");
  const features = useValuesSelected(allAttributes, variantAttributes, allValues, "id", "v_id");
  const description = useDescription(category, defaultProduct);
  const { price, basePrice } = usePrice(defaultProduct, valuesFactor, valuesOperator);
  const dimensions = useDimensions(values3D);
  const nomenclature = useNomenclature(defaultProduct, valuesLabels, dimensions);

  //fetching again
  const { facePicture: facePicture, sidePicture: sidePicture, isSuccess: pictureSucceed } = usePicture(nomenclature, miniature);
  const isAllSucess = allAttributesSucceed && defaultProductSucceed && categorySucceed && allValuesSucceed && pictureSucceed;

  useEffect(() => {
    if (isAllSucess) {
      setProduct((previousProduct) => ({
        ...previousProduct,
        attributes: variantAttributes,
        allAttributes: allAttributes,
        description: description,
        dimensions : dimensions,
        nomenclature: nomenclature,
        prices: { price: price, basePrice: basePrice },
        features: features,
        valuesSelected: valuesSelected,
        values: allValues,
        variantId: variantId,
        image: { facePicture: facePicture, sidePicture: sidePicture }
      }));
      setSuccess(true);
    }
  }, [isAllSucess]);

console.log(product);

  return { product: product, isSuccess: isSuccess, setProduct };
};
