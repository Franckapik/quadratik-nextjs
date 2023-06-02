import { useEffect, useMemo, useState } from "react";
import { useDescription } from "./useDescription";
import { useDimensions } from "./useDimensions";
import { useNomenclature } from "./useNomenclature";
import { usePrice } from "./usePrice";
import { useValuesSelected } from "./useValuesSelected";

export const useComputeProduct = (allAttributes, variantAttributes, allValues, category, defaultProduct, isAllSucess, variantId) => {
  const [product, setProduct] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [attributes, setAttributes] = useState(false);

  const changeAttributes = (value, name) => {
    console.log("Changement id : " + name +" avec la valeur " + value[name]);
    setAttributes((previsousAttribute) => {
      let newAttributes = previsousAttribute;
      const i = newAttributes.findIndex((obj => obj.id == name));
      newAttributes[i].fk_prod_attr_val = value[name];
      console.log(newAttributes);
      return newAttributes;
    })

    setAttributes(false);
  } 
  

  useEffect(() => {
    setAttributes(variantAttributes) 
  }), [variantAttributes] 

  const valuesSelected = useValuesSelected(allAttributes, attributes ? attributes : variantAttributes, allValues, "ref", "v_id");
  const values3D = useValuesSelected(allAttributes, attributes ? attributes : variantAttributes, allValues, "ref", "v_3d");
  const valuesLabels = useValuesSelected(allAttributes, attributes ? attributes : variantAttributes, allValues, "ref", "v_label");
  const valuesFactor = useValuesSelected(allAttributes, attributes ? attributes : variantAttributes, allValues, "ref", "v_factor");
  const valuesOperator = useValuesSelected(allAttributes, attributes ? attributes : variantAttributes, allValues, "ref", "v_operator");
  const features = useValuesSelected(allAttributes, attributes ? attributes : variantAttributes, allValues, "id", "v_id");
  const description = useDescription(category, defaultProduct);
  const { price: price, basePrice: basePrice } = usePrice(defaultProduct, valuesFactor, valuesOperator);
  const dimensions = useDimensions(values3D);
  const nomenclature = useNomenclature(defaultProduct, valuesLabels, dimensions);

  useEffect(() => {
    //calculate
 

    console.log(attributes);

    if (isAllSucess) {
      setProduct((previousProduct) => ({
        ...previousProduct,
        attributes: attributes ? attributes : variantAttributes,
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
    } 
  }, [attributes]);



  return { product, isSuccess, changeAttributes };
};
