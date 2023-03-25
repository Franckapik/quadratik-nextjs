import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

export const LoadLight = ({ url }) => {
  const { nodes, materials, animations } = useGLTF(url);

  return (
    <>
      {Object.entries(nodes).map(([key, obj]) => {
        if (obj.isLight) {
          let objWorldPos = new Vector3();
          obj.getWorldPosition(objWorldPos);
          switch (obj.type) {
            case "PointLight":
              return (
                <pointLight
                  castShadow
                  shadow-mapSize-height={1024}
                  shadow-mapSize-width={1024}
                  shadow-bias={-0.001}
                  intensity={0.8}
                  decay={2}
                  distance={10}
                  position={objWorldPos}
                  scale={0.6}
                />
              );
            case "SpotLight":
              return (
                <spotLight
                  castShadow
                  shadow-mapSize-height={1024}
                  shadow-mapSize-width={1024}
                  shadow-bias={-0.001}
                  intensity={0.8}
                  decay={2}
                  distance={10}
                  position={objWorldPos}
                  scale={0.6}
                />
              );

            default:
              break;
          }
        }
      })}
    </>
  );
};
