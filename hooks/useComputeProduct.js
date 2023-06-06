import { useEffect, useState } from "react";
import { useDescription } from "./useDescription";
import { useDimensions } from "./useDimensions";
import { useNomenclature } from "./useNomenclature";
import { usePrice } from "./usePrice";
import { useValuesSelected } from "./useValuesSelected";

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

  const valuesSelected = useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_id");
  const values3D = useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_3d");
  const valuesLabels = useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_label");
  const valuesFactor = useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_factor");
  const valuesOperator = useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "ref", "v_operator");
  const features = useValuesSelected(allAttributes, attributes ? attributes : productAttributes, allValues, "id", "v_id");
  const description = useDescription(category, defaultProduct || productAttributes);
  const { price: price, basePrice: basePrice } = usePrice(defaultProduct, valuesFactor, valuesOperator);
  const dimensions = useDimensions(values3D);
  const nomenclature = useNomenclature(defaultProduct, valuesLabels, dimensions);

  useEffect(() => {
    //calculate

    if (isAllSuccess && isVariant === true) {
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
      }));
      setSuccess(true);
    } else if (isAllSuccess && isVariant === false) {
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
  }, [attributes, isAllSuccess]);

  return { product, isSuccess, changeAttributes };
};
