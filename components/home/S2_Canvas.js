import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSwipeable } from "react-swipeable";
import { MathUtils } from "three";
import { LoadCamera } from "./canvas_components/loadCamera";
import { LoadLight } from "./canvas_components/loadLight";
import { LoadMesh } from "./canvas_components/loadMesh";

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

export default function S2_Canvas () {
  const [target, setTarget] = useState(0);
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

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Right") {
        handleClick("decrease");
      } else if (eventData.dir === "Left") {
        handleClick("increase");
      }
    },
    /* ...config, */
  });

  return (
    <Row id="S2_Canvas" {...handlers} className="section p-0 m-0 justify-content-md-start justify-content-md-start">
      <Col md={1} className="order-md-1 d-none d-md-flex"></Col>
      <Col md={4} className="p-0 d-flex flex-row flex-md-column s2_customer_col text-creme justify-content-center align-items-center order-md-3">
        <Row className="w-100 justify-content-center text-center" onClick={() => handleClick("decrease")}>
          <p className="ft1 text_grey d-none d-md-flex justify-content-center"> {customers[circular(index - 1)]}</p>
          <i className="fad fa-chevron-up d-none d-md-inline"></i>
          <i className="fad fa-chevron-left d-md-none"></i>
        </Row>
        <Row className="s2_customer_title_container bg_darker d-flex justify-content-center align-items-center ft05 text-center ">{customers[circular(index)]}</Row>
        <Row className="w-100 justify-content-center align-items-center text-center" onClick={() => handleClick("increase")}>
          <i className="fad fa-chevron-down d-none d-md-inline"></i>
          <i className="fad fa-chevron-right d-md-none"></i>
          <p className="ft1 text_grey d-none d-md-flex justify-content-center"> {customers[circular(index + 1)]}</p>
        </Row>
      </Col>
      <Col md={7} className="order-md-2">
        <div className="s2_canvas_container">
          <Canvas dpr={1} shadows>
            <LoadCamera url={"/glb/scene_customers.glb"} />
            <RotateScroll target={target}>
              <LoadMesh url={"/glb/scene_customers.glb"} />
              <LoadLight url={"/glb/scene_customers.glb"} />
            </RotateScroll>
            <ambientLight intensity={0.15} />
          </Canvas>
        </div>
      </Col>
    </Row>
  );
};
