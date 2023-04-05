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
  const [target, setTarget] = useState(0);

  const options = {
    threshold: 0.25,
  };

  const [vertical, apiVertical] = useSpring(() => ({
    x: 0,
    opacity: 1,
  }));

  const [props, api] = useSpring(() => ({
    x: 0,
    config: {
      easing: easings.easeInOutCubic,
      duration: 2000,
    },
  }));

  /*   useEffect(() => {
    if (scroll > vh * 4) {
      api.start({
        x: 2000,
      });
      apiVertical.start({
        x: 0,
        opacity: 1,
      });
    } else {
      api.start({
        x: 0,
      });
      apiVertical.start({
        x: -300,
        opacity: 0,
      });
    }

    if (scroll > vh * 6) {
      apiVertical.start({
        x: -300,
      });
    }
  }, [scroll]); */

  return (
    <Row id="S2_Canvas " className="section p-0 m-0 justify-content-md-start justify-content-md-start">
      <Col md={1}></Col>
      <Col md={2} className="p-0 d-none d-md-flex ">
        <animated.div>
          <Row className="p-0 m-0">
            <Col md={8} className="p-0 m-0">
              <img src="./vertical_square.svg" alt="Ligne verticale" className="s2_vertical_square" />
            </Col>
            <Col md={4} className="p-0 m-0 d-flex flex-column justify-content-end">
              <Row className="d-flex justify-content-evenly text-uppercase text-center s2_list_pro h-100">
                <Col>
                  <p>Home cinéma</p>
                  <span
                    onClick={() => {
                      setTarget(1.5);
                    }}
                  >
                    Dessin
                  </span>
                </Col>
                <Col>
                  <p>Salle de spectacle</p>
                  <span
                    onClick={() => {
                      setTarget(1);
                    }}
                  >
                    Dessin
                  </span>
                </Col>
                <Col>
                  <p>Enregistrement</p>
                  <span
                    onClick={() => {
                      setTarget(0.5);
                    }}
                  >
                    Dessin
                  </span>
                </Col>
                <Col>
                  <p>Home studio</p>
                  <span
                    onClick={() => {
                      setTarget(0);
                    }}
                  >
                    Dessin
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </animated.div>
      </Col>

      <Col>
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
