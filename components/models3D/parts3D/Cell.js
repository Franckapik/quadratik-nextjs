import { useTexture } from "@react-three/drei";

const Cell = ({ position, rotation, args, index, motif, color, highlights, teinte }) => {
  const [colorMap, wengeMap, teckMap, cheneMap, normalMap, roughnessMap] = useTexture(["/textures_wood/plywood.jpg", "/textures_wood/wenge.jpg","/textures_wood/teck.jpg","/textures_wood/chene.jpg", "/textures_wood/norm.jpg", "/textures_wood/rough.jpg"]);

  const motif1 = [0, 3, 6, 8, 12, 17, 21, 23, 25, 27, 31, 36, 40, 42, 45, 48, 49, 52, 55, 57, 61, 66, 70, 72, 74, 76, 80, 86, 89, 91, 94, 97];

  let teinteMap = colorMap;

  switch (teinte) {
    case "wenge":
      teinteMap = wengeMap
      break;
    case "teck":
      teinteMap = teckMap
      break;
    case "chene":
      teinteMap = cheneMap
      break;
  
    default:
      break;
  }

  return (
    <mesh castShadow position={position} rotation={rotation}>
      <boxGeometry args={args} /> {/*x z y */}
      {highlights ? (
        <meshStandardMaterial color={color} />
      ) : (
        <>
          {motif == 0 ? <meshStandardMaterial map={colorMap} normalMap={normalMap} /> : null}
          {motif == 1 ? <meshStandardMaterial map={motif1.includes(index) ? teinteMap : colorMap} normalMap={normalMap} /> : null}
          {motif == 2 ? <meshStandardMaterial map={index % 2 == 0 ? teinteMap : colorMap} normalMap={normalMap} /> : null}
        </>
      )}
    </mesh>
  );
};

export default Cell;
