import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { useDrag } from "react-use-gesture";
import { useSprings, animated, to as interpolate, useInView, useSpring } from "@react-spring/web";
import Moment from "react-moment";
import "moment/locale/fr";
import Image from "next/image";
import finitionsImg from "../../public/images/icones/finition.png";
import controleImg from "../../public/images/icones/controle.png";
import plastiqueImg from "../../public/images/icones/plastique.png";
import enceinteImg from "../../public/images/icones/enceinte.png";
import hacheImg from "../../public/images/icones/hache.png";
import boisImg from "../../public/images/icones/bois.png";
import kmImg from "../../public/images/icones/1380.png";
import interlocuteurImg from "../../public/images/icones/interlocuteur.png";
import singulariteImg from "../../public/images/icones/singularite.png";
import cardTableImg from "../../public/images/home/card_table.png";
import logoMarqueeImg from "../../public/images/logo/logo_marquee.svg";
import TextTruncate from "react-text-truncate";

const cards = ["/images/home/carte_savoirfaire.webp", "/images/home/carte_ecoute.webp", "/images/home/carte_ecoresponsable.webp"];

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
        <animated.div className={"s4_deck"} key={i} style={{ x, y }}>
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

export default function S4_Business () {
  const [visibleCard, setVisibleCard] = useState(3);
  const [ref, inView] = useInView({ once: true });
  /* 
  const [cursorRef, springs] = useInView(
    () => ({
      from: { left: 0 },
      to: { left: 200 },
      reverse: true,
    })

  ) */

  const switchList = (visibleCard) => {
    switch (visibleCard) {
      case 1:
        return (
          <Row className="flex-md-column justify-content-center align-items-center">
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <Image style={{ objectFit: "contain" }} src={interlocuteurImg} className="s4_list_icon me-md-5 m-2" alt="Une icone illustrant un interlocuteur unique lors de la prise contact" /> Unique contact
            </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <Image style={{ objectFit: "contain" }} src={enceinteImg} className="s4_list_icon me-md-5 m-2" alt="Une icone illustrant une enceinte hi-fi" /> La passion du son
            </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <Image style={{ objectFit: "contain" }} src={singulariteImg} className="s4_list_icon me-md-5 m-2" alt="Une icone illustrant la singularité de chaque projet" /> Singularité
            </Col>
          </Row>
        );
      case 3:
        return (
          <Row className=" flex-md-column justify-content-center align-items-center ">
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0 bg">
              <Image style={{ objectFit: "contain" }} src={boisImg} className="s4_list_icon me-md-5 m-2" alt="Une icone illustrant le label du bois issu de forêt gérée de manière ecoresponsable" /> Bois PEFC/FSC
            </Col>
            <Col className="d-flex align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <Image style={{ objectFit: "contain" }} src={kmImg} className="s4_list_icon me-md-5 m-2" alt="Une icone illustrant la France et les limites de livraisons de Quadratik.fr" /> 1380km maximum
            </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <Image style={{ objectFit: "contain" }} src={plastiqueImg} className="s4_list_icon me-md-5 m-2" alt="Une icone illustrant un colis avec embaalage sans plastiques" /> Zero plastique
            </Col>
          </Row>
        );
      case 2:
        return (
          <Row className=" flex-md-column justify-content-center align-items-center">
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <Image style={{ objectFit: "contain" }} src={hacheImg} className="s4_list_icon me-md-5 m-2" alt="Une icone illustrant une hache pour définir le travail manuel de l'artisan" /> Travail manuel
            </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <Image style={{ objectFit: "contain" }} src={controleImg} className="s4_list_icon me-md-5 m-2" alt="Une icone illustrant une checkliste pour le contrôle intégral de chaque produit vendu" /> Contrôle intégral
            </Col>
            <Col className="align-items-center d-flex flex-column flex-md-row p-md-4 ps-0">
              <Image style={{ objectFit: "contain" }} src={finitionsImg} className="s4_list_icon me-md-5 m-2" alt="Une icone illustrant un pinceau caractérisant les finitions personnalisées de chaque produit Quadratik " /> Finitions
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
          <div className="">
            <p className="ft1 pt-4">Ecoresponsabilité</p>
            <TextTruncate
              line={8}
              element="span"
              truncateText="…"
              text={
                "L'intégralité des matières premières est issue du territoire Français. Les livraisons sont assurées uniquement en France afin de garantir une empreinte carbone réduite. Le choix du bois contribue à assurer la pérennité et le renouvellement des forêts. La colle et les peintures utilisées          sont garanties sans solvant et faibles emissions COV. Les emballages sont emmenés systématiquement en déchetterie. A l’exception de la mélamine, aucun produit issu de la famille des plastiques est proposé en boutique de l’entreprise. Les matériaux d’emballage et de calage sont garantis en carton et papier."
              }
              textTruncateChild={<a href="#">En savoir plus</a>}
            />
          </div>
        );
      case 1:
        return (
          <div className="">
            <p className=" ft1 pt-4">A votre écoute</p>
            <TextTruncate
              line={8}
              element="span"
              truncateText="…"
              text={
                "Du début à la fin, vos interrogations et votre projet sont confiés à un seul artisan responsable de la construction des solutions Quadratik. Les différentes expériences reçues depuis plus de 10 ans dans le domaine du son permettent de répondre à vos questions et de faire correspondre au mieux votre situation à vos envies. Le traitement acoustique d'une pièce, dans la plupart des cas déjà existante, demande une reflexion qui est unique à chaque environnement. Une discussion avec vous sera alors une nouvelle aventure avec son lot de défi et d'adaptation." }
              textTruncateChild={<a href="#">En savoir plus</a>}
            />
          </div>
        );
      case 2:
        return (
          <div className="">
            <p className=" ft1 pt-4">Un savoir-faire</p>
            <TextTruncate
              line={8}
              element="span"
              truncateText="…"
              text={
                "            L’essentiel de la transformation, du conditionnement et de son contrôle est réalisé à la main. Les solutions acoustiques Quadratik ne sont pas issues d'un procédé industriel et se dispensent ainsi des erreurs liées au commerce de masse. La qualité esthetique des produits est fondamentale avant l'envoi vers une nouvelle destination. La fabrication artisanale permet également d'adapter les finitions de nos solutions acoustiques selon vos conditions. La marque Quadratik continue chaque jour d'être fière de valoriser son savoir-faire à travers ses produits." }
              textTruncateChild={<a href="#">En savoir plus</a>}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Row id="s4_business" className="section p-0 h-100">
      <Col className="d-flex flex-column">
        <Row>
          <Marquee pauseOnHover gradient={false} speed={40} className="s4_marquee ft1">
            <span className="p-5">NOUVEAUTE - Diffuseur en kit à assembler soi-meme - Ideal pour les petits budgets</span>
            <Image style={{ objectFit: "contain" }} src={logoMarqueeImg} alt="Miniature du logo de l'entreprise Quadratik" />
          </Marquee>
        </Row>
        <Row className="s4_row_business_values justify-content-center align-items-center h-100">
          <Col md={8} className="d-flex flex-column p-0">
            <Row>
              <Col md={2} className="d-none d-md-flex"></Col>
              <Col md={4} className="s4_values_text text-center text-md-start order-md-2 p-md-2 ">
                <Row className="mt-md-0 text-uppercase text-creme">
                  <p className="ft4 pb-md-3">
                    Depuis <Moment diff="2018" unit="years" /> ans
                  </p>
                  <p className="ft05 pb-md-3">Quadratik</p>
                  <p className="ft5">joue cartes sur table !</p>
                  <p ref={ref}></p>
                </Row>
                <Row className="s4_list ft5">{switchList(visibleCard)}</Row>
              </Col>
              <Col md={6} className="order-md-1">
                <div className="s4_cards_container position-relative">
                  <div className="s4_swipe_icon ft05">
                    <i className="fa fa-long-arrow-left " />
                    <i className="fad fa-hand-pointer" />
                    <i className="fa fa-long-arrow-right" />
                  </div>
                  <Image style={{ objectFit: "contain" }} src={cardTableImg} alt="Table des valeurs de l'entreprise Quadratik.fr" className="s4_card_table" />
                  {inView ? <Deck setVisibleCard={setVisibleCard} /> : null}
                </div>
              </Col>
            </Row>
            <Row className="d-md-none">
              <p className="m-0 ft5 text-center text-uppercase"> une acoustique engagée </p>
              <div className="p-4 text-center">
                <Button variant="primary" className="button_home" href="/quadralab?childCat=6&vid=146&dpid=8">
                  - Nos valeurs -
                </Button>
              </div>
            </Row>
          </Col>

          <Col md={4} className="d-none d-md-flex flex-column ">
            <Row>
              <Col md={1}></Col>
              <Col md={10} className="text-justify text-md-end ft4 s4_text">
                {switchText(visibleCard)}
              </Col>
              <Col md={1} className="d-none d-md-flex"></Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
