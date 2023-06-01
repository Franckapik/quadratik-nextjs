import { Text } from "@react-three/drei";
import { useProductStore } from "../../hooks/store";
import Cell from "./parts3D/Cell";
import Part from "./parts3D/Part";

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

const Diffuseur2D = ({ dimensions, isQuadralab }) => {
  const ratio = useProductStore((state) => state.ratio);
  const highlights = useProductStore((state) => state.highlights);

  const { E, N, W, L, P, H, I, C, T, e, p, w, V, invert, c, l, n, n2, a, amax, amin, start } = dimensions;
  
  return (
    <>
      {isQuadralab ? (
        <>
          <Text color="d0c3b4" scale={w / 10} position={[0, -l + l / 4, P / 2]}>
            {w} cm
          </Text>
          <Text color="d0c3b4" scale={w / 10} position={[-w + w / 4, 0, P / 2]} rotation={[0, 0, Math.PI / 2]}>
            {l} cm
          </Text>
          <Text color="d0c3b4" scale={w / 10} position={[w - w / 4, 0, P / 2]} rotation={[0, Math.PI / 2, 0]}>
            {P} cm
          </Text>
        </>
      ) : null}
      {Array(p + 1) //peignes longs
        .fill("")
        .map((a, i) => (
          <Part args={[e, l - e, P]} position={[start[0] + (c + e) * i, 0, start[2]]} rotation={[0, 0, 0]} />
        ))}
      {Array(n2) //peignes courts
        .fill("")
        .map((a, i) => {
          if (i === 0 || i === n2 - 1) {
            return <Part args={[w - e, e, P]} position={[0, start[1] + e + (c + e) * i, start[2]]} rotation={[0, 0, 0]} />;
          } else {
            return <Part args={[w - 2 * e, e, P]} position={[0, start[1] + e + (c + e) * i, start[2]]} rotation={[0, 0, 0]} />;
          }
        })}
      {Array(n) //cellules
        .fill("")
        .map((a, i) => {
          const n = i % p;
          const m = Math.floor(i / p);
          const o = (Math.pow(n + H, 2) + Math.pow(m + V, 2)) % p;
          const x = start[0] + c / 2 + n * (c + e);
          const z = start[1] + c / 2 + e + m * (c + e);
          const y = invert ? P - (o * P) / amax : (o * P) / amax;

          return (
            <group>
              <Cell key={"Cell" + i} args={[c + e, c, e]} position={[x, z, y === P ? y - e : y + e]} rotation={[0, 0, 0]} index={i} motif={C} color={y === 0 ? "blue" : LightenDarkenColor("#012000", (y * 355) / P)} highlights={highlights} teinte={T} />
              <Text
                color="black" // default
                anchorX="center" // default
                anchorY="middle" // default
                scale={w / 30}
                position={[x, z, y + 1]}
              >
                {ratio ? Math.round((y / P) * amax) : Math.round(y * 100) / 100}
              </Text>
            </group>
          );
        })}
    </>
  );
};

export default Diffuseur2D;
