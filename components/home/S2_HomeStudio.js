import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Col, Row } from "react-bootstrap";
import { LoadCamera } from '../threejs/loadCamera';
import { LoadLight } from '../threejs/loadLight';
import { LoadMesh } from "../threejs/loadMesh";

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
        <Canvas shadows>
        <OrbitControls />
   <LoadCamera url={"/customers_coloriage_reduction.glb"} />
   <LoadMesh url={"/customers_coloriage_reduction.glb"} />
   <LoadLight url={"/customers_coloriage_reduction.glb"} />
    <ambientLight intensity={0.3} />          
        </Canvas>
      </Col>
    </Row>
  );
};
