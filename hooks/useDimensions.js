import { useEffect, useMemo, useRef, useState } from "react";

export const useDimensions = (values3D) =>
  useMemo(() => {
    /*   const countRefresh = useRef(0);
  countRefresh.current = countRefresh.current + 1;
  console.log("Dimensions : " + countRefresh.current); */

    if (values3D?.D === "D1") {
      const { E, N, W, L, P, I, H } = values3D;

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
      const fmin = Math.round((((344 / 2 / P / 10) * amax) / N) * 1000);
      const fmax = Math.round(344 / 2 / (c / 100));
      const report = Array(n) //cellules
        .fill("")
        .map((a, i) => {
          const n = i % p;
          const m = Math.floor(i / p);
          const o = (Math.pow(n + H, 2) + Math.pow(m + V, 2)) % p;
          const x = start[0] + c / 2 + n * (c + e);
          const z = start[1] + c / 2 + e + m * (c + e);
          const y = invert ? P - (o * P) / amax : (o * P) / amax;
          return { ratio: Math.round((y / P) * amax), hauteur: Math.round(y * 100) / 100 };
        });

      const lengthWells = Object.values(report).reduce((acc, val) => acc + val.hauteur, 0);
      const area = l * W;
      const volume = area * P;

      return { ...values3D, e: e, p: p, w: w, V: V, invert: invert, c: c, l: l, n: n, n2: n2, a: a, amax: amax, amin: amin, start: start, fmin: fmin, fmax: fmax, report: report, lengthWells: lengthWells, area: area, volume: volume };
    } else if (values3D?.D === "D2") {
      const { E, N, W, L, P, V, I, H } = values3D;
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

      const fmin = Math.round((((344 / 2 / P / 10) * amax) / N) * 1000);
      const fmax = Math.round(344 / 2 / (c / 100));
      const area = l * W;
      const volume = area * P;

      const report = Array(n) //cellules
        .fill("")
        .map((a, i) => {
          const n = i % p;
          const m = Math.floor(i / p);
          const o = (Math.pow(n + H, 2) + Math.pow(m + V, 2)) % p;
          const x = start[0] + c / 2 + n * (c + e);
          const z = start[1] + c / 2 + e + m * (c + e);
          const y = invert ? P - (o * P) / amax : (o * P) / amax;
          return { ratio: Math.round((y / P) * amax), hauteur: Math.round(y * 100) / 100 };
        });

      const lengthWells = Object.values(report).reduce((acc, val) => acc + val.hauteur, 0);

      return { ...values3D, e: e, p: p, w: w, V: V, invert: invert, c: c, l: l, n: n, n2: n2, a: a, amax: amax, amin: amin, start: start, fmin: fmin, fmax: fmax, report: report, lengthWells: lengthWells, area: area, volume: volume };
    } else if (values3D?.D !== "D2" && values3D?.D !== "D1" && values3D?.F !== undefined) {
      const { E, W, L, P, F } = values3D;
      const e = E / 10; //epaisseur
      const w = parseInt(W); //largeur
      const l = w * L; //longueur
      const start = [-w / 2, -l / 2, P / 2];
      const area = l * W;
      const volume = area * P;

      return { ...values3D, e: e, w: w, l: l, start: start, area: area, volume: volume };
    }
  });
