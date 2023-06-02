import { useEffect, useState } from "react";
import { useValuesSelected } from "./useValuesSelected";
import { productFetchById } from "../components/dolibarrApi/fetch";
import { useQuery } from "react-query";

export const usePrice = (defaultProduct, valuesFactor, valuesOperator) => {
  const [price, setPrice] = useState(false);
  const [basePrice, setBasePrice] = useState(false);




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

  return {price : price, basePrice : basePrice};
};
