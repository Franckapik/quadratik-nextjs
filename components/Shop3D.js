import { AccumulativeShadows, OrbitControls, RandomizedLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BrightnessContrast, EffectComposer, SSAO, ToneMapping } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React from "react";
import Absorbeur from "./models3D/Absorbeur";
import Diffuseur1D from "./models3D/Diffuseur1D";
import Diffuseur2D from "./models3D/Diffuseur2D";
import { Lights } from "./models3D/parts3D/Lights";
import { useProductStore } from "../hooks/store";

const Shop3D = ({ p3d }) => {
  const attributes= useProductStore((state) => state.attributes)
  const valuesSelected= useProductStore((state) => state.valuesSelected)

  const get3D = (attributes, valuesSelected) => {
    const listOfValues = Object.entries(attributes).reduce((acc, [i, a] = cur) => {
      for (let key in a.values) {
        acc.push(a.values[key]);
      }
      return acc;
    }, []);
  
    const listOfvRef = Object.entries(valuesSelected).reduce((acc, [i, a] = cur) => {
      const pickValue = listOfValues.filter((value) => value.v_id === a)[0];
      if (pickValue !== undefined) {
        return {
          ...acc,
          [i]: pickValue.v_3d,
        };
      } else {
        return acc;
      }
    }, 0);

    return listOfvRef
  }


 
 const monObj3d = get3D(attributes, valuesSelected);

  return (
    <>
      <Canvas linear flat shadows dpr={[1, 2]} camera={{ position: [10, 15, 10], zoom: 4 }}>
        <AccumulativeShadows
          temporal
          frames={100}
          colorBlend={0}
          alphaTest={0.9}
          opacity={2}
          scale={10}
          position={[0, monObj3d.P / 10 - 0.1, 0]} //0.1 for shadow issue with model
        >
          <RandomizedLight amount={8} radius={50} ambient={0.9} intensity={1} position={[0, 40, 0]} bias={0.001} />
        </AccumulativeShadows>
        <Lights />
        <OrbitControls
          makeDefault
          minAzimuthAngle={0}
          maxAzimuthAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 4}
          enableZoom={false}
          enablePan={true}
          zoomSpeed={0.8}
        />
        <group scale={0.1} rotation={[Math.PI / 2, 0, 0]}>
        {monObj3d ? <Diffuseur1D p3d={p3d} dimensions={monObj3d} /> : "pas de modele"}
{/*           {p3d.TAG === "Diffuseurs" && p3d.D === "D1" && <Diffuseur1D p3d={p3d} dimensions={monObj3d} />}
          {p3d.TAG === "Diffuseurs" && p3d.D === "D2" && <Diffuseur2D p3d={p3d} />}
          {p3d.TAG === "Absorbeurs" && <Absorbeur p3d={p3d} />} */}
        </group>
        <EffectComposer>
          <BrightnessContrast
            brightness={0} // brightness. min: -1, max: 1
            contrast={0.2}
          />
          <SSAO />
          <ToneMapping
            blendFunction={BlendFunction.NORMAL} // blend mode
            adaptive={true} // toggle adaptive luminance map usage
            resolution={256} // texture resolution of the luminance map
            middleGrey={0.6} // middle grey factor
            maxLuminance={16.0} // maximum luminance
            averageLuminance={1.0} // average luminance
            adaptationRate={1.0} // luminance adaptation rate
          />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default Shop3D;
