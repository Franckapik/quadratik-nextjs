import {useTexture} from "@react-three/drei"

const Part = (props) => {

    const [colorMap,  normalMap, roughnessMap] = useTexture( [
      '/plywood.jpg',
      '/normal.jpg',
      '/wood/rough.jpg',
    ])
  
    colorMap.repeat.set(0.1, 0.05);
    normalMap.repeat.set(0.1, 0.05);
    roughnessMap.repeat.set(0.1, 0.05);

    return (
      <mesh
      castShadow
        position={props.position}
        rotation={props.rotation}
      >
        <boxGeometry args={props.args} /> {/*x z y */}
        <meshStandardMaterial 
         map={colorMap}
         normalMap={normalMap}
         roughnessMap={roughnessMap}
           />
      </mesh>
    );
  };

  export default Part;