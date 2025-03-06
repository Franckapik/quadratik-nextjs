import { AccumulativeShadows, OrbitControls, RandomizedLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BrightnessContrast, EffectComposer, SSAO } from "@react-three/postprocessing";
import React from "react";
import Absorbeur from "../models3D/Absorbeur";
import Diffuseur1D from "../models3D/Diffuseur1D";
import Diffuseur2D from "../models3D/Diffuseur2D";
import { Lights } from "../models3D/parts3D/Lights";

const ProductCanvas = ({ product }) => {
  const dimensions = product.dimensions;
  return (
    <>
      {dimensions ? (
        <Canvas linear flat shadows dpr={[1, 2]} camera={{ position: [10, 15, 10], zoom: 4 }}>
          <AccumulativeShadows
            temporal
            frames={50}
            colorBlend={0}
            alphaTest={0.9}
            opacity={2}
            scale={10}
            position={[0, dimensions.P - 0.5, 0]} //0.1 for shadow issue with model
          >
            <RandomizedLight amount={8} radius={50} ambient={0.9} intensity={1} position={[0, 40, 0]} bias={0.001} />
          </AccumulativeShadows>
          <Lights />
          <OrbitControls makeDefault minAzimuthAngle={0} maxAzimuthAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 4} enableZoom={false} enablePan={true} zoomSpeed={0.8} />
          <group scale={0.1 / dimensions.L} rotation={[Math.PI / 2, 0, 0]}>
            {dimensions.D === "D1" ? <Diffuseur1D dimensions={dimensions} /> : null}
            {dimensions.D === "D2" ? <Diffuseur2D dimensions={dimensions} /> : null}
            {dimensions.D !== "D2" && dimensions.D !== "D1" && dimensions.F !== undefined ? <Absorbeur dimensions={dimensions} /> : null}
          </group>
          <EffectComposer>
            <BrightnessContrast
              brightness={0} // brightness. min: -1, max: 1
              contrast={0.2}
            />
            <SSAO />

          </EffectComposer>
        </Canvas>
      ) : (
        "Chargement modèle 3D"
      )}
    </>
  );
};

export default ProductCanvas;
