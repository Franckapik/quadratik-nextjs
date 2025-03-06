import { useGLTF } from "@react-three/drei";
import { MeshLambertMaterial, Vector3 } from "three";


export const LoadMesh = ({ url }) => {
  const { nodes, materials, animations } = useGLTF(
    url
  );

    return (
      <>
        {Object.entries(nodes).map(([key, obj]) => {
          if (obj.isMesh) {
            let objWorldPos = new Vector3();
            obj.getWorldPosition(objWorldPos);
            return (
                  <mesh
                    key={key}
                    castShadow
                    receiveShadow
                    geometry={obj.geometry}
                    material={new MeshLambertMaterial().copy(obj.material)}
                    position={objWorldPos}
                  />
            );
          }
        })}
      </>
    );
  };