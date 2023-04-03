import { useSpring, animated, useInView } from "@react-spring/web";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";

export const S5_Contact = () => {

  const [flipped, set] = useState(false)

  const [ref, springs] = useInView(
    () => ({
    from: {
      opacity: 0,
      transform : `perspective(300px) rotateX(180deg)`,
      config: { mass: 5, tension: 500, friction: 80 },
    },
    to: {
      opacity: 1,
      transform : `perspective(300px) rotateX(0deg)`
    },
    delay : 3000
  }));

  return (

    <Row id="s5_contact">
    <Marquee pauseOnHover gradient={false} speed={100} className="s4_marquee ">
      <span className="p-5">Actualites musicales</span>{" "}
      <img src="./logo/logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />{" "}
      <span className="p-5">Mai verra la sortie de Skippy chez Kaona</span>{" "}
      <img src="./logo/logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />
    </Marquee>

    <Row className="contact_row border_creme m-0 p-0">
      <Col sm={1} className="right_creme d-flex align-items-center justify-content-center"></Col>
      <Col sm={4} className="right_creme d-flex flex-column align-items-center justify-content-center" >
        <p>Besoin d'être orienté dans votre projet ?</p>
        <img
          src="/logo/logo_orientation.svg"
          alt="Image illustrant un choix à réaliser à partir du logo de Quadratik.fr"
          className="logo_orientation" />
      </Col>
      <Col sm={3} className="right_creme d-flex flex-column align-items-center justify-content-center p-0 m-0">
        <Row className="bottom_creme w-100 h-100 ">
          <p className="m-auto text-center text-uppercase">Recevoir des bonnes ondes</p>
        </Row>
        <Row className="w-100 h-100 ">
          <p className="m-auto text-center">atelier@quadratik.fr</p>
        </Row>
      </Col>
      <Col sm={3} className="right_creme d-flex flex-column align-items-center justify-content-center p-0 m-0">
        <Row className="bottom_creme w-100 h-100">
        <animated.div ref={ref} style={springs} className="d-flex flex-column animatedcontainer border_creme  bg_light align-items-center justify-content-center p-0 m-0">
          <p className="m-auto text-center text-uppercase">Contact direct avec l'artisan</p>{" "}
          <p className="m-auto text-center">06.31.92.74.81</p>
          <p className="m-auto text-center text-uppercase">Discussions sans engagements</p></animated.div>
        </Row>
        <Row className="w-100 h-100">
          <p className="m-auto text-center text-uppercase">Etude acoustique avec notre partenaire </p>
          <img
            src="./logo/ekleo_logo.png"
            className="ekleo_logo"
            alt="Logo du partenaire principal de Quadratik.fr pour les etudes acoustiques" />
          <p className="m-auto text-center text-uppercase">Devis en ligne </p>
        </Row>
      </Col>
      <Col sm={1} className="right_creme d-flex flex-column align-items-center justify-content-evenly p-0 m-0 social">
        <i className="fab fa-facebook-square" size="6x"></i>
        <i className="fab fa-twitter-square"></i>
      </Col>
    </Row>
    <Row className="text-center">
      <p>
        Entreprise Quadratik.fr - SIRET 83529797900014 - 835 297 979 R.C.S RENNES - rue d’Aubigné 35440 Feins - France{" "}
      </p>
    </Row>
    <Row className="text-center justify-content-evenly align-items-end ">
      <Col className="border_creme border-bottom-0 h-10" md={2}>
        Mentions légales
      </Col>
      <Col className="border_creme border-bottom-0 h-20" md={2}>
        Quadratik.fr © 2023
      </Col>{" "}
      {/* lien vers les techno/infos utilisées pour le site */}
      <Col className="border_creme border-bottom-0 h-10" md={2}>
        Conditions Générales de Vente
      </Col>
    </Row>
  </Row>
  )
};
