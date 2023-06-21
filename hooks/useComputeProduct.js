import { useEffect, useMemo, useState } from "react";
import { useDescription } from "./useDescription";
import { useDimensions } from "./useDimensions";
import { useNomenclature } from "./useNomenclature";
import { usePrice } from "./usePrice";
import { useValuesSelected } from "./useValuesSelected";
import { useFrequencies } from "./useFrequencies";

export const useComputeProduct = (allAttributes, productAttributes, allValues, category, defaultProduct, isAllSuccess, variantId, isVariant) => {
  const [product, setProduct] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [attributes, setAttributes] = useState(false);

  const changeAttributes = (value, name) => {
    setAttributes((previousAttributes) => {
      let newAttributes = previousAttributes;
      const i = newAttributes.findIndex((obj) => obj.id == name);
      if (newAttributes[i] !== undefined) {
        newAttributes[i].fk_prod_attr_val = value[name];
      }
      return newAttributes;
    });

    setAttributes(false); //magical cmd to refresh component
  };

  useEffect(() => {
    if (productAttributes !== undefined) {
      setAttributes(productAttributes);
    }
  }),
    [productAttributes];

  const valuesSelected = useMemo(() => useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_id"));
  const values3D = useMemo(() => useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_3d"));
  const valuesLabels = useMemo(() => useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_label"));
  const valuesFactor = useMemo(() => useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_factor"));
  const valuesOperator = useMemo(() => useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_operator"));
  const features = useMemo(() => useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "id", "v_id"));
  const description = useMemo(() => useDescription(category, defaultProduct || productAttributes));
  const { price: price, basePrice: basePrice } = useMemo(() => usePrice(defaultProduct, valuesFactor, valuesOperator));
  const dimensions = useMemo(() => useDimensions(values3D));
  const nomenclature = useMemo(() => useNomenclature(defaultProduct, valuesLabels, dimensions));
  const {frequencies : frequencies, isSuccess : freqSucceed} = useFrequencies(nomenclature, dimensions);
console.log(freqSucceed);
  useEffect(() => {
    //calculate
    if (isAllSuccess && isVariant === true) {
      //variant
      setProduct((previousProduct) => ({
        ...previousProduct,
        attributes: attributes ? attributes : productAttributes,
        allAttributes: allAttributes,
        description: description,
        dimensions: dimensions,
        nomenclature: nomenclature,
        prices: { price: price, basePrice: basePrice },
        features: features,
        valuesSelected: valuesSelected,
        values: allValues,
        variantId: variantId,
        frequencies: frequencies,
      }));
      setSuccess(true);
    } else if (isAllSuccess && isVariant === false) {
      //non-variant
      setProduct((previousProduct) => ({
        ...previousProduct,
        attributes: {},
        allAttributes: {},
        description: description,
        dimensions: {},
        nomenclature: { simple: productAttributes.label, structurel: productAttributes.ref },
        prices: { price: Math.round(productAttributes.price), basePrice: null },
        features: {},
        valuesSelected: {},
        values: {},
        variantId: {},
      }));
      setSuccess(true);
    }
  }, [attributes, isAllSuccess, frequencies]);

  return { product, isSuccess: isSuccess, changeAttributes };
};
