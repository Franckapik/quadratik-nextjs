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

export const useProduct = (variantId, defaultProductId, childCatId, { miniature }) => {
  //on first render

  const [product, setProduct] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

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
  const isAllSucess = variantsAttributesSucceed && allAttributesSucceed && defaultProductSucceed && categorySucceed && allValuesSucceed && pictureSucceed;

  useEffect(() => {
    console.log(isAllSucess);
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
        variantId: variantId
      }));
      setSuccess(true);
    }
  }, [isAllSucess]);

  console.log(product);

  /*   const countRefresh = useRef(0);
  countRefresh.current = countRefresh.current + 1;
  console.log("useProduct : " + countRefresh.current); */

  /*   useEffect(() => {
    if (variantsAttributesSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, attributes: variantAttributes }));
    }
  }, [variantsAttributesSucceed]);

  useEffect(() => {
    if (variantId) {
      setProduct((prevProduct) => ({ ...prevProduct, variantId: variantId }));
    }
  }, [variantId]);

  useEffect(() => {
    if (noVariantSucceed) {
      setProduct({
        prices: { price: Math.round(noVariant.price), basePrice: null },
        defaultProductId: noVariant.id,
        attributes: null,
        values: null,
        valuesSelected: null,
        nomenclature: { simple: noVariant.label, structurel: noVariant.ref },
      });
    }
  }, [noVariantSucceed]);

  useEffect(() => {
    if (defaultProductId?.length) {
      setProduct((prevProduct) => ({ ...prevProduct, defaultProductId: defaultProductId }));
    } else {
      setProduct((prevProduct) => ({ ...prevProduct, defaultProductId: variantId }));
    }
  }, [defaultProductId]);

  useEffect(() => {
    if (allValuesSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, values: allValues }));
    }
  }, [allValuesSucceed]);

  useEffect(() => {
    if (allAttributesSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, allAttributes: allAttributes }));
    }
  }, [allAttributesSucceed]);

  useEffect(() => {
    if (isAllSucess) {
      setProduct((prevProduct) => ({ ...prevProduct, valuesSelected: valuesSelected }));
    }
  }, [isAllSucess]);

 useEffect(() => {
    if (isAllSucess) {
      setProduct((prevProduct) => ({ ...prevProduct, features: features }));
    }
  }, [isAllSucess]);

   useEffect(() => {
    if (isAllSucess) {
      setProduct((prevProduct) => ({ ...prevProduct, prices: { price: price, basePrice: basePrice } }));
    }
  }, [isAllSucess]);

   useEffect(() => {
    if (isAllSucess) {
      setProduct((prevProduct) => ({ ...prevProduct, dimensions: dimensions }));
    }
  }, [isAllSucess,values3D ]);

  useEffect(() => {
    if (isAllSucess) {
      setProduct((prevProduct) => ({ ...prevProduct, nomenclature: nomenclature }));
    }
  }, [isAllSucess, dimensions ]); 

  useEffect(() => {
    if (isAllSucess) {
      setProduct((prevProduct) => ({ ...prevProduct, description: {
        parent_label : defaultProduct.label,
        parent_description : defaultProduct.description,
        date_creation : defaultProduct.date_creation,
        date_modification : defaultProduct.date_modification,
        attributes_options : defaultProduct.note_private,
        category_label : category.label,
        category_desc : category.description,
        category_id : category.id,
        category_entity : category.entity,
        category_parent : category.fk_parent
    }})); 
    }
  }, [isAllSucess]);

  useEffect(() => {
    if (pictureSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, image: { facePicture: facePicture, sidePicture: sidePicture } }));
    }
  }, [isAllSucess]);

 useEffect(() => {
    if (product && "nomenclature" in product && "prices" in product && "valuesSelected" in product && "values" in product && "defaultProductId" in product && "description" in product) {
      setSuccess(true);
    }
  }, [product]); */

  return { product: product, isSuccess: isSuccess };
};
