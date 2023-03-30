import { Environment, Html, OrbitControls, ScrollControls, Stats } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MathUtils } from "three";
import { LoadCamera } from "../threejs/loadCamera";
import { LoadLight } from "../threejs/loadLight";
import { LoadMesh } from "../threejs/loadMesh";
import { animated, easings, useInView, useSpring } from "@react-spring/web";

const RotateScroll = ({ children, scroll, setRotation }) => {
  const scene = useRef();
  const scrollMax = 5200;
  const scrollMin = 4000;
  const currentScroll = scroll - scrollMin;

  useFrame(() => {
    if (scroll > scrollMin && scroll < scrollMax) {
      //2700 to 4400
      scene.current.rotation.y = MathUtils.lerp(
        scene.current.rotation.y,
        currentScroll * ((Math.PI * 1.7) / (scrollMax - scrollMin)),
        0.1
      );
      /*       scene.current.rotation.y = currentScroll * ((Math.PI * 2) / (scrollMax - scrollMin));
       */
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

export const S2_HomeStudio = ({ scroll }) => {
  const [rotation, setRotation] = useState(0);
  const options = {
    threshold: 0.25,
    // half of item height
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
    if (scroll > 3500) {
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

    if (scroll > 5400) {
      apiVertical.start({
        x: -300,
      });
    }
  }, [scroll]);

  return (
    <Row id="s2_customers" className="p-0 m-0">
      <Col md={2} className="text-end p-0 ">
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
      <Col md={10} className="d-flex flex-column justify-content-center s2_col_canvas">
        {/*       <Row className="justify-content-center align-items-center h-100">
        <Col md={8} className="d-flex flex-column  p-0 justify-content-end align-items-center">
          <img src="./studio1.svg" alt="image de studio d'enregistrement de musique" />
        </Col>
      </Row> */}

        <animated.div
          className="rideau w-100 h-100 d-flex flex-column align-items-center justify-content-start"
          style={props}
        >
          <Row className="sentence_pro text-center p-3 pt-5 ">
            <span>Révelez votre</span>
            <h2>Professionnalisme</h2>
            <span className="sub2">quelles que soient les dimensions de votre espace</span>
          </Row>
          <div>
            {" "}
            <img
              className="s2_photo_studio"
              src="./discostudio.png"
              alt="Photographie des produits quadratik.fr dans le studio DiscoCasino de Rennes"
            />
          </div>
          <div>
            <Button variant="primary" className="s2_studio_button">
            <i className="fad fa-projector"></i>Découvrir les réalisations
            </Button>
          </div>
        </animated.div>

        <Canvas shadows>
          <Stats showPanel={0} className="stats" />
          {/*         <OrbitControls /> */}
          <LoadCamera url={"/glb/scene_customers.glb"} />
          <RotateScroll scroll={scroll} setRotation={setRotation}>
            <LoadMesh url={"/glb/scene_customers.glb"} />
            <LoadLight url={"/glb/scene_customers.glb"} />
          </RotateScroll>

          <ambientLight intensity={0.15} />
        </Canvas>
      </Col>
    </Row>
  );
};
/* 
<Row id="s2_customers" className="p-0 m-0">
<Col md={2} className="text-end p-0 ">
  <Row className="p-0 m-0">
    <Col md={8} className="p-0 m-0">
      <img src="./vertical_square.svg" alt="Ligne verticale" className="s2_vertical_square" />
    </Col>
    <Col md={4} className="p-0 m-0 d-flex flex-colmun justify-content-end">
      <Row className="d-flex justify-content-between text-uppercase text-center list_pro">
        <Col>Home studio</Col>
        <Col>Salle de répétition</Col>
        <Col>Salle des fêtes</Col>
        <Col>Enregistrement</Col>
        <Col>Home cinéma</Col>
        <Col>Collectivités</Col>
      </Row>
    </Col>
  </Row>
</Col>

<Col md={10} className="d-flex flex-column justify-content-start ">
  <Row className="dark_bg  text-uppercase ">
  <Col md={2} className=""></Col>
    <Col md={8} >        <div className="text-center border_creme w-100 p-5">
      <span>Révelez votre</span>
      <h2>Professionnalisme</h2>
      <span className="sub2">quelles que soient les dimensions de votre espace</span>
    </div></Col>
    <Col md={2} className=""></Col>

  </Row>
  <Row className="justify-content-start">
    <Col md={2} className=""></Col>
    <Col md={8} ></Col>
    <Col md={2} className=""></Col>
  </Row>
</Col>
</Row>
 */
