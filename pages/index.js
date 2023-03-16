import { Turn as Hamburger } from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Marquee from "react-fast-marquee";
import useScrollSnap from "react-use-scroll-snap";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import LazyLoad from "react-lazy-load";

import dynamic from "next/dynamic";
import { useSpring, animated, config } from "@react-spring/web";
const Anime = dynamic(() => import("react-anime"), { ssr: false });

function useAnimatedPath({ toggle, delay }) {
  const [length, setLength] = useState(null);
  const animatedStyle = useSpring({
    strokeDashoffset: toggle ? 0 : length,
    strokeDasharray: length,
    delay,
    config: config.slow
  });

  return {
    style: animatedStyle,
    ref: (ref) => {
      if (ref) {
        setLength(ref.getTotalLength());
      }
    }
  };
}

function Checkmark({ toggle }) {
  const animatedProps = useAnimatedPath({ toggle, delay: 1500 });

  return (
    <>
    <animated.rect width="27.1" height="27.078" ry="0" x="65.876" y="65.858" stroke={"white"} {...animatedProps} />
    <animated.rect width="27.1" height="27.078" ry="0" x="65.876" y="65.858" {...animatedProps} />
                <animated.rect width="27.1" height="27.078" x="107.02" y="65.858" ry="0" stroke={"white"} {...animatedProps} />
                <animated.rect width="27.1" height="27.078" x="107.024" y="107.064" ry="0" stroke={"white"} {...animatedProps} />
                <animated.rect width="27.1" height="27.078" x="65.88" y="107.064" ry="0" stroke={"white"} {...animatedProps} />
                <animated.rect width="27.1" height="27.078" x="-34.124" y="107.28" ry="0" transform="rotate(-45)" stroke={"white"} {...animatedProps} />
                <animated.rect width="27.1" height="27.078" x="7.021" y="107.28" ry="0" transform="rotate(-45)" stroke={"white"} {...animatedProps} />
                <animated.rect width="27.1" height="27.078" x="7.024" y="148.485" ry="0" transform="rotate(-45)" stroke={"white"} {...animatedProps} />
                <animated.rect width="27.1" height="27.078" x="-34.12" y="148.485" ry="0" transform="rotate(-45)" stroke={"white"} {...animatedProps} />{" "}
</>
  );
}

const S0 = () => {

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(true);
  }, []);

  
  const [loaded, setLoading] = useState(false);

  const [goRight, apiGoRight] = useSpring(() => ({
    from: { x: 0 },
  }))
  const [goLeft, apiGoLeft] = useSpring(() => ({
    from: { x: 0 },
  }))

  useEffect(() => {
    if(loaded) {

apiGoRight.start({
  from: { x: 0 },
  to: { x: 200 },
})

apiGoLeft.start({
  from: { x: 0 },
  to: { x: -200 },
})


    }

  }, [loaded])

  return (
    <Row id="s0" className="justify-content-between m-0">
      {loaded ? (
        <Row className="header d-none d-md-flex justify-content-end text-uppercase m-0 p-0">
          <Col md={1}>Boutique</Col>
          <Col md={1}>Contact</Col>
          <Col md={1} className="d-none d-md-flex"></Col>
        </Row>
      ) : null}
      <Col xs={1} className="d-none d-md-block m-0 p-0 ">
        {" "}
{/*         {loaded ? (
          <Anime easing="easeOutQuint" duration={2000} direction="alternate" loop={false} translateX="+=200px">
             <animated.div style={springs} className="border_creme cadre_home_gauche bg-red"></animated.div>
           </Anime>
         ) : null} */}
                      {loaded ? <animated.div style={goRight} className="border_creme cadre_home_gauche"></animated.div> : null}

      </Col>
      <Col xs={10} sm={8} md={5} className="d-flex flex-wrap justify-content-center align-items-center">
        <Row className="logo_cadre">
          {loaded ? (
            <svg xmlns="http://www.w3.org/2000/svg" stroke="#D0C3B4" stroke-width="2">
              <Anime
                easing="easeOutQuad"
                loop={false}
                svg
                opacity={[0, 1]}
                duration={2000}
                component="g"
                complete={() => console.log("complete")}
                direction="alternate"
                strokeDashoffset={(el) => {
                  var pathLength = "0";
                  for (var key in el.children) {
                    let child = el.children[key];
                    if (child.getTotalLength) {
                      pathLength = child.getTotalLength().toString();
                      el.setAttribute("stroke-dasharray", pathLength);
                    }
                  }
                  return [pathLength, 0];
                }}
              >
                <rect x="0" y="0" fill="none" width="100%" height="100%" />{" "}
              </Anime>
            </svg>
          ) : null}
        </Row>
        <Col className="logo_row d-flex flex-column justify-content-center align-items-center text-center">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="286"
        height="334"
        fill="none"
        viewBox="0 0 286 334"
      >
        <Checkmark toggle={toggle} />
      </svg>
          {/* <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <g transform="" fill="none" stroke="#D0C3B4" stroke-width="1" stroke-linecap="square">
              <Anime
                easing="easeOutQuad"
                loop={false}
                svg
                component="g"
                complete={() => setLoading(true)}
                delay={(el, index) => index * 80}
                direction="alternate"
                strokeDashoffset={(el) => {
                  var pathLength = "0";
                  for (var key in el.children) {
                    let child = el.children[key];
                    if (child.getTotalLength) {
                      pathLength = child.getTotalLength().toString();
                      el.setAttribute("stroke-dasharray", pathLength);
                    }
                  }
                  return [pathLength, 0];
                }}
              >
                {" "}
                <rect width="27.1" height="27.078" ry="0" x="65.876" y="65.858" />
                <rect width="27.1" height="27.078" x="107.02" y="65.858" ry="0" />
                <rect width="27.1" height="27.078" x="107.024" y="107.064" ry="0" />
                <rect width="27.1" height="27.078" x="65.88" y="107.064" ry="0" />
                <rect width="27.1" height="27.078" x="-34.124" y="107.28" ry="0" transform="rotate(-45)" />
                <rect width="27.1" height="27.078" x="7.021" y="107.28" ry="0" transform="rotate(-45)" />
                <rect width="27.1" height="27.078" x="7.024" y="148.485" ry="0" transform="rotate(-45)" />
                <rect width="27.1" height="27.078" x="-34.12" y="148.485" ry="0" transform="rotate(-45)" />{" "}
              </Anime>
            </g>
          </svg> */}
          <p className="text-nowrap text-uppercase brand_name m-0">Quadratik</p>
          <p className="text-nowrap m-0 brand_subtitle ">ACOUSTIQUE & ARTISANAT</p>
        </Col>
      </Col>
      <Col xs={1} className="d-none d-md-block p-0">
      {loaded ? <animated.div style={goLeft} className="border_creme cadre_home_droit "></animated.div> : null}
      </Col>
    </Row>
  );
};

const S1 = ({ vh, scroll }) => {
  return (
    <Row id="s1" className="justify-content-end m-0 ">
      <Col md={5}></Col>
      <Col md={5} className="d-flex flex-column p-4 m-auto ">
        <Row className="text-center s1_text_presentation">
          <h2>Solutions acoustiques</h2>
          <p>
            Le diffuseur Woodik améliore l’acoustique par sa structure irrégulière calculée sur une gamme de fréquences
          </p>
        </Row>

        <Row className="text-center align-items-center ">
          <Col style={{ transitionDuration: "1s", opacity: scroll > 1.5 * vh ? 0.2 : 1 }} className="">
            Diffusion
            <p>
              <img src="./physic_dif.svg"></img>
            </p>
          </Col>
          <Col style={{ transitionDuration: "1s", opacity: scroll < 1.5 * vh ? 0.2 : 1 }} className="">
            Absorption
            <p>
              <img src="./physic_abs.svg"></img>
            </p>
          </Col>
        </Row>
        <Row className="s1_list align-items-center text-center">
          <ListGroup>
            <ListGroup.Item>rééquilibre les ondes sonores</ListGroup.Item>
            <ListGroup.Item>supprime les effets indésirables</ListGroup.Item>
            <ListGroup.Item>le son entoure vos oreilles</ListGroup.Item>
            <ListGroup.Item>les productions sont aérées et précises</ListGroup.Item>
          </ListGroup>{" "}
        </Row>
        <Row className="text-uppercase text-center justify-content-center mt-4">
          <p className="m-0 pb-2 button_subtitle">Commande en ligne </p>
          <Col md={8}>
            {" "}
            <Button variant="primary" className="button_home">
              Entrer dans l'atelier
            </Button>
          </Col>
        </Row>
      </Col>
      <Col md={1}></Col>
    </Row>
  );
};

const S1_SQUARE = () => {
  return (
    <Row id="s1_square" className="justify-content-start align-items-center m-0 ">
      <Col md={5} className="border_creme square text-end pt-3">
        {" "}
        Le diffuseur Woodik-7
      </Col>
      <Col md={1}></Col>
    </Row>
  );
};

const S1_DIF = () => {
  const bg_s1 = "./diffuseur4.png";

  return (
    <Row
      id="s1_dif"
      className="justify-content-end m-0 "
      style={{
        backgroundImage: `url(${bg_s1})`,
        backgroundPosition: "goRight",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    ></Row>
  );
};
const S1_ABS = () => {
  const bg_s2 = "./absorbeur.png";
  return (
    <Row
      id="s1_abs"
      className="justify-content-end m-0 "
      style={{
        backgroundImage: `url(${bg_s2})`,
        backgroundPosition: "goRight",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    ></Row>
  );
};

const S2_PRO = () => (
  <Row id="s2_pro" className="p-0 m-0">
    <Col md={2} className="text-end p-0 dark_bg">
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
      <Row className="dark_bg  p-5 text-uppercase">
        <div className="text-center">
          <span>Révelez votre</span>
          <h2>Professionnalisme</h2>
          <span className="sub2">quelles que soient les dimensions de votre espace</span>
        </div>
        {/*       <span className="s2_pro_text">Quelles que soient les dimensions de votre espace</span> */}
      </Row>
      <Row className="justify-content-start">
        <Col md={2} className="dark_bg">
          {" "}
        </Col>
        <Col md={8} className="d-flex align-items-center m-0 p-0 "></Col>
        <Col md={2} className="dark_bg"></Col>
      </Row>
    </Col>

    {/* <svg width="843" height="671" viewBox="0 0 843 671" fill="none" xmlns="http://www.w3.org/2000/svg" className="s2_pro_shape m-4">
    <Anime
                easing="easeOutQuad"
                loop={false}
                svg
                component="g"
                delay={(el, index) => index * 80}
                direction="alternate"
                strokeDashoffset={(el) => {
                  var pathLength = "0";
                  for (var key in el.children) {
                    let child = el.children[key];
                    if (child.getTotalLength) {
                      pathLength = child.getTotalLength().toString();
                      el.setAttribute("stroke-dasharray", pathLength);
                    }
                  }
                  return [pathLength, 0];
                }}
              >
<path d="M841 304.95L47.731 1L1 506.424L291.428 670L841 304.95Z" stroke="#D0C3B4"/>
</Anime>
</svg> */}
  </Row>
);

const S2_HSTUDIO = () => (
  <Row id="s2_hstudio" className="justify-content-start">
    <Col md={2}></Col>
    <Col md={10} className="d-flex flex-column">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={8} className="d-flex flex-column  p-0 justify-content-end align-items-center">
          <img src="./studio1.svg" alt="image de studio d'enregistrement de musique" />
        </Col>
      </Row>
    </Col>
  </Row>
);
const S2_STUDIO = () => (
  <Row id="s2_studio">
    <Col md={2}></Col>
    <Col md={10} className="d-flex flex-column">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={8} className="d-flex flex-column  p-0 justify-content-end align-items-center">
          <img src="./studio2.svg" alt="image de studio d'enregistrement de musique" />
        </Col>
      </Row>
    </Col>{" "}
  </Row>
);
const S2_IMG = () => (
  <Row id="s2_img">
    <Col md={2}></Col>
    <Col md={10} className="d-flex flex-column ">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={8} className="d-flex flex-column p-0 justify-content-center align-items-center">
          <img
            className="border_creme"
            src="./studio_picture1.png"
            alt="Photgraphie des produits quadratik.fr dans le studio DiscoCasino de Rennes"
          />
        </Col>
      </Row>
    </Col>
  </Row>
);
const S5 = () => (
  <LazyLoad threshold={0.2}>
    <Row id="s3" className="m-0 d-flex align-items-center justify-content-center">
      <Col md={10} className="d-flex flex_column s3_bg p-0 m-0 border_creme">
        <Row className="s3_bg_content w-100 justify-content-center align-items-center p-4">
          <Col xl={6} className="d-flex flex-column h-100 ">
             <Row className="pt-5 ">
                <Button variant="primary" className="button_home w-50 m-auto">
                  Dessiner un diffuseur
                </Button>
              </Row>
              <Row className="pt-5"></Row>

            
          
          </Col>
          <Col xl={6} className="s3_guide_text d-flex flex-column h-100 p-5 ">
            <Row className="s3_guide_row">Comment fonctionne un diffuseur ? </Row>
              <Row className="justify-content-evenly pt-4 w-100">
                <Col xl={2} className="text-center">
                  <img src="./s3_guide_i1.png"></img>
                </Col>
               {/*  <Col xl={10}>
                  Une onde sonore qui arrive sur un diffuseur entre en contact avec des cellules de différentes
                  profondeurs, induisant des rebonds dans de multiples directions.
                </Col>{" "}
              </Row> 
              <Row>*/}
                <Col xl={2} className="text-center">
                  <img className="" src="./s3_guide_i2.png"></img>
                </Col>
               {/*  <Col xl={10}>
                  Plus la profondeur de ces cellules est importante, plus le diffuseur sera efficace avec les basses
                  fréquences.
                </Col>{" "}
              </Row> 
              <Row>*/}
                <Col xl={2} className="text-center">
                  <img src="./s3_guide_i3.png"></img>
                </Col>
               {/*  <Col xl={10}>Plus les cellules sont étroites, plus le diffuseur sera efficace dans les aigus.</Col>{" "}
              </Row>
              <Row> */}
                <Col xl={2} className="text-center">
                  <img src="./s3_guide_i4.png"></img>
                </Col>
               {/*  <Col xl={10}>
                  Plus le nombre de cellules est élevé, plus le nombre de rebonds est important et plus le phénomène de
                  diffusion est effectif.import { useSpring } from '@react-spring/web';

                </Col>{" "} */}
              </Row> 
              <Row className="pt-5">
    
              <Col xl={10} className="m-auto">
                  Une onde sonore qui arrive sur un diffuseur entre en contact avec des cellules de différentes
                  profondeurs, induisant des rebonds dans de multiples directions.
                </Col>
              </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </LazyLoad>
);
const S6 = () => (
  <Row id="s4">
    <Marquee pauseOnHover gradient={false} speed={100} className="marquee_diy mt-5">
      <span className="p-5">NOUVEAUTE - Diffuseur en kit à assembler soi-meme - Ideal pour les petits budgets</span>{" "}
      <img src="./logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />
    </Marquee>
    <Col md={6}>Merci pour votre confiance. Quadratik.fr joue cartes sur table avec ces 3 valeurs</Col>
    <Col md={5} className="d-flex border_creme cards align-items-center p-4  ">
      <Col md={4}>
        <img src="./carte_savoir.png" alt="image de la valeur savoir faire" />{" "}
      </Col>
      <Col md={4}>
        <img src="./carte_ecoute.png" alt="image de la valeur savoir faire" />{" "}
      </Col>
      <Col md={4}>
        <img src="./carte_eco.png" alt="image de la valeur savoir faire" />{" "}
      </Col>
    </Col>
    <Col md={1}></Col>
  </Row>
);
const S7 = () => (
  <Row id="s5">
    <Marquee pauseOnHover gradient={false} speed={100} className="marquee_diy ">
      <span className="p-5">Actualites musicales</span>{" "}
      <img src="./logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />{" "}
      <span className="p-5">Mai verra la sortie de Skippy chez Kaona</span>{" "}
      <img src="./logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />
    </Marquee>

    <Row className="contact_row border_creme m-0 p-0">
      <Col sm={1} className="goRight_creme d-flex align-items-center justify-content-center"></Col>
      <Col sm={4} className="goRight_creme d-flex flex-column align-items-center justify-content-center">
        <p>Besoin d'être orienté dans votre projet ?</p>
        <img
          src="logo_orientation.svg"
          alt="Image illustrant un choix à réaliser à partir du logo de Quadratik.fr"
          className="logo_orientation"
        />
      </Col>
      <Col sm={3} className="goRight_creme d-flex flex-column align-items-center justify-content-center p-0 m-0">
        <Row className="bottom_creme w-100 h-100 ">
          <p className="m-auto text-center text-uppercase">Recevoir des bonnes ondes</p>
        </Row>
        <Row className="w-100 h-100 ">
          <p className="m-auto text-center">atelier@quadratik.fr</p>
        </Row>
      </Col>
      <Col sm={3} className="goRight_creme d-flex flex-column align-items-center justify-content-center p-0 m-0">
        <Row className="bottom_creme bg_light w-100 h-100 ">
          {" "}
          <p className="m-auto text-center text-uppercase">Contact direct avec l'artisan</p>{" "}
          <p className="m-auto text-center">06.31.92.74.81</p>
          <p className="m-auto text-center text-uppercase">Discussions sans engagements</p>
        </Row>
        <Row className="w-100 h-100">
          <p className="m-auto text-center text-uppercase">Etude acoustique avec notre partenaire </p>
          <img
            src="./ekleo_logo.png"
            className="ekleo_logo"
            alt="Logo du partenaire principal de Quadratik.fr pour les etudes acoustiques"
          />
          <p className="m-auto text-center text-uppercase">Devis en ligne </p>
        </Row>
      </Col>
      <Col sm={1} className="goRight_creme d-flex flex-column align-items-center justify-content-evenly p-0 m-0 social">
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
);

const Burger = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Col md={1} className="d-flex burger justify-content-center pt-5">
      <Hamburger toggled={isOpen} toggle={setOpen} color="#FFFFFF" />
    </Col>
  );
};

const Home = () => {
  const [scroll, setScroll] = useState(0);
  const [vh, setVh] = useState(0);
  const parallax = useRef(null);

  useEffect(() => {
    const getScroll = (e) => {
      setScroll(e.target.scrollTop);
    };
    setVh(parallax.current.space - 20);
    console.log(parallax.current);
    const container = parallax.current.container.current;
    container.addEventListener("scroll", getScroll);

    return () => {
      container.removeEventListener("scroll", getScroll);
    };
  }, []);

  return (
    <div className="scroller">
      {scroll > vh ? <Burger></Burger> : null}
      <Parallax pages={9.8} ref={parallax}>
        <ParallaxLayer offset={0} speed={0}>
          <S0 />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0} sticky={{ start: 1, end: 2 }}>
          <S1 vh={vh} scroll={scroll} />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.2}>
          <S1_SQUARE />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          <S1_DIF />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.2}>
          <S1_SQUARE />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.5}>
          <S1_ABS />
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0} sticky={{ start: 3, end: 4.7 }}>
          <S2_PRO />
        </ParallaxLayer>

        <ParallaxLayer offset={3.2} speed={0}>
          <S2_HSTUDIO />
        </ParallaxLayer>

        <ParallaxLayer offset={4} speed={0}>
          <S2_STUDIO />
        </ParallaxLayer>
        <ParallaxLayer offset={4.8} speed={0}>
          <S2_IMG />
        </ParallaxLayer>

        <ParallaxLayer offset={5.8} speed={0} sticky={{ start: 5.8, end: 6.8 }}>
          <S5 />
        </ParallaxLayer>

        <ParallaxLayer offset={7.8} speed={0}>
          <S6 />
        </ParallaxLayer>

        <ParallaxLayer offset={8.8} speed={0}>
          <S7 />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
