
const Foam = (props) => {
 /*  const [colorMap, wengeMap, normalMap, roughnessMap] = useTexture([
    '/plywood.jpg',
    '/wenge.jpg',
    '/wood/norm.jpg',
    '/wood/rough.jpg',
  ]) */

  return (
    <mesh
      castShadow
      position={props.position}
      rotation={props.rotation}
    >
      <boxGeometry args={props.args} /> {/*x z y */}
      <meshStandardMaterial
      color={"black"}
/*         map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap} */
      />
    </mesh>
  );
};

export default Foam;