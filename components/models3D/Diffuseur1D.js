import { Text } from "@react-three/drei";
import { usePerformances } from "../../hooks/usePerformances";
import Cell from "./parts3D/Cell";
import Part from "./parts3D/Part";
import { useProductStore } from "../../hooks/store";
import { useReport2D } from "../../hooks/useReport2D";

const LightenDarkenColor = (col, amt) => {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

const Diffuseur1D = ({ dimensions, isQuadralab }) => {
  const ratio = useProductStore((state) => state.ratio);
  const highlights = useProductStore((state) => state.highlights);
  console.log(dimensions);

  const { E, N, W, L, P, H, V, I, C } = dimensions;
  const e = E / 10; //epaisseur
  const p = parseInt(N); //type (type du diffuseur) Prime number (p)
  const w = parseInt(W); //largeur
  const c = (w - (p + 1) * e) / p; //largeur cellule
  const l = parseInt(N * L * (c + e) + e); //longueur
  const d = P; //profondeur
  const hor = H; //decalage horizontal
  const vert = 0; //decalage vertical NO DECALAGE FOR D1
  const invert = I === "true"; //decalage vertical
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

  const report2D = useReport2D(n, p, hor, vert, c, invert, start, amax, e, d);
  console.log(report2D);

  usePerformances(amax, c, P, N);
  return (
    <>
      {" "}
      {isQuadralab ? (
        <>
          <Text color="d0c3b4" scale={w / 10} position={[0, -l + l / 4, d / 2]}>
            {w} cm
          </Text>
          <Text color="d0c3b4" scale={w / 10} position={[-w + w / 4, 0, d / 2]} rotation={[0, 0, Math.PI / 2]}>
            {l} cm
          </Text>
          <Text color="d0c3b4" scale={w / 10} position={[w - w / 4, 0, d / 2]} rotation={[0, Math.PI / 2, 0]}>
            {d} cm
          </Text>
        </>
      ) : null}
      {Array(p + 1) //peignes longs
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

          return (
            <group>
              <Cell key={"Cell" + i} args={[c, l - e, e]} position={[x + e / 2, 0, y === d ? y - e : y + e]} rotation={[0, 0, 0]} index={i} motif={C} color={y === 0 ? "blue" : LightenDarkenColor("#012000", (y * 355) / d)} highlights={highlights} />
              <Text
                color="black" // default
                anchorX="center" // default
                anchorY="middle" // default
                scale={w / 30}
                position={[x, z, y + 1]}
              >
                {ratio ? Math.round((y / d) * amax) : Math.round(y * 100) / 100}
              </Text>
            </group>
          );
        })}
    </>
  );
};

export default Diffuseur1D;
