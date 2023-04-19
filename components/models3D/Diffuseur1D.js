import { useEffect, useState } from "react";
import { usePerformances } from "../../hooks/usePerformances";
import Cell from "./parts3D/Cell";
import Part from "./parts3D/Part";

const Diffuseur1D = ({ dimensions }) => {
  const { E, N, W, L, P, H, V, I, C } = dimensions;

  const e = E / 10; //epaisseur
  const p = parseInt(N); //type (type du diffuseur) Prime number (p)
  const w = W; //largeur
  const c = (w - (p + 1) * e) / p; //largeur cellule
  const l = N * L * (c + e) + e; //longueur
  const d = P; //profondeur
  const hor = H; //decalage horizontal
  const vert = V; //decalage vertical
  const invert = I; //decalage vertical
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
  const start = [-w / 2, -l / 2, d / 2];
  const cwidth = (w - (p + 1) * e) / p;

  console.log("dif1d", amax, cwidth, P, N);

  usePerformances(amax, cwidth, P, N)
  return (
    <> {Array(p + 1) //peignes longs
        .fill("")
        .map((a, i) => (
          <Part key={"Part" + i} args={[e, l - e, d]} position={[start[0] + (c + e) * i, 0, start[2]]} rotation={[0, 0, 0]} />
        ))}
      {Array(n2) //peignes courts
        .fill("")
        .map((a, i) => {
          if (i === 0 || i === n2 - 1) {
            return <Part key={"Part" + i} args={[w - e, e, d]} position={[0, start[1] + e + (c + e) * i, start[2]]} rotation={[0, 0, 0]} />;
          }
        })}
      {Array(p) //cellules
        .fill("")
        .map((a, i) => {
          const n = i % p;
          const m = Math.floor(i / p);
          const o = (Math.pow(n + hor, 2) + Math.pow(m + vert, 2)) % p;
          const x = start[0] + c / 2 + n * (c + e);
          const z = start[1] + c / 2 + e + m * (c + e);
          const y = invert ? d - (o * d) / amax : (o * d) / amax;

          return <Cell key={"Cell" + i} args={[c, l - e, e]} position={[x + e / 2, 0, y === d ? y - e : y + e]} rotation={[0, 0, 0]} index={i} motif={C} />;
        })}
     
    </>
  );
};

export default Diffuseur1D;
