import React from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { LayoutHome } from "../../components/LayoutHome";
import Image from "next/image";
import back2d from "../../public/images/accroches/2dback.png";
import placo2d from "../../public/images/accroches/2dplaco.png";
import placoprofile2d from "../../public/images/accroches/2dplacoprofile.png";
import placosimple2d from "../../public/images/accroches/2dplacosimple.png";
import plafond2d from "../../public/images/accroches/2dplafond.png";
import patron from "../../public/images/accroches/patron.png";
import patron2 from "../../public/images/accroches/patron2.png";
import vis from "../../public/images/accroches/vis.png";
import molly from "../../public/images/accroches/molly.png";
import bascule from "../../public/images/accroches/bascule.png";
import bascule2 from "../../public/images/accroches/bascule2.png";
import cimaise from "../../public/images/accroches/cimaise.jpg";
import motif from "../../public/images/accroches/motif.png";

const Accroche = () => {
  return (
    <>
      <LayoutHome shop home fixed dark />
      <Container fluid className="d-flex justify-content-center ">
        <Col md={10} lg={8} className="blog text_dark">
          <Row className="layout_space">
            <div className="d-flex text-center mt-4 ">
              <Col>
                <i className="fas fa-tag"></i> Catégorie
                <Badge bg="secondary" className="text-dark">
                  {" "}
                  FAQ
                </Badge>
              </Col>{" "}
              <Col>
                <i className="fas fa-calendar-alt"></i> Date
                <Badge bg="secondary" className="text-dark">
                  {" "}
                  28-11-2019
                </Badge>
              </Col>{" "}
              <Col>
                <i class="fas fa-history"></i> Lecture{" "}
                <Badge bg="secondary" className="text-dark">
                  3min
                </Badge>{" "}
              </Col>{" "}
            </div>
            <article className="p-5 ft4">
              <h2 className="title_blog mt-2 mb-3"> Comment accrocher les modèles Quadratik ?</h2>
              <div className="bandeau mt-5 mb-5"></div>
              <p className="pb-4">Vous avez le projet de vous procurer des modèles Quadratik et vous souhaitez savoir comment est-il possible de les fixer dans votre pièce ?</p>
              <p className="pb-4">Votre espace est en location ? Vos murs en béton ou en plaques de plâtre ? Comment les faire tenir au plafond sans que cela tombe sur vous ? </p>
              <p>Quadratik a pensé à tout !</p>
              <hr></hr>

              <Row className="text-center">
                <h3 className="mt-5 mb-5">4 accroches à l'arrière des modèles Quadratik</h3>
                <Col md={6}>
                  <Card className="bg_creme_light text-dark m-2">
                    <Card.Header>
                      <Image alt="Arrière d'un diffuseur 2D avec accroches visibles" src={back2d} className=" w-100 " height={400} style={{ objectFit: "contain" }} />
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Diffuseur 2D</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="bg_creme_light text-dark m-2">
                    <Card.Header>
                      <Image alt="Arrière d'un diffuseur 1D avec accroches visibles" src={back2d} className=" w-100 " height={400} style={{ objectFit: "contain" }} />
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Diffuseur 1D</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <h3 className="mt-5 mb-5">I - Fixation aux murs (Placo®, bois, brique, béton )</h3>

              <div className="d-flex flex-wrap mt-4 text-center ">
               <Col md={6}><Card className="bg_creme_light text-dark m-2">
                  <Card.Header>
                    <Image alt="Fixation diffuseur 2D dans cloison placo avec une seule vis" src={placoprofile2d} height={500} className="d-block w-100 " style={{ objectFit: "contain" }}></Image>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Percer/Visser/Accrocher</Card.Title>
                    <Card.Text className="ft800 mb-2">Placer le modèle Quadratik comme un cadre photo</Card.Text>
                    <Card.Text className="text-justify">Visser dans la cloison et laisser dépasser la tête de vis de 1 cm et accrocher tous les modèles Quadratik avec la plus simple des manières.</Card.Text>
                  </Card.Body>
                </Card></Col> 
                <Col md={6}><Card className="bg_creme_light text-dark m-2">
                  <Card.Header>
                    <Image alt="Fixation diffuseur 2D dans cloison placo avec une seule vis" src={placosimple2d} className="d-block w-100 " style={{ objectFit: "contain" }}></Image>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Pour les tailles inférieures à 60x60cm</Card.Title>
                    <Card.Text className="ft800 mb-2">Les modèles classiques de tailles standard</Card.Text>
                    <Card.Text className="text-justify">
                      Le modèle Quadratik ne necessite que d'une seule vis + cheville en partie supérieure. L'accrochage se réalise comme celui d'un cadre photo. Le poids inférieur à 6Kg est largement supporté par un ensemble vis/cheville. Ce système rudimentaire peut être toutefois completé d'une
                      autre vis si l'on souhaite assembler le modèle en juxtaposition et ainsi contraindre tous les mouvements dans l'espace.{" "}
                    </Card.Text>
                  </Card.Body>
                </Card></Col>
                <Col md={6}><Card className="bg_creme_light text-dark m-2">
                  <Card.Header>
                    <Image alt="Fixation diffuseur 2D dans cloison placo avec plusieurs vis" src={placo2d} className="d-block w-100 " style={{ objectFit: "contain" }}></Image>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Pour les tailles supérieures à 60x60cm</Card.Title>
                    <Card.Text className="ft800 mb-2">Les modèles larges</Card.Text>
                    <Card.Text className="text-justify">
                      La fixation du modèle avec deux ensembles vis/cheville placés de part et d'autre est recommandée. Le poids pouvant être supérieur à 6Kg est largement supporté par deux ensembles vis/cheville. Ce type d'accrochage est aussi recommandé lorsque que l'on place plusieurs modèles en
                      juxtaposition.{" "}
                    </Card.Text>
                  </Card.Body>
                </Card></Col>
                <Col md={6}><Card className="bg_creme_light text-dark m-2">
                  <Card.Header>
                    <Image alt="Vis et cheville pour fixer les diffuseurs/absorbeurs Quadratik" src={molly} height={500} className="d-block w-100 " style={{ objectFit: "contain" }}></Image>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Les chevilles à expansion</Card.Title>
                    <Card.Text className="ft800 mb-2">Pour les modèles larges sur cloison creuse</Card.Text>
                    <Card.Text className="text-justify mb-2">
                      Les vis à expansion, couramment connue sous la marque Molly® convient aux modèles particulièrement lourds lorsqu'ils doivent être accrochés sur des cloisons creuses. Ces chevilles spéciales peuvent être ajoutées au panier lors de votre commande au même prix que les grandes
                      surfaces de bricolage. Ces vis/chevilles sont proposées le plus souvent en 8mm de diamètre.
                    </Card.Text>
                    <Button variant="primary">Commander en boutique</Button>
                  </Card.Body>
                </Card></Col>
                <Col md={6}><Card className="bg_creme_light text-dark m-2">
                  <Card.Header>
                    <Image alt="Vis et cheville pour fixer les diffuseurs/absorbeurs Quadratik" src={vis} height={400} className="d-block w-100 " style={{ objectFit: "contain" }}></Image>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Les vis/chevilles pour tout types de murs</Card.Title>
                    <Card.Text className="ft800 mb-2">De la cloison Placo® au mur en béton</Card.Text>
                    <Card.Text className="text-justify mb-2">Cet ensemble de vis/cheville adapté aux modèles Quadratik peut être ajouté au panier lors de votre commande au même prix que les grandes surfaces de bricolage. Ces vis/chevilles sont proposées en 6mm ou 8mm de diamètre.</Card.Text>
                    <Button variant="primary">Commander en boutique</Button>
                  </Card.Body>
                </Card></Col>
                
              </div>
              <h3 className="mt-5 mb-5">II - Fixation aux plafonds (Placo®, béton )</h3>

              <Row className="text-center">
                <Card className="bg_creme_light text-dark m-2">
                  <Card.Header>
                    <Image alt="Fixation diffuseur 2D au plafond" src={plafond2d} height={400} className="d-block w-100 " style={{ objectFit: "cover" }}></Image>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Une fixation robuste pour plafond creux</Card.Title>
                    <Card.Text className="ft800 mb-2">Pour tous les modèles Quadratik</Card.Text>
                    <Card.Text className="text-justify">Les cheviles à bascule permettent l'accrochage de tous les modèles Quadratik sur les plafonds creux. L'insertion de la vis dans le perçage permet la mise en place d'une bascule sur ressort qui maintient le modèle au plafond. </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="bg_creme_light text-dark m-2">
                  <Card.Header>
                    <Image alt="Cheville à bascule pour fixer les moèdles QUadratik au plafond" src={bascule2} height={400} className="d-block w-100 " style={{ objectFit: "contain" }}></Image>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Les chevilles à bascule</Card.Title>
                    <Card.Text className="ft800 mb-2">Pour les plafonds creux</Card.Text>
                    <Card.Text className="text-justify mb-2">
                      Les chevilles à bascule conviennent à tous les modèles lorsqu'ils doivent être accrochés au plafond. Ces chevilles spéciales peuvent être ajoutées au panier lors de votre commande au même prix que les grandes surfaces de bricolage. Ces vis/chevilles necessite un perçage avec un
                      diamètre plus important.
                    </Card.Text>
                    <Button variant="primary">Commander en boutique</Button>
                  </Card.Body>
                </Card>
              </Row>
              <h3 className="mt-5 mb-5">III - Les fixations particulières</h3>

              <Row className="text-center">
                <Card className="bg_creme_light text-dark m-2">
                  <Card.Header>
                    <Image alt="Accrocher un diffuseur avec une cimaise" src={cimaise} className="d-block w-100 "  style={{ objectFit: "contain" }}></Image>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Fixation avec une cimaise</Card.Title>
                    <Card.Text className="ft800 mb-2">Pour les surfaces que l'on ne souhaite pas perçer</Card.Text>
                    <Card.Text className="text-justify">
                      {" "}
                      Il existe parfois des surfaces difficiles à perçer comme la pierre ou encore des surfaces que l'on souhaite garder intactes. Pour ces raisons, l'utilisation de cimaises peuvent être conseillées afin d'accrocher les modèles Quadratik. Lors de votre commande, vous pouvez demander
                      la fourniture de cimaise via la rubrique Contact.{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
              <h3 className="mt-5 mb-5">IV - Demander votre patron de perçage Quadratik!</h3>

              <Row className="text-center">
                <Card className="bg_creme_light text-dark m-2">
                  <Card.Header>
                    <Image alt="Réaliser votre perçage à l'aide d'un patron" src={patron} className="d-block w-100 " height={400} style={{ objectFit: "contain" }}></Image>
                    <Image alt="Photographie d'un exemple de patron de perçage" src={patron2} className="d-block w-100 " height={400} style={{ objectFit: "contain" }}></Image>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Un perçage encore plus facile </Card.Title>
                    <Card.Text className="mb-2">
                      Si vous souhaiter positionner votre modèle Quadratik au milimètre près, vous pouvez avoir recours à nos patrons de perçage. Possitionner le patron adapté au modèle commandé contre votre mur, plafond, à coté d'un autre modèle et réaliser directement le perçage dans le trou
                      pré-destiné. Vous pouvez même faire une marque au crayon autours du patron pour en réaliser plusieurs à la suite sans aucune autre manipulation.
                    </Card.Text>{" "}
                  </Card.Body>
                </Card>
              </Row>
            </article>
            <p>Partager  <i className="fab fa-facebook m-2"></i><i className="fas fa-link m-2"></i> </p>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default Accroche;
