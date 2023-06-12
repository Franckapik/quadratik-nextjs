import { useTexture } from "@react-three/drei";

const Part = (props) => {
  const [colorMap, normalMap, roughnessMap] = useTexture(["/images/textures3d/plywood.jpg", "/images/textures3d/norm.jpg", "/images/textures3d/rough.jpg"]);

  colorMap.repeat.set(0.1, 0.05);
  normalMap.repeat.set(0.1, 0.05);
  roughnessMap.repeat.set(0.1, 0.05);

  return (
    <mesh castShadow position={props.position} rotation={props.rotation}>
      <boxGeometry args={props.args} />
      <meshStandardMaterial map={colorMap} normalMap={normalMap} />
    </mesh>
  );
};

export default Part;
