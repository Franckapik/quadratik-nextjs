import { PerspectiveCamera, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";


export const LoadCamera = ({ url, target }) => {
  const { nodes, materials, animations } = useGLTF(
    url
  );

  const scroll = useScroll()
  useFrame((state, delta) => {
    const distance = 8;
    const oldP = new Vector3(Math.sin( target ) * distance, 1, Math.cos( target ) * distance);
/*     scene.current.rotation.y = MathUtils.lerp(scene.current.rotation.y, currentScroll * ((Math.PI * 2) / (scrollMax - scrollMin)), 0.05)
 */    state.camera.position.lerp(oldP, 0.01);
    state.camera.lookAt(0, 0, 0)
  })
    return (
      <>
        {Object.entries(nodes).map(([key, obj]) => {
          
          if (obj.isCamera) {
            let objWorldPos = new Vector3();
            obj.getWorldPosition(objWorldPos);
            return (
              <PerspectiveCamera
              name="Camera"
              makeDefault={true}
              far={obj.far}
              near={obj.near}
              fov={40} //obj.fov
              rotation={[obj.rotation.x, obj.rotation.y, obj.rotation.z]} 
            />
            );
          }
        })}
      </>
    );
  };