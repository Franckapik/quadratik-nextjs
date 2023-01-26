import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Layout from "../layouts/Layout";

const Section_title = ({title_width, title_size, verb, title, icon, number, classname}) => (
  <Container style={{width:title_width}} className={classname + " p-0"}>
   <Row className="m-0">
      <Col className="p-0 d-flex justify-content-start flex-grow-0"><h2 className="m-0 text-start display-4">{number}</h2></Col>
      <Col className="p-0 align-self-end">
        <Row className="m-0 "><i className={icon + " fa-2x p-0 text-center"}></i> </Row>
        <Row className="m-0 "><span className="text-center align-self-center">{verb}</span></Row>
      </Col>
    </Row>
    <Row className="m-0"><h3 className="m-0 p-0 text-start text-nowrap" style={{fontSize : title_size}}>{title}</h3></Row>
  </Container>
);

const Home = () => (
  <Layout>
    <section className="s1 w-100">
      <img className="s1_logo" src="/logo.png" /> {/* a faire en svg */}
      <div className="s1_formula">q = (x² + y²) mod N</div>
      <div className="d-flex flex-column align-items-center justify-content-evenly bandeau">
        <Section_title classname={"s1_section_title m-0"} title_width={"90%"} title_size={38} number={"01"} verb={"Apprécier"} title={"L'espace"} icon={"fad fa-waveform"}>
        </Section_title>
        <img src="/diffusion.png" alt="Mouvements des ondes sonores lors de la diffusion acoustique" className="s2_acoustic_img"></img>
        <img src="/absorption.png" alt="Mouvements des ondes sonores lors de l'absorption acoustique" className="s2_acoustic_img"></img>
        <img src="/reflexion.png" alt="Mouvements des ondes sonores lors de la reflexion acoustique" className="s2_acoustic_img"></img>
   </div> </section>
    <section className="s2 w-100">
      <img src="/s2_dif_img.png" alt="Image d'un diffuseur acoustique" className="s2_dif_img"></img>
      <div className="s2_link">
      <p className="text-end m-0 p-0">Solutions acoustiques</p>
      <Button className="w-100">La Boutique</Button></div>
      <div className="s2_product_properties">
      <p>Diffuseur Woodik-7</p>
      <p className="s2_freq display-4">1475 Hz</p></div>
      <Section_title classname={"s2_section_title m-0"} title_width={"180px"} title_size={38} number={"02"} verb={"Respecter"} title={"La Matière"} icon={"fad fa-trees"}>
        </Section_title>
    </section>
    <section className="s3 w-100">
    <Section_title classname={"s3_section_title m-0"} title_width={"180px"} title_size={38} number={"03"} verb={"Favoriser"} title={"La Diversité"} icon={"fad fa-swatchbook"}>
        </Section_title>

    </section>
    <section className="s4 w-100">
    <Section_title classname={"s4_section_title m-0"} title_width={"180px"} title_size={38} number={"04"} verb={"Essayer"} title={"Le sur-mesure"} icon={"fad fa-vector-square"}>
        </Section_title>
        <img src="/diydif.png" alt="Image de construction un diffuseur acoustique sur mesure" className="s3_diydif_img"></img>
        <div className="s4_link">
      <p className="text-end m-0 p-0 text-nowrap ">Votre diffuseur personnalisé</p>
      <Button className="w-100 btn-secondary">Le Quadralab</Button></div>
    </section>
    <section className="s5 w-100">
    <Section_title classname={"s5_section_title m-0"} title_width={"180px"} title_size={38} number={"05"} verb={"Soutenir"} title={"Nos valeurs"} icon={"fad fa-handshake-alt"}>
        </Section_title>
        <img src="/cards.png" alt="Image des différentes valeurs de Quadratik.fr" className="s5_cards_img"></img>
    </section>
    <section className="s6 w-100">
    <Section_title classname={"s6_section_title m-0"} title_width={"180px"} title_size={38} number={"06"} verb={"Entrer"} title={"En contact"} icon={"fad fa-phone"}>
        </Section_title>
        <img src="/s6_orientation.png" alt="Illustration de plusieurs chemins possibles lors d'une prise de décision" className="s6_orientation_img"></img>
    <div className="footer w-100 d-flex justify-content-around"><span>Mentions légales</span><span>Quadratik.fr - 2023</span><span>CGV</span></div>
    </section>
  </Layout>
);

export default Home;
