import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { useDrag } from "react-use-gesture";
import { useSprings, animated, to as interpolate, useInView } from "@react-spring/web";

const cards = ["./carte_savoirfaire.jpg", "./carte_ecoute.jpg", "./carte_ecoresponsable.jpg"];

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

const Deck = ({ setVisibleCard }) => {
  // The set flags all the cards that are flicked out
  const [gone] = useState(() => new Set());

  // Create a bunch of springs using the helpers above
  const [props, api] = useSprings(cards.length, (i) => ({
    from: from(i),
    ...to(i),
  }));

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    // If you flick hard enough it should trigger the card to fly out
    const trigger = velocity > 0.2;
    // Direction should either point left or right
    const dir = xDir < 0 ? -1 : 1;

    // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    if (!down && trigger) {
      gone.add(index);
      console.log();
      setVisibleCard(gone.size);
    }

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
};

export const S4_Business = () => {
  const [visibleCard, setVisibleCard] = useState(3);
  const [ref, inView] = useInView({once : true});

  const switchList = (visibleCard) => {
    switch (visibleCard) {
      case 1:
        return (
          <Row className="pt-4 pb-4 flex-md-column">
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <img src="./icones/interlocuteur.svg" className="s4_list_icon me-md-5 m-2" /> Un seul interlocuteur
            </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <img src="./icones/enceinte.svg" className="s4_list_icon me-md-5 m-2" /> La passion du son
            </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <img src="./icones/singularite.svg" className="s4_list_icon me-md-5 m-2" /> Chaque projet est unique
            </Col>
          </Row>
        );
      case 3:
        return (
      <Row className="pt-4 pb-4 flex-md-column">
            <Col className="d-flex align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <img src="./icones/1380.svg" className="s4_list_icon me-md-5 m-2" /> 1380km maximum
           </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <img src="./icones/bois.svg" className="s4_list_icon me-md-5 m-2" /> Bois PEFC/FSC
           </Col>
           <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <img src="./icones/plastique.svg" className="s4_list_icon me-md-5 m-2" /> Zero plastique
           </Col>
         </Row>
        );
      case 2:
        return (
      <Row className="pt-4 pb-4 flex-md-column">
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <img src="./icones/hache.svg" className="s4_list_icon me-md-5 m-2" /> Travail du bois à la main
           </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <img src="./icones/controle.svg" className="s4_list_icon me-md-5 m-2" /> Contrôle intégral à l'envoi
           </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <img src="./icones/finition.svg" className="s4_list_icon me-md-5 m-2" /> Finition à la demande
           </Col>
         </Row>
        );
      default:
        return null;
    }
  };

  const switchText = (visibleCard) => {
    switch (visibleCard) {
      case 3:
        return (
          <div className="m-md-5">
            <p className="s4_values_text_title pt-4"><h4>Ecoresponsabilité</h4></p>
            L'intégralité des matières premières est issue du territoire Français. Les livraisons sont assurées
            uniquement en France afin de garantir une empreinte carbone réduite. Le choix du bois contribue à assurer la
            pérennité et le renouvellement des forêts. La colle et les peintures utilisées sont garanties sans solvant
            et faibles emissions COV. Les emballages sont emmenés systématiquement en déchetterie. A l’exception de la
            mélamine, aucun produit issu de la famille des plastiques est proposé en boutique de l’entreprise. Les
            matériaux d’emballage et de calage sont garantis en carton et papier.
          </div>
        );
      case 1:
        return (
          <div className="m-md-5">
            <p className=" s4_values_text_title pt-4"><h4>A votre écoute</h4></p>
            Du début à la fin, vos interrogations et votre projet sont confiés à un seul artisan responsable de la
            construction des solutions Quadratik. Les différentes expériences reçues depuis plus de 10 ans dans le
            domaine du son permettent de répondre à vos questions et de faire correspondre au mieux votre situation à
            vos envies. Le traitement acoustique d'une pièce, dans la plupart des cas déjà existante, demande une
            reflexion qui est unique à chaque environnement. Une discussion avec vous sera alors une nouvelle aventure
            avec son lot de défi et d'adaptation.
          </div>
        );
      case 2:
        return (
          <div className="m-md-5">
            <p className=" s4_values_text_title pt-4"><h4>Un savoir-faire</h4></p>
            L’essentiel de la transformation, du conditionnement et de son contrôle est réalisé à la main. Les solutions
            acoustiques Quadratik ne sont pas issues d'un procédé industriel et se dispensent ainsi des erreurs liées au
            commerce de masse. La qualité esthetique des produits est fondamentale avant l'envoi vers une nouvelle
            destination. La fabrication artisanale permet également d'adapter les finitions de nos solutions acoustiques
            selon vos conditions. La marque Quadratik continue chaque jour d'être fière de valoriser son savoir-faire à
            travers ses produits.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Row id="s4_business">
      <Row className="p-0 m-0">
        <Marquee pauseOnHover gradient={false} speed={70} className="s4_marquee">
          <span className="p-5">NOUVEAUTE - Diffuseur en kit à assembler soi-meme - Ideal pour les petits budgets</span>{" "}
          <img
            src="./logo/logo_marquee.svg"
            alt="Miniature du logo de l'entreprise Quadratik"
          />
        </Marquee>
      </Row>
      <Row className="s4_row_business_values">
        <Col md={8} className="d-flex flex-column justify-content-center p-0">
          <Row>
            <Col md={2} className="d-none d-md-flex"></Col>
            <Col md={4}  className="s4_values_text text-center text-md-start order-md-2 p-md-2 ">
                  <Row className="s4_values_header mt-4 mt-md-0 text-uppercase text-creme">
                    <p className="s4_values_subtitles1">Depuis 5 ans</p>
                    <p className=" s4_values_subtitles2">Quadratik</p>
                    <p className="s4_values_subtitles3">joue cartes sur table !</p>
                    <p ref={ref}></p>

                  </Row>
                <Row className="s4_list ft">{switchList(visibleCard)}</Row>
            </Col>
            <Col md={6}  className="order-md-1">
              <div className={"cards_container"}>
                <img
                  src="./card_table.svg"
                  alt="Table des valeurs de l'entreprise Quadratik.fr"
                  className="card_table"
                />
                {inView ? <Deck setVisibleCard={setVisibleCard} /> : null}
             </div>
            </Col>
          </Row>
        </Col>

        <Col md={4} className="d-flex flex-column justify-content-center">
          <Row>
            <Col md={1}></Col>
            <Col md={9} className="text-justify text-md-end ft">
              {switchText(visibleCard)}
            </Col>
            <Col md={2} className="d-none d-md-flex"></Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};
