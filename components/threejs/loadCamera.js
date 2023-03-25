import { PerspectiveCamera, useGLTF } from "@react-three/drei";
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
              makeDefault={true}
              far={obj.far}
              near={obj.near}
              fov={50} //obj.fov
              position={objWorldPos}
         /*      rotation={[-Math.PI / 2, 0, 0]} */
            />
            );
          }
        })}
      </>
    );
  };