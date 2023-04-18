import { useEffect, useState } from "react";
import { useProductStore } from "../hooks/store";


export const usePrice = (valuesSelected, defaultProduct, attributes) => {
  const [price, setPrice] = useState(0);
  useProductStore.setState({ price: price });

  useEffect(() => {
    const basePrice = parseFloat(defaultProduct.price_ttc);

    const listOfValues = Object.entries(attributes).reduce((acc, [i, a] = cur) => {
      for (let key in a.values) {
        acc.push(a.values[key]);
      }
      return acc;
    }, []);

    const optionsPrice = Object.entries(valuesSelected).reduce((acc, [i, a] = cur) => {
      const pickValue = listOfValues.filter((value) => value.v_id === a)[0];
      if (pickValue !== undefined) {
        switch (pickValue.v_operator) {
          case "multiplication":
            acc += (Number(pickValue.v_factor) - 1) * basePrice;
            break;

          case "addition":
            acc += Number(pickValue.v_factor) * basePrice;
            break;

          default:
            console.log("Strategie de calcul de prix non repertoriée : ", pickValue.v_operator);
        }
      }

      return acc;
    }, basePrice);

    setPrice(Math.round(optionsPrice));
  }, [valuesSelected]);

  return [price, setPrice];
};
