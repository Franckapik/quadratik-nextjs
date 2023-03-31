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

export const S2_Customers = ({ scroll, vh }) => {
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
    <Row id="s2_customers" className="p-0 m-0">
      <Col md={2} className="text-end p-0 d-none d-md-flex ">
        <animated.div style={vertical}>
          <Row className="p-0 m-0">
            <Col md={8} className="p-0 m-0">
              <img src="./vertical_square.svg" alt="Ligne verticale" className="s2_vertical_square" />
            </Col>
            <Col md={4} className="p-0 m-0 d-flex flex-colmun justify-content-end">
              <Row className="d-flex justify-content-between text-uppercase text-center list_pro">
                <Col>
                  <p style={{ opacity: rotation > 3.8 ? 1 : 0.2 }}>Home cinéma</p>
                </Col>
                <Col>
                  <p style={{ opacity: rotation > 2 && rotation < 3.8 ? 1 : 0.2 }}>Salle de spectacle</p>
                </Col>
                <Col>
                  <p style={{ opacity: rotation > 0.8 && rotation < 2 ? 1 : 0.2 }}>Enregistrement</p>
                </Col>
                <Col>
                  <p style={{ opacity: rotation >= 0 && rotation < 0.8 ? 1 : 0.2 }}>Home studio</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </animated.div>
      </Col>
      <Col md={10} className="d-flex flex-column justify-content-center " >
        <animated.div className="w-100 h-100 s2_rideau" style={props} >
          <Row className="s2_sentence_pro text-center">
            <h2 className="">Professionnel</h2>
            <span className="s2_sub2">quelles que soient les dimensions de votre espace</span>
          </Row>
          <Row>
            <img
              className="s2_photo_studio m-auto"
              src="./discostudio.png"
              alt="Photographie des produits quadratik.fr dans le studio DiscoCasino de Rennes"
            />
          </Row>
          <Row>
            <Button variant="primary" className="s2_studio_button">
              <i className="fad fa-projector"></i>Découvrir les réalisations
            </Button>
          </Row>
        </animated.div>
        {scroll > 3.5 * vh && scroll < 6 * vh ? (
          <Row className="s2_canvas_row">
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
          </Row>
        ) : null}
      </Col>
    </Row>
  );
};
