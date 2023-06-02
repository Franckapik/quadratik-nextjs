import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { attributesAllFetch, productFetchById, variantFetchByParentId } from "../components/dolibarrApi/fetch";
import { useDescription } from "./useDescription";
import { useDimensions } from "./useDimensions";
import { useNomenclature } from "./useNomenclature";
import { usePicture } from "./usePicture";
import { usePrice } from "./usePrice";
import { useValues } from "./useValues";
import { useValuesSelected } from "./useValuesSelected";

export const useProduct = (variantId, defaultProductId, childCatId, { miniature }, reload) => {
  //on first render

  const [product, setProduct] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  //fetching at start
  const { data: variantAttributes, isSuccess: variantsAttributesSucceed } = useQuery(["variants", { defaultProductId: defaultProductId }], () => variantFetchByParentId(defaultProductId), { select: (data) => data.find((v) => v.fk_product_child === variantId).attributes, staleTime: Infinity, enabled: defaultProductId !== undefined && defaultProductId?.length !== 0, });
  const { data: noVariant, isSuccess: noVariantSucceed } = useQuery(["noVariant", { id: variantId, onlyId: false }], () => productFetchById(variantId), { staleTime: Infinity, enabled: !!defaultProductId?.length == 0 });
  const { data: description, isSuccess: descriptionSucceed } = useDescription(defaultProductId, childCatId, variantId);
  const { data: allAttributes, isSuccess: allAttributesSucceed } = useQuery(["allAttributes"], () => attributesAllFetch(), { staleTime: Infinity });
  const { data: defaultProduct, isSuccess: defaultProductSucceed } = useQuery(["defaultProduct", { defaultProductId: defaultProductId, onlyId: false }], () => productFetchById(defaultProductId), { staleTime: Infinity, enabled: defaultProductId !== undefined && defaultProductId?.length !== 0 });



  //depending on product changes
  //fetching 
  const { data: allValues, isSuccess: allValuesSucceed } = useValues(variantAttributes);

/*   console.log(variantsAttributesSucceed, noVariantSucceed, descriptionSucceed, allAttributesSucceed, defaultProductSucceed, allValuesSucceed);
 */

  //calculate
  const valuesSelected = useValuesSelected(allAttributes, variantAttributes, allValues, "ref", "v_id");
  const values3D = useValuesSelected(allAttributes, variantAttributes, allValues, "ref", "v_3d");
  const valuesLabels = useValuesSelected(allAttributes, variantAttributes,allValues, "ref", "v_label");
  const valuesFactor = useValuesSelected(allAttributes, variantAttributes, allValues, "ref", "v_factor");
  const valuesOperator = useValuesSelected(allAttributes, variantAttributes, allValues, "ref", "v_operator");
  const features = useValuesSelected(allAttributes, variantAttributes, allValues, "id", "v_id");

  const { price, basePrice } = usePrice(defaultProduct,valuesFactor,valuesOperator );
  const dimensions = useDimensions(values3D);
  const nomenclature = useNomenclature(defaultProduct, valuesLabels, values3D);

  //fetching again
  const { facePicture: facePicture, sidePicture: sidePicture, isSuccess: pictureSucceed } = usePicture(product.nomenclature, miniature);


/*   const countRefresh = useRef(0);
  countRefresh.current = countRefresh.current + 1;
  console.log("useProduct : " + countRefresh.current); */

  useEffect(() => {
    if (variantsAttributesSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, attributes: variantAttributes}));
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
    if (valuesSelected) {
      setProduct((prevProduct) => ({ ...prevProduct, valuesSelected: valuesSelected }));
    }
  }, [valuesSelected]);

  useEffect(() => {
    if (allAttributesSucceed && variantsAttributesSucceed && allValuesSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, features: features }));
    }
  }, [allAttributesSucceed, variantsAttributesSucceed, allValuesSucceed]);

 useEffect(() => {
    if (price && basePrice) {
      setProduct((prevProduct) => ({ ...prevProduct, prices: { price: price, basePrice: basePrice } }));
    }
  }, [price, basePrice]);

    useEffect(() => {
    if (dimensions) {
/*       setProduct((prevProduct) => ({ ...prevProduct, dimensions: dimensions }));
 */    console.log("oucou");}
  }, [dimensions]);  

  useEffect(() => {
    if (nomenclature) {
      setProduct((prevProduct) => ({ ...prevProduct, nomenclature: nomenclature }));
    }
  }, [nomenclature]);

  useEffect(() => {
    if (descriptionSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, description: description }));
    }
  }, [descriptionSucceed]);

  useEffect(() => {
    if (pictureSucceed) {
      setProduct((prevProduct) => ({ ...prevProduct, image: { facePicture: facePicture, sidePicture: sidePicture } }));
    }
  }, [pictureSucceed]);

  useEffect(() => {
    if (product && "nomenclature" in product && "prices" in product && "valuesSelected" in product && "values" in product && "defaultProductId" in product && "description" in product) {
      setSuccess(true);
    }
  }, [product]);

console.log(product);

  return { product: product, isSuccess: isSuccess, setProduct };
};
