import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { useDrag } from 'react-use-gesture';
import { useSprings, animated, to as interpolate } from "@react-spring/web";


export const S4_Business = () => {

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

  const [CardGone, setCardGone] = useState(() => new Set());
  console.log(CardGone);

  return (
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
              <hr />
              <p className="m-5">
                Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme
                assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait
                que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en
                soit modifié. Il a été popularisé dans les .
              </p> <hr />
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};
