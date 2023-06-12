import { useTexture } from "@react-three/drei";

const Cell = ({ position, rotation, args, index, motif, color, highlights, teinte }) => {
  const [colorMap, wengeMap, teckMap, cheneMap, normalMap, roughnessMap] = useTexture(["/images/textures3d/plywood.jpg", "/images/textures3d/wenge.jpg","/images/textures3d/teck.jpg","/images/textures3d/chene.jpg", "/images/textures3d/norm.jpg", "/images/textures3d/rough.jpg"]);

  const motif1 = [0, 3, 6, 8, 12, 17, 21, 23, 25, 27, 31, 36, 40, 42, 45, 48, 49, 52, 55, 57, 61, 66, 70, 72, 74, 76, 80, 86, 89, 91, 94, 97];

  let teinteMap = colorMap;

  switch (teinte) {
    case "W":
      teinteMap = wengeMap
      break;
    case "T":
      teinteMap = teckMap
      break;
    case "C":
      teinteMap = cheneMap
      break;
  
    default:
      break;
  }

  return (
    <mesh castShadow position={position} rotation={rotation}>
      <boxGeometry args={args} />
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
