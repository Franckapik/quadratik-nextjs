import { Turn as Hamburger } from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Marquee from "react-fast-marquee";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import LazyLoad from "react-lazy-load";
import { useSpring, useSprings, animated, config, easings, to as interpolate } from "@react-spring/web";

import { useDrag } from "react-use-gesture";

const cards = ["./carte_savoirfaire.jpg", "./carte_ecoresponsable.jpg", "./carte_ecoute.jpg"];

// Initials values of cards props.  These two are just helpers, they conserve spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const Deck = ({setCardGone}) =>  {
  // The set flags all the cards that are flicked out
  const [gone] = useState(() => new Set()); 
  
  // Create a bunch of springs using the helpers above
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); 

  

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
// If you flick hard enough it should trigger the card to fly out
    const trigger = velocity > 0.2; 
// Direction should either point left or right
    const dir = xDir < 0 ? -1 : 1; 

// If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    if (!down && trigger) {
      
      gone.add(index)
      setCardGone(gone)

    }; 
    api.start((i) => {
      if (index !== i) return; // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1; // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });
    //refill deck when no more cards
    if (!down && gone.size === cards.length)
      setTimeout(() => {
        gone.clear();
        api.start((i) => to(i));

      }, 600);
  });
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={"deck"} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </animated.div>
      ))}
    </>
  );
}

const useAnimatedPath = ({ toggle, delay, onRest, duration }) => {
  const [length, setLength] = useState(null);
  const animatedStyle = useSpring({
    strokeDashoffset: toggle ? 0 : length,
    strokeDasharray: length,
    delay,
    onRest: onRest,
    config: {
      easing: easings.easeInOutCubic,
      duration: duration,
      ...config.slow,
    },
  });

  return {
    style: animatedStyle,
    ref: (ref) => {
      if (ref) {
        setLength(ref.getTotalLength());
      }
    },
  };
};

const AnimatedLogo = ({ toggle }) => {
  const animatedProps = useAnimatedPath({ toggle, delay: 0, duration: 1000 });

  return (
    <>
      <animated.rect width="27.1" height="27.078" ry="0" x="65.876" y="65.858" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" ry="0" x="65.876" y="65.858" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" x="107.02" y="65.858" ry="0" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" x="107.024" y="107.064" ry="0" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" x="65.88" y="107.064" ry="0" {...animatedProps} />
    </>
  );
};
const AnimatedLogo2 = ({ toggle, setLoading }) => {
  const animatedProps = useAnimatedPath({ toggle, delay: 800, onRest: () => setLoading(true), duration: 1000 });

  return (
    <>
      <animated.rect
        width="27.1"
        height="27.078"
        x="-34.124"
        y="107.28"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps}
      />
      <animated.rect
        width="27.1"
        height="27.078"
        x="7.021"
        y="107.28"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps}
      />
      <animated.rect
        width="27.1"
        height="27.078"
        x="7.024"
        y="148.485"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps}
      />
      <animated.rect
        width="27.1"
        height="27.078"
        x="-34.12"
        y="148.485"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps}
      />{" "}
    </>
  );
};
const AnimatedSquare = ({ toggle }) => {
  const animatedProps = useAnimatedPath({ toggle, delay: 0, duration: 3000 });

  return <animated.rect x="0" y="0" fill="none" width="100%" height="100%" {...animatedProps} />;
};

const S0_Landing = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(true);
  }, []);

  const [loaded, setLoading] = useState(false);

  const [goRight, apiGoRight] = useSpring(() => ({
    from: { x: 0 },
  }));
  const [goLeft, apiGoLeft] = useSpring(() => ({
    from: { x: 0 },
  }));

  useEffect(() => {
    if (loaded) {
      apiGoRight.start({
        from: { x: 0 },
        to: { x: 200 },
      });

      apiGoLeft.start({
        from: { x: 0 },
        to: { x: -200 },
      });
    }
  }, [loaded]);

  return (
    <Row id="s0_landing" className="justify-content-between m-0">
      {loaded ? (
        <Row className="header d-none d-md-flex justify-content-end text-uppercase m-0 p-0">
          <Col md={1}>Boutique</Col>
          <Col md={1}>Contact</Col>
          <Col md={1} className="d-none d-md-flex"></Col>
        </Row>
      ) : null}
      <Col xs={1} className="d-none d-md-block m-0 p-0 ">
        {" "}
        {loaded ? <animated.div style={goRight} className="border_creme cadre_home_gauche"></animated.div> : null}
      </Col>
      <Col xs={10} sm={8} md={5} className="d-flex flex-wrap justify-content-center align-items-center">
        <Row className="logo_cadre ">
          <svg xmlns="http://www.w3.org/2000/svg" stroke="#D0C3B4" stroke-width="2">
            <AnimatedSquare toggle={loaded} />
          </svg>
        </Row>
        <Col className="logo_row d-flex flex-column justify-content-center align-items-center text-center">
          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <g transform="" fill="none" stroke="#D0C3B4" stroke-width="1" stroke-linecap="square">
              <AnimatedLogo toggle={toggle} />
              <AnimatedLogo2 toggle={toggle} setLoading={setLoading} />
            </g>
          </svg>
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

const S1_Product = ({ vh, scroll }) => {
  return (
    <Row id="s1_product_product" className="justify-content-end m-0 ">
      <Col md={5}></Col>
      <Col md={5} className="d-flex flex-column p-4 m-auto ">
        <Row className="text-center s1_product_text_presentation">
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
        <Row className="s1_product_list align-items-center text-center">
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

const S1_Square = () => {
  return (
    <Row id="s1_square" className="justify-content-start align-items-center m-0 ">
      <Col md={5} className="border_creme s1_square text-end pt-3">
        {" "}
        Le diffuseur Woodik-7
      </Col>
      <Col md={1}></Col>
    </Row>
  );
};

const S1_Dif = () => {
  const bg_s1 = "./diffuseur4.png";

  return (
    <Row
      id="s1_product_dif"
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
const S1_Abs = () => {
  const bg_s2 = "./absorbeur.png";
  return (
    <Row
      id="s1_product_abs"
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

const S2_Customers = () => (
  <Row id="s2_customers" className="p-0 m-0">
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
      </Row>
      <Row className="justify-content-start">
        <Col md={2} className="dark_bg">
          {" "}
        </Col>
        <Col md={8} className="d-flex align-items-center m-0 p-0 "></Col>
        <Col md={2} className="dark_bg"></Col>
      </Row>
    </Col>
  </Row>
);

const S2_HomeStudio = () => (
  <Row id="s2_homeStudio" className="justify-content-start">
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
const S2_ProStudio = () => (
  <Row id="s2_proStudio">
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
const S2_RealPreview = () => (
  <Row id="s2_realPreview">
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
const S3_DIY = () => {
  {
    /*const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

    <div className={container} onClick={() => set(state => !state)}>
      <a.div
        className={"bg-red"}
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      />
       <a.div
        className={`${c} ${front}`}
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }} 
      />
      </div>*/
  }

  return (
    <LazyLoad threshold={0.2}>
      <Row id="s3_diy" className="m-0 d-flex align-items-center justify-content-center">
        <Col md={10} className="d-flex flex_column s3_diy_bg p-0 m-0 border_creme">
          <Row className="s3_diy_bg_content w-100 justify-content-center align-items-center p-4">
            <Col xl={6} className="d-flex flex-column h-100 ">
              <Row className="pt-5 ">
                <Button variant="primary" className="button_home w-50 m-auto">
                  Dessiner un diffuseur
                </Button>
              </Row>
              <Row className="pt-5"></Row>
            </Col>
            <Col xl={6} className="s3_diy_guide_text d-flex flex-column h-100 p-5 ">
              <Row className="s3_diy_guide_row">Comment fonctionne un diffuseur ? </Row>
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
};

const S4_Business = () => {

  const [CardGone, setCardGone] = useState(() => new Set());
  console.log(CardGone) 

  return(
  <Row id="s4_business">
    <Row>
      <Marquee pauseOnHover gradient={false} speed={100} className="marquee_diy mt-5">
        <span className="p-5">NOUVEAUTE - Diffuseur en kit à assembler soi-meme - Ideal pour les petits budgets</span>{" "}
        <img src="./logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />
      </Marquee>
    </Row>
    <Row className="row_business_values">
      <Col md={8} className="d-flex flex-column justify-content-center">
        <Row>
          <Col md={1}></Col>
          <Col md={6}>
            <div className={"cards_container"}>
              <img src="./card_table.svg" alt="Table des valeurs de l'entreprise Quadratik.fr" className="card_table" />
              <Deck setCardGone={setCardGone} />
            </div>
          </Col>
          <Col md={5} className="values_text text-left ps-5">
            <Row className="values_header text-uppercase text-creme">
              <p className="ps-1 mt-0 m-1 values_subtitles1">Depuis 5 ans {CardGone.has(1) ? "oui" : "non"}</p>
              <p className="p-0 m-1 values_subtitles2">Quadratik</p>
              <p className="ps-1 m-1 values_subtitles3">joue cartes sur table !</p>
            </Row>
            <div className="pt-4">
              <Row className="align-items-center p-4 ps-0">
                <img src="./icones/interlocuteur.svg" className="me-4" /> Un seul interlocuteur
              </Row>
              <Row className="align-items-center p-4 ps-0">
                <img src="./icones/enceinte.svg" className="me-4" /> La passion du son
              </Row>
              <Row className="align-items-center p-4 ps-0">
                <img src="./icones/singularite.svg" className="me-4" /> Chaque projet est unique
              </Row>
            </div>
          </Col>
        </Row>
      </Col>

      <Col md={4} className="d-flex flex-column justify-content-center">
        <Row>
        <Col md={2}></Col>
        <Col md={9} className="values_presentation">
        <hr  />
        <p className = "m-5">
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
          Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme
          assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait
          que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en
          soit modifié. Il a été popularisé dans les .
         </p> <hr  />
        </Col>
        </Row>
      </Col>
    </Row>
  </Row>
  )
};

const S5_Contact = () => (
  <Row id="s5_contact">
    <Marquee pauseOnHover gradient={false} speed={100} className="marquee_diy ">
      <span className="p-5">Actualites musicales</span>{" "}
      <img src="./logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />{" "}
      <span className="p-5">Mai verra la sortie de Skippy chez Kaona</span>{" "}
      <img src="./logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />
    </Marquee>

    <Row className="contact_row border_creme m-0 p-0">
      <Col sm={1} className="right_creme d-flex align-items-center justify-content-center"></Col>
      <Col sm={4} className="right_creme d-flex flex-column align-items-center justify-content-center">
        <p>Besoin d'être orienté dans votre projet ?</p>
        <img
          src="logo_orientation.svg"
          alt="Image illustrant un choix à réaliser à partir du logo de Quadratik.fr"
          className="logo_orientation"
        />
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
          <S0_Landing />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0} sticky={{ start: 1, end: 2 }}>
          <S1_Product vh={vh} scroll={scroll} />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.2}>
          <S1_Square />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          <S1_Dif />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.2}>
          <S1_Square />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.5}>
          <S1_Abs />
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0} sticky={{ start: 3, end: 4.7 }}>
          <S2_Customers />
        </ParallaxLayer>
        <ParallaxLayer offset={3.2} speed={0}>
          <S2_HomeStudio />
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0}>
          <S2_ProStudio />
        </ParallaxLayer>
        <ParallaxLayer offset={4.8} speed={0}>
          <S2_RealPreview />
        </ParallaxLayer>
        <ParallaxLayer offset={5.8} speed={0} sticky={{ start: 5.8, end: 6.8 }}>
          <S3_DIY />
        </ParallaxLayer>
        <ParallaxLayer offset={7.8} speed={0}>
          <S4_Business />
        </ParallaxLayer>
        <ParallaxLayer offset={8.8} speed={0}>
          <S5_Contact />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
