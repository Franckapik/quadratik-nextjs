import { PerspectiveCamera, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";


export const LoadCamera = ({ url }) => {
  const { nodes, materials, animations } = useGLTF(
    url
  );

    return (
      <>
        {Object.entries(nodes).map(([key, obj]) => {
          
          if (obj.isCamera) {
            let objWorldPos = new Vector3();
            obj.getWorldPosition(objWorldPos);
            return (
              <PerspectiveCamera
              name="Camera"
              key={"Camera" + key}
              makeDefault={true}
              far={obj.far}
              near={obj.near}
              fov={30} //obj.fov
              position={objWorldPos}
              rotation={[obj.rotation.x, obj.rotation.y, obj.rotation.z]} 
            />
            );
          }
        })}
      </>
    );
  };