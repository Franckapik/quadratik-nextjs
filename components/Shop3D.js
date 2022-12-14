import { AccumulativeShadows, OrbitControls, RandomizedLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BrightnessContrast, EffectComposer, SSAO, ToneMapping } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React from "react";
import Cell from "./models3D/parts3D/Cell";
import { Lights } from "./models3D/parts3D/Lights";
import Part from "./models3D/parts3D/Part";

const Shop3D = ({ p3d, amax, setAmax, cwidth, setCwidth }) => {

  const c = cwidth; //largeur cellule
  const e = p3d.E / 10; //epaisseur
  const p = parseInt(p3d.N); //type (type du diffuseur) Prime number (p)
  const w =50; //largeur
  const l = p3d.N * p3d.L * (c + e) + e; //longueur
  const d = p3d.P; //profondeur
  const hor = p3d.H; //decalage horizontal
  const vert = p3d.V; //decalage vertical
  const invert = p3d.I; //decalage vertical
  const type = p3d.D;

  setCwidth((w - (p + 1) * e) / p);

  const n = p3d.N * p3d.N * p3d.L; // nb de cellules

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
          position={[0, -d/10 - 0.1, 0]} //0.1 for shadow issue with model
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
          enableZoom={true}
          enablePan={true}
          zoomSpeed={0.8}
        />
        { p3d.TAG === "Diffuseurs" && <group scale={0.1} rotation={[Math.PI / 2, 0, 0]}>
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
              } else if (type !== "D1") {
                return (
                  <Part
                    args={[w - 2 * e, e, d]}
                    position={[0, start[1] + e + (c + e) * i, start[2]]}
                    rotation={[0, 0, 0]}
                  />
                );
              }
            })}
          {Array(type == "D1" ? p : n) //cellules
            .fill("")
            .map((a, i) => {
              const n = i % p;
              const m = Math.floor(i / p);
              const o = (Math.pow(n + hor, 2) + Math.pow(m + vert, 2)) % p;
              const x = start[0] + c / 2 + n * (c + e);
              const z = start[1] + c / 2 + e + m * (c + e);
              const y = invert ? d - (o * d) / amax : (o * d) / amax;

              if(type !== "D1") {
                return (
                  <Cell
                    args={[c+e, c, e]}
                    position={[x, z, y === d ? y - e : y + e]}
                    rotation={[0, 0, 0]}
                    index={i}
                    motif={p3d.C}
                  />
              )
              } else {
                return (
                  <Cell
                    args={[c, l-e, e]}
                    position={[x+e/2, 0, y === d ? y - e : y + e ]}
                    rotation={[0, 0, 0]}
                    index={i}
                    motif={p3d.C}
                  />
              )
              }

            })}{" "}
        </group>}
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
