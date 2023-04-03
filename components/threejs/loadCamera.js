import { PerspectiveCamera, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";


export const LoadCamera = ({ url }) => {
  const { nodes, materials, animations } = useGLTF(
    url
  );

  const scroll = useScroll()
  useFrame((state, delta) => {
    // The offset is between 0 and 1, you can apply it to your models any way you like
    const offset = 1 - scroll.offset

    state.camera.position.set(Math.PI * 2 / offset, 0,0)
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
              position={objWorldPos}
              rotation={[obj.rotation.x, obj.rotation.y, obj.rotation.z]} 
            />
            );
          }
        })}
      </>
    );
  };