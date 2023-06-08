import { useSpring, animated, useInView } from "@react-spring/web";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import Moment from "react-moment";
import Parser from "rss-parser";
import { LegalMentions } from "./legal/LegalMentions";
import { CGV } from "./legal/CGV";
import { Techno } from "./legal/Techno";

export const S5_Contact = () => {
  const [legalshow, setLegalShow] = useState(false);
  const [cgvShow, setCgvShow] = useState(false);
  const [technoShow, setTechnoShow] = useState(false);
  const [flipped, set] = useState(false);
  const [rssFeed, setRssFeed] = useState([]);

  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        transform: `perspective(300px) rotateX(180deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
      },
      to: {
        opacity: 1,
        transform: `perspective(300px) rotateX(0deg)`,
      },
      delay: 3000,
    }),
    {
      once: true,
    }
  );

  useEffect(() => {
    let parser = new Parser();
    const fetchRss = async () => {
      let feed = await parser.parseURL("https://fr.audiofanzine.com/news/a.rss.xml");
      let arr = [];

      for (let i = 0; i < 5; i++) {
        arr.push(feed.items[i]);
      }
      return arr;
    };

    fetchRss().then((res) => {
      setRssFeed(res);
    });

  }, []);

  return (
    <Row id="s5_contact" className="section">
      <Row className="p-0 m-2">
        <Marquee pauseOnHover gradient={false} speed={40} className="s4_marquee ft1">
          {rssFeed.map((a, i) => (
            <div key={"marquee_actu" + i}>
              <span className="p-5">Actualites musicales</span>
              <img src="./logo/logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />
              <span className="p-5">
                
                <a href={a.link}>{a.title}</a>
              </span>
              <img src="./logo/logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />
            </div>
          ))}
        </Marquee>
      </Row>
      <Row className="s5_contact_row m-0 mt-2 p-2 p-md-0 ft4 ">
        <Col sm={1} className=" d-none d-md-flex align-items-center justify-content-center"></Col>
        <Col sm={4} className=" d-none d-md-flex flex-column  align-items-center justify-content-center text-uppercase">
          Besoin d'être orienté dans votre projet ?
          <img src="/logo/logo_orientation.svg" alt="Image illustrant un choix à réaliser à partir du logo de Quadratik.fr" className="s5_logo_orientation" />
        </Col>
        <Col sm={3} className=" d-flex flex-row flex-md-column align-items-center justify-content-start p-0 m-0">
          <Row className="text-uppercase  h-50 w-100 align-items-center justify-content-center text-center">Recevoir des bonnes ondes</Row>
          <Row className="align-items-center justify-content-evenly h-50 w-100 text-center">
            <div>
              <i className="fad fa-envelope"></i>
              <p>atelier@quadratik.fr</p>
            </div>
          </Row>
        </Col>
        <Col sm={3} className=" text-uppercase  d-flex flex-column align-items-center justify-content-start p-0 m-0">
          <Row className=" w-100 h-50">
            <animated.div ref={ref} style={springs} className="d-flex flex-column s5_animatedcontact bg_green_light align-items-center justify-content-evenly">
              <p className=" text-center ">Contact direct avec l'artisan</p>
              <div className="text-center">
                <i className="fad fa-phone"></i>
                <p>06.31.92.74.81</p>
              </div>
              <p className=" text-center ">Discussions sans engagements</p>
            </animated.div>
          </Row>
          <div className="d-flex flex-column justify-content-evenly align-items-center h-50 text-center w-100">
            Partenaire d'étude acoustique
            <img src="./logo/ekleo_logo.png" className="s5_ekleo_logo m-2" alt="Logo du partenaire principal de Quadratik.fr pour les etudes acoustiques" />
          </div>
        </Col>
        <Col sm={1} className="d-none d-md-flex flex-md-column align-items-center justify-content-evenly s5_social">
          <div className="d-flex justify-content-center align-items-center h-100 w-100 text-center">
            <i className="fab fa-facebook-square"></i>
          </div>
          <div className="d-flex justify-content-center align-items-center h-100 w-100 text-center">
            <i className="fab fa-twitter-square"></i>
          </div>
        </Col>
      </Row>
      <Row className="s5_legal  text-center justify-content-evenly align-items-md-end ft4 order-md-2  ">
        <LegalMentions show={legalshow} setShow={setLegalShow} />
        <CGV show={cgvShow} setShow={setCgvShow} />
        <Techno show={technoShow} setShow={setTechnoShow} />
        <Col className="border_creme border-bottom-0 h-10 order-md-1 align-items-center d-flex justify-content-center bg_darker" md={2} xs={6} onClick={() => setLegalShow(!legalshow)}>
          Mentions légales
        </Col>

        {/* lien vers les techno/infos utilisées pour le site */}
        <Col className="border_creme border-bottom-0 h-10 order-md-3 align-items-center d-flex justify-content-center bg_darker" md={2} xs={6} onClick={() => setCgvShow(!cgvShow)}>
          CGV
        </Col>
        <Col className="d-none d-md-flex border_creme border-bottom-0 h-20 order-md-2  align-items-center d-flex justify-content-center bg_darker" md={2} onClick={() => setTechnoShow(!technoShow)}>
          Quadratik.fr © <Moment format="YYYY"></Moment>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center text-center ft5 order-md-1 p-2">
        <p> Entreprise Quadratik.fr </p> SIRET 83529797900014 - 835 297 979 R.C.S RENNES - rue d’Aubigné 35440 Feins - France
      </Row>
    </Row>
  );
};
