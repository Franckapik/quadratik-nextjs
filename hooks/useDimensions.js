import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useValuesSelected } from "./useValuesSelected";

export const useDimensions = (attributes, values) => {
  const [dimensionsComputed, setDimensionsComputed] = useState(false);

  const { data: dimensions, isSuccess } = useValuesSelected(attributes, values, "ref", "v_3d");

  useEffect(() => {
    if (dimensions?.D === "D1") {
      const { E, N, W, L, P, I } = dimensions;

      const e = E / 10; //epaisseur
      const p = parseInt(N); //type (type du diffuseur) Prime number (p)
      const w = parseInt(W); //largeur
      const V = 0; //decalage vertical NO DECALAGE FOR D1
      const invert = I == "0"; //invert
      const c = (w - (p + 1) * e) / p; //largeur cellule
      const l = Math.round(parseFloat(N * L * (c + e) + e)); //longueur
      const n = N * L; // nb de cellules
      const n2 = Math.ceil(l / (c + e)); //type (nombre de rangées)
      const a = Array(n)
        .fill("")
        .map((a, i) => {
          const n = i % p;
          const m = Math.floor(i / p);
          const an = (Math.pow(n, 2) + Math.pow(m, 2)) % p;
          return an;
        });

      const amax = Math.max(...a);
      const amin = Math.min(...a);
      const start = [-w / 2, -l / 2, P / 2];

      setDimensionsComputed({ e: e, p: p, w: w, V: V, invert: invert, c: c, l: l, n: n, n2: n2, a: a, amax: amax, amin: amin, start: start });
    }

    if (dimensions?.D === "D2") {
      const { E, N, W, L, P, V, I } = dimensions;
      const e = E / 10; //epaisseur
      const p = parseInt(N); //type (type du diffuseur) Prime number (p)
      const w = parseInt(W); //largeur
      const c = (w - (p + 1) * e) / p; //largeur cellule
      const l = Math.round(parseFloat(N * L * (c + e) + e)); //longueur

      const invert = I == "0"; //invert
      const n = N * N * L; // nb de cellules
      const n2 = Math.ceil(l / (c + e)); //type (nombre de rangées)
      const a = Array(n)
        .fill("")
        .map((a, i) => {
          const n = i % p;
          const m = Math.floor(i / p);
          const an = (Math.pow(n, 2) + Math.pow(m, 2)) % p;
          return an;
        });

      const amax = Math.max(...a);
      const amin = Math.min(...a);
      const start = [-w / 2, -l / 2, P / 2];

      setDimensionsComputed({ e: e, p: p, w: w, V: V, invert: invert, c: c, l: l, n: n, n2: n2, a: a, amax: amax, amin: amin, start: start });
    }

    if (dimensions?.D !== "D2" && dimensions.D !== "D1" && dimensions.F !== undefined) {
      const { E, W, L, P, F } = dimensions;
      const e = E / 10; //epaisseur
      const w = parseInt(W); //largeur
      const l = w * L; //longueur
      const start = [-w / 2, -l / 2, P / 2];

      setDimensionsComputed({ e: e, w: w, l: l, start: start });
    }
  }, [dimensions]);

  return { dimensions: { ...dimensions, ...dimensionsComputed }, isSuccess : isSuccess && dimensions && dimensionsComputed };
};
