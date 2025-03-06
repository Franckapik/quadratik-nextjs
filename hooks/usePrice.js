import { useMemo } from "react";

export const usePrice = (defaultProduct, valuesFactor, valuesOperator) => {
  if (valuesFactor && valuesOperator) {
    const basePrice = Number(defaultProduct?.price);
    const price = Object.entries(valuesOperator).reduce((acc, [i, a] = cur) => {
      switch (a) {
        case "multiplication":
          acc += (Number(valuesFactor[i]) - 1) * basePrice;
          break;

        case "addition":
          acc += Number(valuesFactor[i]) * basePrice;
          break;

        default:
          console.log("Strategie de calcul de prix non repertoriée : ", a);
      }

      return acc;
    }, basePrice);

    return { price: Math.round(price), basePrice: basePrice };
  } else {
    return { price: 3, basePrice: 5 };
  }
};
