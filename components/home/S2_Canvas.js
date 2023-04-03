import { ScrollControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Row } from "react-bootstrap";
import { LoadCamera } from "../threejs/loadCamera";
import { LoadLight } from "../threejs/loadLight";
import { LoadMesh } from "../threejs/loadMesh";

export const S2_Canvas = () => {
  return (
    <Row id="S2_Canvas " className="section p-0 m-0 justify-content-md-start justify-content-md-start">
      <div className="s2_canvas_container ">
        <Canvas dpr={1} shadows>
          <Stats showPanel={0} className="stats" />
          <ScrollControls pages={3}>
            <LoadCamera url={"/glb/scene_customers.glb"} />{" "}
          </ScrollControls>
          <Suspense fallback={null}>
          <LoadMesh url={"/glb/scene_customers.glb"} />
          <LoadLight url={"/glb/scene_customers.glb"} />
          <ambientLight intensity={0.15} /></Suspense>
        </Canvas>
      </div>
    </Row>
  );
};
