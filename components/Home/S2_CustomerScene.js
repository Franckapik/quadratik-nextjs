import React, { useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';

export function Model(props) {
  const { nodes, materials } = useGLTF("/customers.glb");

  const ref = useRef();

  useFrame((state, delta) => {
     ref.current.rotation.y +=  0.005
  /*  console.log(ref.current.rotation.y, scroll); */
       })


  return (
    <group {...props} dispose={null} ref={ref}>
      <group
        position={[-1, 0.12, -0.74]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.18}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.material_0}
          position={[0, 0.49, 0.26]}
          scale={[0.99, 0.98, 0.98]}
        />
      </group>
      <group
        position={[-0.55, 0.69, -0.06]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <group
        position={[-1.32, 0.69, -0.06]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <group
        position={[1.62, 0.53, -0.85]}
        rotation={[-Math.PI / 2, 0, -1.52]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Black_Amplifier_4.geometry}
        material={materials["Music Studio.004"]}
        position={[-0.34, 0.3, -1.68]}
        rotation={[-Math.PI, 0.07, -Math.PI]}
        scale={0.59}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Small_Amplifier_1.geometry}
        material={materials["Music Studio.004"]}
        position={[-0.37, 0.5, -1.64]}
        rotation={[Math.PI, -0.14, Math.PI]}
        scale={0.59}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Guitar_Holder_2.geometry}
        material={materials["Music Studio.004"]}
        position={[-1.58, 0.56, -1.43]}
        rotation={[Math.PI, -0.15, Math.PI]}
        scale={0.59}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Drum_2.geometry}
        material={materials["Music Studio.001"]}
        position={[-1.24, 0.48, -0.27]}
        rotation={[3.12, 1.51, -3.1]}
        scale={0.68}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair_Bass.geometry}
        material={materials["Music Studio.001"]}
        position={[-0.96, 0.4, -0.18]}
        rotation={[3.13, 1.42, -3.12]}
        scale={0.68}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube017.geometry}
        material={nodes.Cube017.material}
        position={[0.17, 1.56, -1.04]}
        scale={[0.02, 0.02, 0.8]}
      />
      <group position={[0.16, 1.13, -1.04]} scale={[0.01, 0.42, 0.73]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube037_1.geometry}
          material={materials["Material.012"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube037_2.geometry}
          material={materials["Material.013"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Armchair_3_Gray002.geometry}
        material={materials["LivingRoom.004"]}
        position={[1.28, 0.28, -1.73]}
        rotation={[0, -0.98, 0]}
        scale={0.37}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials["Material.001"]}
        position={[0.67, 1.27, 0.05]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.24}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={nodes.Cube012.material}
        position={[0.25, 0.11, -1.04]}
        scale={[1, 0.11, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Black_Guitar.geometry}
        material={materials["Music Studio.004"]}
        position={[-1.6, 0.55, -1.45]}
        rotation={[-3.09, -0.29, 3.12]}
        scale={0.59}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={nodes.Cube014.material}
        position={[-1.72, 0.11, 1.04]}
        scale={[1, 0.11, 1]}
      />
      <group position={[1.06, 0.32, -0.88]} rotation={[0, 0.06, 0]} scale={0}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Darth_Vader_Hilt_02_-_Default_0_1"].geometry}
          material={materials["02_-_Default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Darth_Vader_Hilt_02_-_Default_0_2"].geometry}
          material={materials["07_-_Default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Darth_Vader_Hilt_02_-_Default_0_3"].geometry}
          material={materials["13_-_Default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Darth_Vader_Hilt_02_-_Default_0_4"].geometry}
          material={materials["15_-_Default"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube018.geometry}
        material={nodes.Cube018.material}
        position={[-1.72, 0.11, -1.04]}
        scale={[1, 0.11, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text003.geometry}
        material={materials["Material.001"]}
        position={[0.73, 1.38, -0.36]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.24}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shelf_2_Set.geometry}
        material={materials["LivingRoom.005"]}
        position={[0.59, 0.5, -0.12]}
        scale={0.27}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Guitar_Mixer.geometry}
        material={materials["Music Studio.005"]}
        position={[-0.5, 0.44, -1.21]}
        rotation={[0, 0.67, 0]}
        scale={0.52}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cymbar_3.geometry}
        material={materials["Music Studio.001"]}
        position={[-0.57, 0.55, -0.65]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.68}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cymbal_2.geometry}
        material={materials["Music Studio.001"]}
        position={[-1.41, 0.54, -0.65]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.68}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials["Material.014"]}
        position={[-0.98, 1.71, -0.16]}
        scale={[0.78, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BackStage_Curtains001.geometry}
        material={materials.beams}
        position={[-1.01, 0.76, -0.07]}
        rotation={[1.32, 1.56, -1.28]}
        scale={[0.5, 0.5, 0.52]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Black_Amplifier_3.geometry}
        material={materials["Music Studio.005"]}
        position={[-0.48, 0.27, -1.22]}
        rotation={[-Math.PI, 0.8, -Math.PI]}
        scale={0.52}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bench.geometry}
        material={materials["Music Studio.005"]}
        position={[-0.81, 0.23, -1.74]}
        scale={0.42}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Big_Drum.geometry}
        material={materials["Music Studio.001"]}
        position={[-0.99, 0.64, -0.66]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.68}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair_1.geometry}
        material={materials["Music Studio.006"]}
        position={[-1.01, 0.33, 1.12]}
        rotation={[0.01, 1.42, -0.01]}
        scale={0.6}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlantG_3_V002.geometry}
        material={materials["LivingRoom.002"]}
        position={[1.52, 0.37, 0.46]}
        scale={0.36}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Drum_1.geometry}
        material={materials["Music Studio.001"]}
        position={[-0.66, 0.38, -0.39]}
        rotation={[-Math.PI, 1.06, -Math.PI]}
        scale={0.68}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cymbal_1.geometry}
        material={materials["Music Studio.001"]}
        position={[-1.45, 0.55, -0.34]}
        rotation={[3.12, 1.51, -3.1]}
        scale={0.68}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Furniture_1_Set.geometry}
        material={materials["LivingRoom.008"]}
        position={[0.28, 0.45, -1.05]}
        rotation={[0, -1.57, 0]}
        scale={0.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={materials["Material.014"]}
        position={[-1, 1.3, -0.06]}
        scale={[0.71, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Armchair_3_Gray,001"].geometry}
        material={materials["LivingRoom.004"]}
        position={[1.23, 0.28, -0.32]}
        rotation={[Math.PI, -0.84, Math.PI]}
        scale={0.37}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table_1001.geometry}
        material={materials["LivingRoom.006"]}
        position={[0.94, 0.24, -1.07]}
        rotation={[0, -1.15, 0]}
        scale={0.41}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Material.008"]}
        position={[-0.01, 0.93, 1.04]}
        scale={[0.19, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.002"]}
        position={[0.99, 0.93, 0]}
        scale={[0.19, 1, 1]}
      />
      <group position={[-1, 0.93, 0]} scale={[0.19, 1, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube026_1.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube026_2.geometry}
          material={materials["Material.002"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[0, 0.04, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.19, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sofa_4_Gray_Set.geometry}
        material={materials["LivingRoom.004"]}
        position={[1.6, 0.36, -1.03]}
        rotation={[0, -1.56, 0]}
        scale={0.37}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Orange_Amplifier_1.geometry}
        material={materials["Music Studio"]}
        position={[0.49, 0.28, 1.81]}
        rotation={[0, 0.3, 0]}
        scale={0.53}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        position={[0.68, 0.33, 0.62]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={nodes.Cylinder002.material}
        position={[0.32, 0.33, 0.62]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[0.5, 0.54, 1.04]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.32, 0.03, 0.32]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mixing_Table.geometry}
        material={materials["Music Studio.002"]}
        position={[-1.03, 0.5, 0.59]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_15.geometry}
        material={materials.MB_26_official_3396}
        position={[1.55, 0.34, -1.04]}
        rotation={[-2.58, 1.35, -0.49]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Level001.geometry}
        material={materials.Level}
        position={[0.39, 0.8, 1.21]}
        rotation={[1.92, 0, Math.PI / 2]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder005.geometry}
        material={materials["Material.014"]}
        position={[-0.55, 1.71, -0.59]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube020.geometry}
        material={nodes.Cube020.material}
        position={[-0.01, 0.93, -1.04]}
        scale={[0.19, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials["Material.009"]}
        position={[-0.18, 0.93, 1.04]}
        scale={[0.19, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube022.geometry}
        material={materials["Material.011"]}
        position={[0.15, 0.93, -1.04]}
        scale={[0.19, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials["Material.007"]}
        position={[0.25, 0.11, 1.04]}
        scale={[1, 0.11, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials["Material.003"]}
        position={[1.06, 0.13, 1.14]}
        scale={0.65}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Small_Amplifier_3.geometry}
        material={materials["Music Studio"]}
        position={[0.49, 0.47, 1.79]}
        rotation={[0, 0.3, 0]}
        scale={0.53}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={nodes.Cube010.material}
        position={[-1, 0.97, 0.01]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.12, 0.26, 0.53]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={nodes.Cylinder001.material}
        position={[0.68, 0.33, 1.46]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shelf_3_Set001.geometry}
        material={materials["LivingRoom.003"]}
        position={[1.51, 1.17, 0.11]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.38}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={nodes.Cylinder003.material}
        position={[0.32, 0.33, 1.46]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Level002.geometry}
        material={materials.Level}
        position={[0.54, 0.57, 1]}
        rotation={[1.92, 0, Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text001.geometry}
        material={materials["Material.001"]}
        position={[-0.25, 0.4, 1.32]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.24}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Speaker_2.geometry}
        material={materials["Music Studio.003"]}
        position={[-1.69, 0.58, 0.28]}
        rotation={[0, -0.45, 0]}
        scale={1.05}
      />
      <group
        position={[0.38, 0.66, 1.43]}
        rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
        scale={1.3}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.speaker_high_Left_Body_0_1.geometry}
          material={materials.Body}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.speaker_high_Left_Body_0_2.geometry}
          material={materials.mesh}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.speaker_high_Left_Body_0_3.geometry}
          material={materials.sponge}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
        material={materials.MB_26_official_3393}
        position={[1.63, 0.5, -1.09]}
        rotation={[-1.62, 0.32, -1.35]}
        scale={0.01}
      />
      <group
        position={[0.38, 0.65, 0.66]}
        rotation={[0, Math.PI / 3, 0]}
        scale={1.3}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.speaker_high_right_sponge_0_1.geometry}
          material={materials.sponge}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.speaker_high_right_sponge_0_2.geometry}
          material={materials.Body}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.speaker_high_right_sponge_0_3.geometry}
          material={materials.mesh}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.speaker_high_right_sponge_0_4.geometry}
          material={materials.Light}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text002.geometry}
        material={materials["Material.001"]}
        position={[-0.25, 1.87, -1.3]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.24}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_11.geometry}
        material={materials.MB_26_official_3394}
        position={[1.59, 0.38, -1.09]}
        rotation={[-1.62, 0.32, -1.35]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_17.geometry}
        material={materials.MB_26}
        position={[1.62, 0.55, -1.09]}
        rotation={[-1.62, 0.32, -1.35]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chaise.geometry}
        material={materials.Level}
        position={[1.1, 0.3, 0.89]}
        rotation={[1.9, -0.13, 1.2]}
      />
      <group
        position={[-1.31, 1.71, 0.82]}
        rotation={[Math.PI, 0, 0]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube039_1.geometry}
          material={materials["M-Contreplaqué.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube039_2.geometry}
          material={materials["M-Wengé.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube039_3.geometry}
          material={materials["SVGMat.002"]}
        />
      </group>
      <group
        position={[-0.76, 1.63, -0.37]}
        rotation={[Math.PI, 0, 0]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube042.geometry}
          material={materials["M-Contreplaqué.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube042_1.geometry}
          material={materials["M-Wengé.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube042_2.geometry}
          material={materials["SVGMat.002"]}
        />
      </group>
      <group
        position={[-1.17, 1.63, -0.79]}
        rotation={[Math.PI, 0, 0]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube045_1.geometry}
          material={materials["M-Contreplaqué.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube045_2.geometry}
          material={materials["M-Wengé.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube045_3.geometry}
          material={materials["SVGMat.002"]}
        />
      </group>
      <group
        position={[-0.27, 0.92, -1.22]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube049.geometry}
          material={materials["M-Contreplaqué.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube049_1.geometry}
          material={materials["M-Wengé.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube049_2.geometry}
          material={materials["SVGMat.002"]}
        />
      </group>
      <group
        position={[-0.27, 1.33, -1.64]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube050.geometry}
          material={materials["M-Contreplaqué.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube050_1.geometry}
          material={materials["M-Wengé.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube050_2.geometry}
          material={materials["SVGMat.002"]}
        />
      </group>
      <group
        position={[-0.27, 1.33, -0.8]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube055.geometry}
          material={materials["M-Contreplaqué.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube055_1.geometry}
          material={materials["M-Wengé.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube055_2.geometry}
          material={materials["SVGMat.002"]}
        />
      </group>
      <group
        position={[0.21, 1.2, 1.04]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.84, 0.85, 0.84]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_1.geometry}
          material={materials["M-Contreplaqué.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_2.geometry}
          material={materials["SVGMat.073"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_3.geometry}
          material={materials["M-noir abs"]}
        />
      </group>
      <group
        position={[-1.31, 1.48, 0.11]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.84, 0.85, 0.84]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040_1.geometry}
          material={materials["M-Contreplaqué.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040_2.geometry}
          material={materials["SVGMat.073"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040_3.geometry}
          material={materials["M-noir abs"]}
        />
      </group>
      <group
        position={[-0.68, 1.48, 0.11]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.84, 0.85, 0.84]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube041_1.geometry}
          material={materials["M-Contreplaqué.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube041_2.geometry}
          material={materials["SVGMat.073"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube041_3.geometry}
          material={materials["M-noir abs"]}
        />
      </group>
      <group
        position={[-0.24, 1.1, 0.82]}
        rotation={[Math.PI / 2, 0, 1.57]}
        scale={[0.84, 0.85, 0.84]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006_1.geometry}
          material={materials["M-Contreplaqué.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006_2.geometry}
          material={materials["SVGMat.073"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006_3.geometry}
          material={materials["M-noir abs"]}
        />
      </group>
      <group
        position={[-1.18, 1.62, -0.37]}
        rotation={[-Math.PI, -Math.PI / 2, 0]}
        scale={[0.84, 0.85, 0.84]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube043_1.geometry}
          material={materials["M-Contreplaqué.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube043_2.geometry}
          material={materials["SVGMat.073"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube043_3.geometry}
          material={materials["M-noir abs"]}
        />
      </group>
      <group
        position={[-0.76, 1.62, -0.79]}
        rotation={[-Math.PI, -Math.PI / 2, 0]}
        scale={[0.84, 0.85, 0.84]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube044.geometry}
          material={materials["M-Contreplaqué.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube044_1.geometry}
          material={materials["SVGMat.073"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube044_2.geometry}
          material={materials["M-noir abs"]}
        />
      </group>
      <group
        position={[-0.28, 1.34, -1.22]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.84, 0.85, 0.84]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube051.geometry}
          material={materials["M-Contreplaqué.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube051_1.geometry}
          material={materials["SVGMat.073"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube051_2.geometry}
          material={materials["M-noir abs"]}
        />
      </group>
      <group
        position={[-0.28, 0.92, -1.64]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.84, 0.85, 0.84]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube052.geometry}
          material={materials["M-Contreplaqué.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube052_1.geometry}
          material={materials["SVGMat.073"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube052_2.geometry}
          material={materials["M-noir abs"]}
        />
      </group>
      <group
        position={[-0.28, 0.92, -0.81]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.84, 0.85, 0.84]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube057.geometry}
          material={materials["M-Contreplaqué.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube057_1.geometry}
          material={materials["SVGMat.073"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube057_2.geometry}
          material={materials["M-noir abs"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Speaker_1.geometry}
        material={materials["Music Studio.003"]}
        position={[-0.34, 0.58, 0.28]}
        rotation={[Math.PI, -1.18, Math.PI]}
        scale={0.55}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials.MB_1_official_3398}
        position={[1.67, 0.61, -1.1]}
        rotation={[-1.62, 0.32, -1.35]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_13.geometry}
        material={materials.MB_26_official_3395}
        position={[1.54, 0.34, -1.12]}
        rotation={[-2.03, 1.44, -1.06]}
        scale={0.01}
      />
      <group
        position={[0.2, 1.2, 1.6]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials["M-Contreplaqué"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_1.geometry}
          material={materials["M-Wengé"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_2.geometry}
          material={materials["SVGMat.001"]}
        />
      </group>
      <group
        position={[-0.2, 1.1, 1.45]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012_1.geometry}
          material={materials["M-Contreplaqué"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012_2.geometry}
          material={materials["M-Wengé"]}
        />
      </group>
      <group
        position={[1.4, 0.85, -0.09]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube046.geometry}
          material={materials["M-Contreplaqué"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube046_1.geometry}
          material={materials["M-Wengé"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube046_2.geometry}
          material={materials["SVGMat.001"]}
        />
      </group>
      <group
        position={[1.4, 1.39, -0.09]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.72}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube048.geometry}
          material={materials["M-Contreplaqué"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube048_1.geometry}
          material={materials["M-Wengé"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube048_2.geometry}
          material={materials["SVGMat.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/customers.glb");
