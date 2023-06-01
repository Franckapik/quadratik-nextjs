import { useEffect, useState } from "react";
import { useValuesSelected } from "./useValuesSelected";
import { useQuery } from "react-query";

export const useNomenclature = (attributes, values, defaultProductId) => {
  const [nomenclature, setNomenclature] = useState(false);

  const { data: dimensions } = useValuesSelected(attributes, values, "ref", "v_3d");
  const { data: labels } = useValuesSelected(attributes, values, "ref", "v_label");
  const { data: defaultProduct, isSuccess: defaultProductSucceed } = useQuery(["defaultProduct", { defaultProductId: defaultProductId, onlyId: false }], () => productFetchById(defaultProductId), { staleTime: Infinity, enabled: defaultProductId !== undefined && defaultProductId?.length !== 0 });

  const nomDiffuseur = (basename, dimensions) => {
    const { C, D, E, I, L, M, N, P, W, H, V, T } = dimensions;
    return {
      structurel: D + "N" + N + "W" + W + "P" + P + "L" + L + "E" + E + M,
      complet: D + "N" + N + "W" + W + "P" + P + "L" + L + "E" + E + M + "C" + C + "I" + I + "H" + H + "V" + V + (C != 0 ? "T" + T : ""),
      simple: basename + "-" + N + P + (L == "2" ? "L" : "") + (C != 0 && T !== undefined && T != 0 ? T : ""),
      performance: "N" + N + "W" + W + "P" + P,
    };
  };
  const nomAbsorbeur = (basename, dimensions, labels) => {
    const { E, L, M, P, W } = dimensions;
    const { F } = labels;
    return {
      structurel: "A" + "W" + W + "L" + L + "P" + P + "E" + E + M,
      complet: "A" + "W" + W + "L" + L + "P" + P + "E" + E + M,
      simple: basename + F + "-" + P + (L == "2" ? "L" : ""),
      performance: "W" + W + "P" + P,
    };
  };

  useEffect(() => {
    if (dimensions && defaultProduct?.label) {
      let basename;
      let name;
      switch (true) {
        case defaultProduct.label.includes("Diffuseur") && dimensions.D === "D1":
          basename = "Indik";
          break;
        case defaultProduct.label.includes("Diffuseur") && dimensions.D === "D2":
          basename = "Woodik";
          break;
        case defaultProduct.label.includes("Absorbeur"):
          basename = "Quadra";
          break;

        default:
          console.log("Produit par defaut non identifié - Nomenclature inconnue");
          break;
      }

      switch (basename) {
        case "Indik":
          name = nomDiffuseur(basename, dimensions);
          break;
        case "Woodik":
          name = nomDiffuseur(basename, dimensions);
          break;
        case "Quadra":
          name = nomAbsorbeur(basename, dimensions, labels);
          break;

        default:
          break;
      }

      setNomenclature(name);
    }
  }, [dimensions, defaultProduct]);

  return {data : nomenclature, isSuccess : nomenclature && defaultProductSucceed };
};
