import { OrbitControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BrightnessContrast, EffectComposer, SSAO, ToneMapping } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React, { Suspense } from "react";
import Absorbeur from "../models3D/Absorbeur";
import Diffuseur1D from "../models3D/Diffuseur1D";
import Diffuseur2D from "../models3D/Diffuseur2D";
import { Loader } from "../Loader";

const ProductCanvas = ({product}) => {
  const dimensions = product.dimensions;
  const { progress } = useProgress();
  return (
    <>
      {dimensions ? (
        <>
        <Canvas linear flat shadows >
       
          <pointLight intensity={0.5} position={[0,0,-10]} />
          <pointLight intensity={0.5} position={[0,0,25]} />

        <ambientLight intensity={0.4}></ambientLight>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <Suspense fallback={"Chargement"}> <group scale={0.08}>
          {dimensions.D === "D1" ? <Diffuseur1D dimensions={dimensions} isQuadralab /> : null}
            {dimensions.D === "D2" ? <Diffuseur2D dimensions={dimensions} isQuadralab /> : null}
            {dimensions.D !== "D2" && dimensions.D !== "D1" && dimensions.F !== undefined ? <Absorbeur dimensions={dimensions} isQuadralab /> : null}
          </group> </Suspense>
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
         
        </Canvas></>
        
      ) : (
        "Chargement modèle 3D"
      )}
                <Loader
        text={
          <>
            <i className="fas fa-spinner fa-spin"></i> Chargement du modèle : {progress.toFixed(0)} %
          </>
        }
        open={progress!== 100}
      />
    </>
  );
};

export default ProductCanvas;
