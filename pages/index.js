import { Button, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Marquee from "react-fast-marquee";

const Home = () => {
  const bg_s1 = "./diffuseur.png";
  const bg_s3 = "./bg_s3.svg";
  return (
    <div>
      <Row id="s0" className="justify-content-between m-0">
        <Row className="header d-none d-md-flex justify-content-end text-uppercase m-0 p-0">
          <Col md={1}>Boutique</Col>
          <Col md={1}>Contact</Col>
          <Col md={1} className="d-none d-md-flex"></Col>
        </Row>
        <Col xs={1} className="d-none d-md-block border_creme cadre_home_gauche"></Col>
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
        <Col xs={1} className="d-none d-md-block border_creme cadre_home_droit"></Col>
      </Row>
      <Row
        id="s1"
        className="justify-content-end m-0 "
        style={{
          backgroundImage: `url(${bg_s1})`,
          backgroundPosition: "left",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Col md={4} className="d-flex flex-column justify-content-around m-2">
          <Row className="text-end">
            <h2>Diffuseurs acoustiques</h2>Le diffuseur Woodik améliore l’acoustique par sa structure irrégulière
            calculée sur une gamme de fréquences
            <p className="text-uppercase pt-2">Fabrication artisanale française</p>
          </Row>
          <Row className="text-end">
            {" "}
            <ListGroup>
              <ListGroup.Item>rééquilibre les ondes sonores</ListGroup.Item>
              <ListGroup.Item>supprime les effets indésirables</ListGroup.Item>
              <ListGroup.Item>le son entoure vos oreilles</ListGroup.Item>
              <ListGroup.Item>les productions sont aérées et précises</ListGroup.Item>
            </ListGroup>
          </Row>
          <Row className="text-uppercase text-center justify-content-center">
            <p>Commande en ligne </p>
            <Button variant="primary" size="lg" className="button_home">
              Entrer dans l'atelier
            </Button>
          </Row>
        </Col>
        <Col md={1}></Col>
      </Row>
      <Row id="s2" className="">
        <div className="d-flex justify-content-evenly">
          <span>Home studio</span>
          <span>Salle de répétition</span>
          <span>Salle des fêtes</span>
          <span>VOUS</span>
          <span>Studio d'enregistrement</span>
          <span>Home cinéma</span>
          <span>Collectivité</span>
        </div>
        <img src="./studio2.svg" alt="image de studio d'enregistrement de musique" />
      </Row>
      <Row id="s3" className="d-flex m-0">
        <div className="d-none d-xl-flex m-0 p-0 justify-content-center">
          <Col className="s3_bg d-flex justify-content-center ">
            <img src="./bg_s3.svg" className="s3_bg_indus_frame" />
            <Row className="s3_bg_content">
              <Col xl={6} className="">
                <Row className="text-uppercase text-center justify-content-center">
                  <p>Sur-mesure en ligne </p>
                  <Button variant="primary" size="lg" className="button_home">
                    Dessiner un diffuseur
                  </Button>
                </Row>
                <Row className="dif_diy">
                  <img src="./dif_diy.svg" alt="Image d'un diffuseur en construction" />
                </Row>
              </Col>
              <Col xl={5} className="s3_guide_text">
                <Row>
                  <Col xl={2} className="text-center">
                    <img src="./s3_guide_i1.png"></img>
                  </Col>
                  <Col xl={10}>
                    Une onde sonore qui arrive sur un diffuseur entre en contact avec des cellules de différentes
                    profondeurs, induisant des rebonds dans de multiples directions.
                  </Col>{" "}
                </Row>
                <Row>
                  <Col xl={2} className="text-center">
                    <img src="./s3_guide_i2.png"></img>
                  </Col>
                  <Col xl={10}>
                    Plus la profondeur de ces cellules est importante, plus le diffuseur sera efficace avec les basses
                    fréquences.
                  </Col>{" "}
                </Row>
                <Row>
                  <Col xl={2} className="text-center">
                    <img src="./s3_guide_i3.png"></img>
                  </Col>
                  <Col xl={10}>Plus les cellules sont étroites, plus le diffuseur sera efficace dans les aigus.</Col>{" "}
                </Row>
                <Row>
                  <Col xl={2} className="text-center">
                    <img src="./s3_guide_i4.png"></img>
                  </Col>
                  <Col xl={10}>
                    Plus le nombre de cellules est élevé, plus le nombre de rebonds est important et plus le phénomène
                    de diffusion est effectif.
                  </Col>{" "}
                </Row>
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
      <Row id="s4">
        <Marquee pauseOnHover gradient={false} className="marquee_diy mt-5">
          <span className="p-5">NOUVEAUTE - Diffuseur en kit à assembler soi-meme - Ideal pour les petits budgets</span> <img src="./logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />
        </Marquee>
        <Col md={6}>Merci pour votre confiance</Col>
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
      <Row id="s5">
      <Marquee pauseOnHover gradient={false} className="marquee_diy ">
      <span className="p-5">Actualites musicales</span>  <img src="./logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />  <span className="p-5">Mai verra la sortie de Skippy chez Kaona</span>   <img src="./logo_marquee.svg" alt="Miniature du logo de l'entreprise Quadratik" className="logo_marquee" />
        </Marquee>

        <Row className="contact_row border_creme m-0 p-0">
          <Col sm={1} className="left_creme d-flex align-items-center justify-content-center"></Col>
          <Col sm={4} className="left_creme d-flex flex-column align-items-center justify-content-center"><p>Besoin d'être orienté dans votre projet ?</p><img src="logo_orientation.svg" alt="Image illustrant un choix à réaliser à partir du logo de Quadratik.fr" className="logo_orientation" /></Col>
          <Col sm={3} className="left_creme d-flex flex-column align-items-center justify-content-center p-0 m-0"><Row className="bottom_creme w-100 h-100 "><p className="m-auto text-center text-uppercase">Recevoir des bonnes ondes</p></Row><Row className="w-100 h-100 "><p className="m-auto text-center">atelier@quadratik.fr</p></Row></Col>
          <Col sm={3} className="left_creme d-flex flex-column align-items-center justify-content-center p-0 m-0"><Row className="bottom_creme w-100 h-100 "> <p className="m-auto text-center text-uppercase">Contact direct avec l'artisan</p> <p className="m-auto text-center">06.31.92.74.81</p> <p className="m-auto text-center text-uppercase">Discussions sans engagements</p></Row>
          <Row className="w-100 h-100"><p className="m-auto text-center text-uppercase">Etude acoustique avec notre partenaire </p><img src="./ekleo_logo.png" className="ekleo_logo" alt="Logo du partenaire principal de Quadratik.fr pour les etudes acoustiques" /><p className="m-auto text-center text-uppercase">Devis en ligne </p></Row></Col>
          <Col sm={1} className="left_creme d-flex flex-column align-items-center justify-content-evenly p-0 m-0 social"><i className="fab fa-facebook-square" size="6x"></i><i className="fab fa-twitter-square"></i></Col>
        </Row>
      </Row>
    </div>
  );
};

export default Home;
