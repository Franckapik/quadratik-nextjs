import { AccumulativeShadows, OrbitControls, RandomizedLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BrightnessContrast, EffectComposer, SSAO, ToneMapping } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React from "react";
import Cell from "./parts3D/Cell";
import { Lights } from "./parts3D/Lights";
import Part from "./parts3D/Part";

const Shop3D = ({ product3D, amax, setAmax, cwidth, setCwidth }) => {
  const c = cwidth; //largeur cellule
  const e = product3D.E / 10; //epaisseur
  const p = product3D.N; //type (type du diffuseur) Prime number (p)
  const w = product3D.W; //largeur
  const l = product3D.N * product3D.L * (c + e) + e; //largeur
  const d = product3D.P; //profondeur
  const hor = product3D.H; //decalage horizontal
  const vert = product3D.V; //decalage vertical
  const invert = product3D.I; //decalage vertical

  setCwidth((w - (p + 1) * e) / p);

  const n = product3D.N * product3D.N * product3D.L; // nb de cellules

  const n2 = Math.ceil(l / (c + e)); //type (nombre de rangées)

  const a = Array(n)
    .fill("")
    .map((a, i) => {
      const n = i % p;
      const m = Math.floor(i / p);
      const an = (Math.pow(n, 2) + Math.pow(m, 2)) % p;
      return an;
    });
  setAmax(Math.max(...a));
  const start = [-w / 2, -l / 2, d / 2];

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
          position={[0, -d / 10, 0]}
        >
          <RandomizedLight amount={8} radius={50} ambient={0.9} intensity={1} position={[0, 30, 0]} bias={0.001} />
        </AccumulativeShadows>
        <Lights />
        <OrbitControls
          makeDefault
          minAzimuthAngle={0}
          maxAzimuthAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 4}
          enableZoom={true}
          enablePan={true}
          zoomSpeed={0.8}
        />

        <group scale={0.1} rotation={[Math.PI / 2, 0, 0]}>
          {Array(p + 1) //peignes longs
            .fill("")
            .map((a, i) => (
              <Part args={[e, l - e, d]} position={[start[0] + (c + e) * i, 0, start[2]]} rotation={[0, 0, 0]} />
            ))}
          {Array(n2) //peignes courts
            .fill("")
            .map((a, i) => {
              if (i === 0 || i === n2 - 1) {
                return (
                  <Part
                    args={[w - e, e, d]}
                    position={[0, start[1] + e + (c + e) * i, start[2]]}
                    rotation={[0, 0, 0]}
                  />
                );
              } else {
                return (
                  <Part
                    args={[w - 2 * e, e, d]}
                    position={[0, start[1] + e + (c + e) * i, start[2]]}
                    rotation={[0, 0, 0]}
                  />
                );
              }
            })}
          {Array(n) //cellules
            .fill("")
            .map((a, i) => {
              const n = i % p;
              const m = Math.floor(i / p);
              const o = (Math.pow(n + hor, 2) + Math.pow(m + vert, 2)) % p;
              const x = start[0] + c / 2 + n * (c + e);
              const z = start[1] + c / 2 + e + m * (c + e);
              const y = invert ? d - (o * d) / amax : (o * d) / amax;

              return (
                <>
                  <Cell
                    args={[c, c, e]}
                    position={[x, z, y === d ? y - e : y + e]}
                    rotation={[0, 0, 0]}
                    index={i}
                    motif={product3D.C}
                  />
                </>
              );
            })}{" "}
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
