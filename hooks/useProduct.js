import { useEffect, useState } from "react";
import { useValues } from "./useValues";
import { useValuesSelected } from "./useValuesSelected";
import { useVariant } from "./useVariant";
import { useQuery } from "react-query";
import { documentByFilename } from "../components/dolibarrApi/fetch";
import { usePrice } from "./usePrice";
import { useNomenclature } from "./useNomenclature";
import { usePicture } from "./usePicture";

export const useProduct = (variantId, defaultProductId, childCatId) => {
  const { data: variant, isSuccess: variantsSucceed } = useVariant(defaultProductId, variantId);

  const [product, setProduct] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const { data: allValues, isSuccess: valuesSucceed } = useValues(product.attributes);

  const { data: valuesSelected } = useValuesSelected(product.attributes, product.values, "ref", "v_id");

  const { price, basePrice } = usePrice(product.attributes, product.values, defaultProductId);

  const { nomenclature } = useNomenclature(product.attributes, product.values, defaultProductId, childCatId);

  const { facePicture: facePicture, sidePicture: sidePicture, isSuccess: pictureSucceed } = usePicture(product.nomenclature, true); //true for miniatures


  useEffect(() => {
    if (variantsSucceed) {
      setProduct({ ...product, attributes: variant.attributes, variantId: variantId });
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
    if (pictureSucceed) {
      setProduct({ ...product, image: {facePicture : facePicture, sidePicture : sidePicture} });
    }
  }, [pictureSucceed]);

  useEffect(() => {
    if (price && basePrice) {
      setProduct({ ...product, price: price, basePrice: basePrice });
    }
  }, [price, basePrice]);

  useEffect(() => {
    if (nomenclature) {
      setProduct({ ...product, nomenclature: nomenclature });
    }
  }, [nomenclature]);

  useEffect(() => {
    if (Object.keys(product).length > 6 ) {
      setSuccess(true);
    }
  }, [product]);

  return { product: product, isSuccess: isSuccess };
};
