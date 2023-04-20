import { useEffect, useState } from "react";
import { useProductStore } from "./store";
import { useValues3D } from "./useValues3D";

export const useNomenclature = (valuesSelected, defaultProduct, attributes, isQuadralab) => {
  const [nomenclature, setNomenclature] = useState(false);
  useProductStore.setState({ nomenclature: nomenclature });
  const dimensions = useValues3D(valuesSelected, attributes, isQuadralab);

  useEffect(() => {  
    const {C, D, E, I, L, M, N, P, W, H, V} = dimensions;

    const n = {
      structurel: D + "N" + N + "W" + W + "L" + L + "P" + P + "E" + E + M,
      complet: D + "N" + N + "W" + W + "L" + L + "P" + P + "E" + E + M + "C" + C + "I" + I + "H" + H + "V" + V,
      simple: defaultProduct.ref + "-" + N + P + (L == "2" ? "L" : ""),
    };

    setNomenclature(n);
  }, [dimensions]);

  return nomenclature;
};
