import { useEffect, useState } from "react";
import { useProductStore } from "./store";
import { useValues3D } from "./useValues3D";

export const useNomenclature = (valuesSelected, tag, attributes, isQuadralab) => {
  const [nomenclature, setNomenclature] = useState(false);
  const dimensions = useValues3D(valuesSelected, attributes, isQuadralab);

  useEffect(() => {
    const { C, D, E, I, L, M, N, P, W, H, V, T, F } = dimensions;

    let basename = "Inconnu";
    let name;

    if (tag === 1 && D === "D1") {
      basename = "Indik";
    }
    if (tag === 1 && D === "D2") {
      basename = "Woodik";
    }
    if (tag === 2) {
      basename = "Quadra";
    }

    if (tag === 1) {
      name = {
        structurel: D + "N" + N + "W" + W + "L" + L + "P" + P + "E" + E + M,
        complet: D + "N" + N + "W" + W + "L" + L + "P" + P + "E" + E + M + "C" + C + "I" + I + "H" + H + "V" + V + "T" + T,
        simple: basename + "-" + N + P + (L == "2" ? "L" : "") + (C != 0 ? T : ""),
      };
    }
    if (tag === 2) {
      name = {
        structurel: "A" + "W" + W + "L" + L + "P" + P + "E" + E + M,
        complet:"A" + "W" + W + "L" + L + "P" + P + "E" + E + M,
        simple: basename + F + "-" + P + (L == "2" ? "L" : ""),
      };
    }

    setNomenclature(name);
    useProductStore.setState({ nomenclature: name });
  }, [tag, dimensions]);

  return nomenclature;
};
