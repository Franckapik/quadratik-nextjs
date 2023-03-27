import { OrbitControls, ScrollControls, Stats } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { MathUtils } from "three";
import { LoadCamera } from "../threejs/loadCamera";
import { LoadLight } from "../threejs/loadLight";
import { LoadMesh } from "../threejs/loadMesh";

const RotateScroll = ({ children, scroll }) => {
  const scene = useRef();
  const scrollMax = 4400;
  const scrollMin = 2700;
  const currentScroll = scroll - scrollMin;

  useFrame(() => {
    if (scroll > scrollMin && scroll < scrollMax) {
      //2700 to 4400
      scene.current.rotation.y = MathUtils.lerp(scene.current.rotation.y, currentScroll * ((Math.PI * 2) / (scrollMax - scrollMin)), 0.05)
/*       scene.current.rotation.y = currentScroll * ((Math.PI * 2) / (scrollMax - scrollMin));
 */    }
  }, []);

  return (
    <group name="Scene" ref={scene}>
      {children}
    </group>
  );
};

export const S2_HomeStudio = ({ scroll }) => {
  return (
    <Row id="s2_homeStudio" className="justify-content-center align-items-center">
      <Col md={2}></Col>
      <Col md={10} className="d-flex flex-column justify-content-center s2_col_canvas">
        {/*       <Row className="justify-content-center align-items-center h-100">
        <Col md={8} className="d-flex flex-column  p-0 justify-content-end align-items-center">
          <img src="./studio1.svg" alt="image de studio d'enregistrement de musique" />
        </Col>
      </Row> */}
        <Canvas shadows >
        <Stats showPanel={0} className="stats" />
          {/*         <OrbitControls /> */}
          <LoadCamera url={"/customers_coloriage_reduction.glb"} />
          <RotateScroll scroll={scroll}>
            <LoadMesh url={"/customers_coloriage_reduction.glb"} />
            <LoadLight url={"/customers_coloriage_reduction.glb"} />
          </RotateScroll>

          <ambientLight intensity={0.3} />
        </Canvas>
      </Col>
    </Row>
  );
};
