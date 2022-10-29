import {useTexture} from "@react-three/drei"

const Cell = (props) => {
    const [colorMap, wengeMap, normalMap, roughnessMap] = useTexture( [
      '/plywood.jpg',
      '/wenge.jpg',
      '/wood/norm.jpg',
      '/wood/rough.jpg',
    ])
  
  

   
  
    const motif = [0,3,6,8,12,17,21,23,25,27,31,36,40,42,45,48]
  
    return (
      <mesh
      castShadow
        position={props.position}
        rotation={props.rotation}
      >
        <boxGeometry args={props.args} /> {/*x z y */}
        <meshStandardMaterial  
         map={ motif.includes(props.index) ? wengeMap : colorMap}
         normalMap={normalMap}
         roughnessMap={roughnessMap}
           />
      </mesh>
    );
  };

  export default Cell;