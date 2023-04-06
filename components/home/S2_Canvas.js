import { easings, useSpring, animated } from "@react-spring/web";
import { BakeShadows, ContactShadows, ScrollControls, Stage, Stats } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MathUtils } from "three";
import { useBearStore } from "../../hooks/store";
import { LoadCamera } from "../threejs/loadCamera";
import { LoadLight } from "../threejs/loadLight";
import { LoadMesh } from "../threejs/loadMesh";

const RotateScroll = ({ children, target }) => {
  const scene = useRef();

  useFrame(() => {
    scene.current.rotation.y = MathUtils.lerp(scene.current.rotation.y, Math.PI * target, 0.05);
  });

  return (
    <group name="Scene" ref={scene}>
      {children}
    </group>
  );
};

export const S2_Canvas = () => {
  const [target, setTarget] = useState(-0.5);
  const [index, setIndex] = useState(0);
  const customers = ["Home Studio", "Enregistrement", "Salle de spectacle", "Home Cinéma"];
  const circular = (i) => ((i % 4) + 4) % 4;

  const handleClick = (i) => {
    switch (i) {
      case "increase":
        setIndex(index + 1);
        setTarget(target + 0.5);
        break;
      case "decrease":
        setIndex(index - 1);
        setTarget(target - 0.5);
        break;

      default:
        break;
    }
  };

  return (
    <Row id="S2_Canvas " className="section p-0 m-0 justify-content-md-start justify-content-md-start">
      <Col md={1}></Col>
      <Col md={3} className="p-0 d-none d-md-flex flex-column  s2_customer_col text-creme justify-content-center">
        <Row className="w-100 justify-content-center text-center" onClick={() => handleClick("decrease")}>
          <p className="ft1 text_grey"> {customers[circular(index + 1)]}</p>
          <i className="fad fa-chevron-up"></i>
        </Row>
        <div className="s2_customer_title_container d-flex justify-content-center align-items-center ft05 ">
          {customers[circular(index)]}
        </div>
        <Row className="w-100 justify-content-center text-center" onClick={() => handleClick("increase")}>
          <i className="fad fa-chevron-down"></i>
          <p className="ft1 text_grey"> {customers[circular(index - 1)]}</p>
        </Row>
      </Col>

      <Col md={8}>
        <div className="s2_canvas_container h-100">
          <Canvas dpr={1} shadows>
            <Suspense fallback={null}>
              <Stats showPanel={0} className="stats" />
              <LoadCamera url={"/glb/scene_customers.glb"} />
              <RotateScroll target={target}>
                <LoadMesh url={"/glb/scene_customers.glb"} />
                {/*   <BakeShadows /> */}
                <LoadLight url={"/glb/scene_customers.glb"} />
              </RotateScroll>
              <ambientLight intensity={0.15} />
            </Suspense>
          </Canvas>
        </div>
      </Col>
    </Row>
  );
};
