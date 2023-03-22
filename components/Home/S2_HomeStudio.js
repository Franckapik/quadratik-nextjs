import { Col, Row } from "react-bootstrap";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three'
import { useEffect } from 'react'
import { PresentationControls, useGLTF, useMatcapTexture } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { Model } from "./S2_CustomerScene";
import { useScroll } from '@react-spring/web';
import { useRef } from 'react';

export const S2_HomeStudio = ({scroll}) => {

  return (

  <Row id="s2_homeStudio" className="justify-content-center align-items-center">
    <Col md={2}></Col>
    <Col md={10} className="d-flex flex-column justify-content-center s2_col_canvas">
{/*       <Row className="justify-content-center align-items-center h-100">
        <Col md={8} className="d-flex flex-column  p-0 justify-content-end align-items-center">
          <img src="./studio1.svg" alt="image de studio d'enregistrement de musique" />
        </Col>
      </Row> */}
      <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [0, 2, 8] }}>
{/*       <color attach="background" args={['#e0b7ff']} />
 */}      <ambientLight />
       <Model scroll={scroll} />
    </Canvas>



    </Col>
  </Row>
)};
