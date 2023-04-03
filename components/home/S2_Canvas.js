import { animated, easings, Globals, useSpring } from "@react-spring/web";
import { AdaptiveDpr, Stats } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MathUtils } from "three";
import { LoadCamera } from "../threejs/loadCamera";
import { LoadLight } from "../threejs/loadLight";
import { LoadMesh } from "../threejs/loadMesh";

Globals.assign({ frameLoop: "always" });

const RotateScroll = ({ children, scroll, setRotation, vh }) => {
  const scene = useRef();
  const scrollMax = vh * 5.8;
  const scrollMin = vh * 4.5;
  const currentScroll = scroll - scrollMin;

  useFrame(() => {
    if (scroll > scrollMin && scroll < scrollMax) {
      scene.current.rotation.y = MathUtils.lerp(
        scene.current.rotation.y,
        currentScroll * ((Math.PI * 1.7) / (scrollMax - scrollMin)),
        0.1
      );
    }
  });

  useEffect(() => {
    setRotation(scene.current?.rotation.y);
  }, [scene.current?.rotation.y]);

  return (
    <group name="Scene" ref={scene}>
      {children}
    </group>
  );
};

export const S2_Canvas = ({ scroll, vh, mobile }) => {
  const [rotation, setRotation] = useState(0);
  const options = {
    threshold: 0.25,
  };

  const [vertical, apiVertical] = useSpring(() => ({
    x: -300,
    opacity: 0,
  }));

  const [props, api] = useSpring(() => ({
    x: 0,
    config: {
      easing: easings.easeInOutCubic,
      duration: 2000,
    },
  }));

  useEffect(() => {
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
  }, [scroll]);

  return (
    <Row id="S2_Canvas " className="section p-0 m-0 justify-content-md-start justify-content-md-start">
   <div className="s2_canvas_row h-100 w-100 d-flex align-items-center justify-content-center ">
            <div className="s2_canvas_container ">
            <Canvas dpr={1} shadows>
              <Stats showPanel={0} className="stats" />
              <LoadCamera url={"/glb/scene_customers.glb"} />
              <RotateScroll scroll={scroll} vh={vh} setRotation={setRotation}>
                <LoadMesh url={"/glb/scene_customers.glb"} />
                <LoadLight url={"/glb/scene_customers.glb"} />
              </RotateScroll>
              <AdaptiveDpr pixelated />
              <ambientLight intensity={0.15} />
            </Canvas> 
          </div></div>
    </Row>
  );
};
