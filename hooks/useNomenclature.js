import { useEffect, useState } from "react";
import { useProductStore } from "./store";

export const useNomenclature = (valuesSelected, defaultProduct, attributes) => {
  const [nomenclature, setNomenclature] = useState(false);
  useProductStore.setState({ nomenclature: nomenclature });


  useEffect(() => {
    const listOfValues = Object.entries(attributes).reduce((acc, [i, a] = cur) => {
      for (let key in a.values) {
        acc.push(a.values[key]);
      }
      return acc;
    }, []);
  
    const listOfvRef = Object.entries(valuesSelected).reduce((acc, [i, a] = cur) => {
      const pickValue = listOfValues.filter((value) => value.v_id === a)[0];
      if (pickValue !== undefined) {
        return {
          ...acc,
          [i]: pickValue.v_3d,
        };
      } else {
        return acc;
      }
    }, 0);
   
    const {C, D, E, I, L, M, N, P, W, H, V} = listOfvRef;

    const n = {
      structurel: D + "N" + N + "W" + W + "L" + L + "P" + P + "E" + E + M,
      complet: D + "N" + N + "W" + W + "L" + L + "P" + P + "E" + E + M + "C" + C + "I" + I + "H" + H + "V" + V,
      simple: defaultProduct.ref + "-" + N + P + (L == "2" ? "L" : ""),
    };

    setNomenclature(n);
  }, [valuesSelected]);

  return nomenclature;
};
