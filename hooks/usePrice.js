import { useEffect, useState } from "react";
import { useValuesSelected } from "./useValuesSelected";
import { productFetchById } from "../components/dolibarrApi/fetch";
import { useQuery } from "react-query";

export const usePrice = (attributes, values, defaultProductId) => {
  const [price, setPrice] = useState(false);
  const [basePrice, setBasePrice] = useState(false);

  const { data: valuesFactor } = useValuesSelected(attributes, values, "ref", "v_factor");
  const { data: valuesOperator } = useValuesSelected(attributes, values, "ref", "v_operator");

  const { data: defaultProduct, isSuccess: defaultProductSucceed } = useQuery(["defaultProduct", { defaultProductId: defaultProductId, onlyId: false }], () => productFetchById(defaultProductId), { staleTime: Infinity, enabled: defaultProductId !== undefined && defaultProductId?.length !== 0 });

  useEffect(() => {
    if (defaultProduct) {
      setBasePrice(Number(defaultProduct.price));
    }
  }, [defaultProduct]);

  useEffect(() => {
    if (valuesFactor && valuesOperator && basePrice) {
      const price = Object.entries(valuesOperator).reduce((acc, [i, a] = cur) => {
        switch (a) {
          case "multiplication":
            acc += (Number(valuesFactor[i]) - 1) * basePrice;
            break;

          case "addition":
            acc += (Number(valuesFactor[i])) * basePrice;
            break;

          default:
            console.log("Strategie de calcul de prix non repertoriée : ", a);
        }

        return acc
      }, basePrice)

      setPrice(Math.round(price));

    }
  }, [valuesFactor, valuesOperator, basePrice]);

  return {price : price, basePrice : basePrice, isSuccess : basePrice && price && price !== NaN};
};
