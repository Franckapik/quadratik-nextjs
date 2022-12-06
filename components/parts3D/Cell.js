import { useTexture } from "@react-three/drei"

const Cell = (props) => {
  const [colorMap, wengeMap, normalMap, roughnessMap] = useTexture([
    '/plywood.jpg',
    '/wenge.jpg',
    '/wood/norm.jpg',
    '/wood/rough.jpg',
  ])





  const motif1 = [0, 3, 6, 8, 12, 17, 21, 23, 25, 27, 31, 36, 40, 42, 45, 48, 49, 52, 55, 57, 61, 66, 70, 72, 74, 76, 80, 86, 89, 91, 94, 97]

  return (
    <mesh
      castShadow
      position={props.position}
      rotation={props.rotation}
    >
      <boxGeometry args={props.args} /> {/*x z y */}
      {props.motif === "motif0" ? <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      /> : null}
      {props.motif === "motif1" ? <meshStandardMaterial
        map={motif1.includes(props.index) ? wengeMap : colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      /> : null}
      {props.motif === "motif2" ? <meshStandardMaterial
        map={props.index%2 ==0 ? wengeMap : colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      /> : null}
    </mesh>
  );
};

export default Cell;