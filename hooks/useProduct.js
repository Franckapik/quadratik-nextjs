import { useEffect, useState } from "react";
import { useValues } from "./useValues";
import { useValuesSelected } from "./useValuesSelected";
import { useVariant } from "./useVariant";
import { useQuery } from "react-query";
import { documentByFilename, productFetchById } from "../components/dolibarrApi/fetch";
import { usePrice } from "./usePrice";
import { useNomenclature } from "./useNomenclature";
import { usePicture } from "./usePicture";

export const useProduct = (variantId, defaultProductId, childCatId) => {
  const { data: variant, isSuccess: variantsSucceed } = useVariant(defaultProductId, variantId);
  const { data: noVariant, isSuccess: noVariantSucceed } = useQuery(["noVariant", { id: variantId, onlyId: false }], () => productFetchById(variantId), { staleTime: Infinity, enabled: !!defaultProductId?.length == 0 });

  const [product, setProduct] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const { data: allValues, isSuccess: valuesSucceed } = useValues(product.attributes);

  const { data: valuesSelected } = useValuesSelected(product.attributes, product.values, "ref", "v_id");

  const { price, basePrice, isSuccess: priceSucceed } = usePrice(product.attributes, product.values, defaultProductId);

  const { data: nomenclature, isSuccess: nomenclatureSucceed } = useNomenclature(product.attributes, product.values, defaultProductId, childCatId);

  const { facePicture: facePicture, sidePicture: sidePicture, isSuccess: pictureSucceed } = usePicture(product.nomenclature, true); //true for miniatures

  useEffect(() => {
    if (variantsSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, attributes: variant.attributes, variantId: variantId }));
    }
  }, [variantsSucceed]);

  useEffect(() => {
    if (noVariantSucceed) {
      setProduct({
        prices: { price: Math.round(noVariant.price), basePrice: null },
        defaultProductId: noVariant.id,
        attributes : null,
        values : null,
        valuesSelected : null,
        nomenclature : {simple : noVariant.label, structurel : noVariant.ref },
      });
    }
  }, [noVariantSucceed]);

  useEffect(() => {
    if (defaultProductId.length) {
      setProduct((prevProduct) => ({ ...prevProduct, defaultProductId: defaultProductId }));
    } else {
      setProduct((prevProduct) => ({ ...prevProduct, defaultProductId: variantId }));
    }
  }, [defaultProductId]);

  useEffect(() => {
    if (valuesSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, values: allValues }));
    }
  }, [valuesSucceed]);

  useEffect(() => {
    if (valuesSelected) {
      setProduct((prevProduct) => ({ ...prevProduct, valuesSelected: valuesSelected }));
    }
  }, [valuesSelected]);

  useEffect(() => {
    if (priceSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, prices: { price: price, basePrice: basePrice } }));
    }
  }, [priceSucceed]);

  useEffect(() => {
    if (nomenclatureSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, nomenclature: nomenclature }));
    }
  }, [nomenclatureSucceed]);

  useEffect(() => {
    if (pictureSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, image: { facePicture: facePicture, sidePicture: sidePicture } }));
    }
  }, [pictureSucceed]);

  useEffect(() => {
    if (product && "nomenclature" in product && "prices" in product && "valuesSelected" in product && "values" in product && "defaultProductId" in product ) {
      setSuccess(true);
    }
  }, [product]);

  return { product: product, isSuccess: isSuccess };
};
