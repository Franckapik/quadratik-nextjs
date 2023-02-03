import { Button, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

const Home = () => (
  <div>
    <Row id="s0" className="justify-content-between m-0">
      <Row className="header d-none d-md-flex justify-content-end text-uppercase m-0 p-0">
        <Col md={1}>Boutique</Col>
        <Col md={1}>Contact</Col>
        <Col md={1} className="d-none d-md-flex"></Col>
      </Row>
      <Col xs={1} className="d-none d-md-block border_creme cadre_home_gauche">
      
      </Col>
      <Col
        xs={10}
        sm={8}
        md={5}
        className="d-flex flex-wrap border_creme justify-content-center align-content-center cadre_logo "
      >
        <Row className="justify-content-center">
          <img src="./logo_blanc.svg" className="pb-2 logo" />
        </Row>
        <Row className="text-nowrap">ACOUSTIQUE & ARTISANAT</Row>
      </Col>
      <Col xs={1} className="d-none d-md-block border_creme cadre_home_droit">
     
      </Col>
    </Row>
    <Row id="s1" className="justify-content-end m-0 ">
      <Col md={5} className='m-2'>
        <Row className="text-end">
          <h2>Diffuseurs acoustiques</h2>Le diffuseur Woodik améliore l’acoustique par sa structure irrégulière calculée
          sur une gamme de fréquences
          <p className="text-uppercase pt-2">Fabrication artisanale française</p>
        </Row>
        <Row className="text-left m-4">
          {" "}
          <ListGroup>
            <ListGroup.Item>rééquilibre les ondes sonores</ListGroup.Item>
            <ListGroup.Item>supprime les effets indésirables</ListGroup.Item>
            <ListGroup.Item>le son entoure vos oreilles</ListGroup.Item>
            <ListGroup.Item>les productions sont aérées et précises</ListGroup.Item>
          </ListGroup>
        </Row>
        <Row className="text-uppercase text-center"><p>Commande en ligne </p><Button>entrer dans l'atelier</Button></Row>
      </Col> 
      <Col md={1}></Col>
    </Row>
   
  </div>
);

export default Home;
