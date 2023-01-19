import Part from "./parts3D/Part";
import Cell from "./parts3D/Cell";

const Diffuseur2D = ({ p3d }) => {
  const e = p3d.E / 10; //epaisseur
  const p = parseInt(p3d.N); //type (type du diffuseur) Prime number (p)
  const w = p3d.W; //largeur
  const c = (w - (p + 1) * e) / p; //largeur cellule
  const l = p3d.N * p3d.L * (c + e) + e; //longueur
  const d = p3d.P; //profondeur
  const hor = p3d.H; //decalage horizontal
  const vert = p3d.V; //decalage vertical
  const invert = p3d.I; //decalage vertical
  const n = p3d.N * p3d.N * p3d.L; // nb de cellules
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

  return (
    <>
      {Array(p + 1) //peignes longs
        .fill("")
        .map((a, i) => (
          <Part args={[e, l - e, d]} position={[start[0] + (c + e) * i, 0, start[2]]} rotation={[0, 0, 0]} />
        ))}
      {Array(n2) //peignes courts
        .fill("")
        .map((a, i) => {
          if (i === 0 || i === n2 - 1) {
            return (
              <Part args={[w - e, e, d]} position={[0, start[1] + e + (c + e) * i, start[2]]} rotation={[0, 0, 0]} />
            );
          } else {
            return (
              <Part
                args={[w - 2 * e, e, d]}
                position={[0, start[1] + e + (c + e) * i, start[2]]}
                rotation={[0, 0, 0]}
              />
            );
          }
        })}
      {Array(n) //cellules
        .fill("")
        .map((a, i) => {
          const n = i % p;
          const m = Math.floor(i / p);
          const o = (Math.pow(n + hor, 2) + Math.pow(m + vert, 2)) % p;
          const x = start[0] + c / 2 + n * (c + e);
          const z = start[1] + c / 2 + e + m * (c + e);
          const y = invert ? d - (o * d) / amax : (o * d) / amax;

          return (
            <Cell
              args={[c + e, c, e]}
              position={[x, z, y === d ? y - e : y + e]}
              rotation={[0, 0, 0]}
              index={i}
              motif={p3d.C}
            />
          );
        })}
    </>
  );
};

export default Diffuseur2D;
