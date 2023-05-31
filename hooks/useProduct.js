import { useEffect, useState } from "react";
import { useValues } from "./useValues";
import { useValuesSelected } from "./useValuesSelected";
import { useVariant } from "./useVariant";
import { useQuery } from "react-query";
import { documentByFilename } from "../components/dolibarrApi/fetch";
import { usePrice } from "./usePrice";

export const useProduct = (variantId, defaultProductId, childCatId) => {
  const { data: variant, isSuccess: variantsSucceed } = useVariant(defaultProductId, variantId);
  const [product, setProduct] = useState(false);

  const { data: allValues, isSuccess: valuesSucceed } = useValues(product.attributes);

  const { data: valuesSelected } = useValuesSelected(product.attributes, product.values, "ref", "v_id");

  const { data: pictureOfVariant, isSuccess: pictureOfVariantSucceed } = useQuery(["pictureOfVariant", { variantId: variantId }], () => documentByFilename("Modeles/Miniature/" + "Woodik-710.png"), { staleTime: Infinity });

  const { price, basePrice } = usePrice(product.attributes, product.values, defaultProductId);

  useEffect(() => {
    if (variantsSucceed) {
      setProduct({ ...product, attributes: variant.attributes, variantId : variantId  });
    }
  }, [variantsSucceed]);

  useEffect(() => {
    if (defaultProductId) {
      setProduct({ ...product, defaultProductId: defaultProductId });
    }
  }, [defaultProductId]);

  useEffect(() => {
    if (valuesSucceed) {
      setProduct({ ...product, values: allValues });
    }
  }, [valuesSucceed]);

  useEffect(() => {
    if (valuesSelected) {
      setProduct({ ...product, valuesSelected: valuesSelected });
    }
  }, [valuesSelected]);

  useEffect(() => {
    if (pictureOfVariantSucceed) {
      setProduct({ ...product, image: pictureOfVariant });
    }
  }, [pictureOfVariantSucceed]);

  useEffect(() => {
    if (price && basePrice) {
      setProduct({ ...product, price: price, basePrice: basePrice });
    }
  }, [price, basePrice]);

  console.log(product);

  return { product: product, setProduct: setProduct };
};
