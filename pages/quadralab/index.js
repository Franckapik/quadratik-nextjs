import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Modal, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Layout } from "../../components/Layout";
import { objectsInCategory } from "../../components/dolibarrApi/fetch";
import ProductCanvas from "../../components/quadralab/ProductCanvas";
import QuadralabOptions from "../../components/quadralab/QuadralabOptions";
import { useProductStore } from "../../hooks/store";
import { useAttributes } from "../../hooks/useAttributes";
import Link from "next/link";

const DiffusorTable = ({ report2D, value }) => {
  return (
    <Table striped bordered hover className="text-center">
      <tbody>
        {Array(report2D.Cells) //cellules
          .fill("")
          .map((a, index) => {
            const n = index % report2D.Type;
            if (n === 0) {
              return (
                <tr>
                  {Array(report2D.Type) //cellules
                    .fill("")
                    .map((a, i) => {
                      return <td>{report2D[Math.floor(index / report2D.Type) * report2D.Type + i][value]}</td>;
                    })}
                </tr>
              );
            }
          })}
      </tbody>
    </Table>
  );
};

const QuadralabPerformances = ({ nomenclature, fmin, fmax, cwidth, weightPoplar, report2D, area, volume, sizes, woodArea, woodVolume }) => {
  return (
    <Col className="flex flex-column quadralab_hud_col quadralab_params quadralab_game_border bg_darker">
      <Row>
        <p className="text-center w-100 mt-4 mb-4 p-3"> REF : {nomenclature?.structurel} </p>
        <PerformanceWidget icon="fad fa-bolt" value={`${fmin} Hz - ${fmax} Hz`} color="red" performance={((fmax - fmin) * 100) / 10000} tooltip={"La plage de fréquence traitée"} /> {/* 10k audio frequency */}
        <PerformanceWidget icon="fad fa-sort-size-down" value={`${(cwidth * 10).toFixed(0)} mm`} color="red" performance={100 - (cwidth * 10 * 100) / 90} tooltip={"La taille des cellules. Plus elle est petite, plus les aigus sont traités"} />
        <PerformanceWidget icon="fad fa-weight" value={`${weightPoplar} kg // ${report2D?.lengthWells?.toFixed(0)} cm`} color="red" performance={(weightPoplar * 100) / 30} tooltip={"Le poids du diffuseur estimé si construit en peuplier. La longueur totale des hauteurs de puits du diffuseur"} />
        <PerformanceWidget icon="fad fa-box-open" value={`${area} m2 // ${volume} m3`} color="red" performance={(volume * 100) / 0.144} tooltip={"L'aire traitée par le diffuseur et le volume (boite) qu'il occupe"} /> {/* 120 * 60 * 20cm */}
      </Row>
      {/*       <DiffusorView2D sizes={sizes} area={area} volume={volume} fmin={fmin} woodArea={woodArea} woodVolume={woodVolume} />
      <Row>
        <p>Fabrication d'un modèle Quadratik sur mesure </p>
        <p>
          {sizes?.longueur} x {sizes?.largeur} x {sizes?.profondeur} cm
        </p>

        <Button variant="primary" type="submit" className="quadralab_devis_button m-auto mt-4">
          Demander un devis
        </Button>
      </Row>*/}
    </Col>
  );
};

const DiffusorView2D = ({ sizes, area, volume, fmin, woodArea, woodVolume }) => {
  const report2D = useProductStore((state) => state.report2D);
  const ratio = useProductStore((state) => state.ratio);

  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const D = report2D.Cells === report2D.Type;
  const hauteurs = Object.values(report2D)
    .map((a, i) => a.hauteur)
    .filter((item) => item); //no undefined
  const hauteurCount = {};

  hauteurs.forEach((element) => {
    hauteurCount[element] = (hauteurCount[element] || 0) + 1;
  });
  return (
    <Row>
      <Row className="">
        {Array(report2D.Type)
          .fill("")
          .map((a, i) => {
            return <Col className="text-center">{ratio ? report2D[i]?.ratio : report2D[i]?.hauteur}</Col>;
          })}
      </Row>
      <Row className="align-items-end">
        {Array(report2D.Type)
          .fill("")
          .map((a, i) => {
            return <Col className="border_creme" style={{ height: report2D[i]?.ratio * 10 }}></Col>;
          })}
      </Row>
      <Row className="">
        {Array(report2D.Type)
          .fill("")
          .map((a, i) => {
            return <Col className="text-center">{i}</Col>;
          })}
      </Row>
      <span onClick={handleShow}>Obtenir le rapport détaillé</span>

      <Modal show={show} onHide={handleClose} className="text_dark" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Rapport de fabrication d'un diffuseur Quadratik</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              Dimensions du diffuseur (l x L x P) :{" "}
              <span className="ft2">
                {sizes?.largeur} cm x {sizes?.longueur} cm x {sizes?.profondeur} cm
              </span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Aire du diffuseur : <span className="ft2">{area} m2</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Volume du diffuseur : <span className="ft2">{volume} m3</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Type de diffuseur :{" "}
              <span className="ft2">
                N{report2D.Type} - {D ? "1D" : "2D"}
              </span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Fréquence de design : <span className="ft2">{fmin} Hz</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Nombre de puits/cellules : <span className="ft2">{report2D.Cells}</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Epaisseur des parois : <span className="ft2">{report2D.Thickness * 10} mm</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Décalage de cellules en vertical : <span className="ft2">{report2D.ShiftVert}</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Décalage de cellules en horizontal : <span className="ft2">{report2D.ShiftHor}</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Nombre de hauteur de cellules différentes: <span className="ft2">{report2D.MaxDepth}</span>{" "}
            </ListGroup.Item>
          </ListGroup>
          <Row className="align-items-end">
            <p>{D ? "Rangée du diffuseur 1D" : "1ere rangée du diffuseur 2D"}</p>
            {Array(report2D.Type)
              .fill("")
              .map((a, i) => {
                return <Col className="border_creme" style={{ height: report2D[i]?.ratio * 10 }}></Col>;
              })}
            <p>Ratio</p>
            <DiffusorTable report2D={report2D} value="ratio" />
            <p>Hauteur</p>
            <DiffusorTable report2D={report2D} value="hauteur" />
          </Row>
          <Row>
            <ListGroup>
              <ListGroup.Item>
                Nombre de puits vides :<span className="ft2">{Object.values(report2D).filter((val) => val.hauteur === 0).length}</span>{" "}
              </ListGroup.Item>
              {Object.entries(hauteurCount)
                .sort((a, b) => a[0] - b[0])
                .map((a, i) => {
                  return (
                    <ListGroup.Item>
                      {a[1]} bloc(s) de ratio {i + 1} ou hauteur {a[0]} cm
                    </ListGroup.Item>
                  );
                })}
              <ListGroup.Item>
                Longueur totale des blocs:
                <span className="ft2"> {report2D.lengthWells?.toFixed(2)} cm</span>{" "}
              </ListGroup.Item>
            </ListGroup>
            <p>Travail du bois</p>
            <ListGroup>
              <ListGroup.Item>
                Surface de bois découpée:
                <span className="ft2"> {woodArea?.toFixed(4)} m2</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Volume de bois découpé:
                <span className="ft2"> {woodVolume?.toFixed(4)} m3</span>
              </ListGroup.Item>
            </ListGroup>

            <p>Poids estimé</p>
            <ListGroup>
              <ListGroup.Item>
                MDF:
                <span className="ft2"> {(woodVolume * 700).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Bois de pin:
                <span className="ft2"> {(woodVolume * 550).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Bois de Cedre:
                <span className="ft2"> {(woodVolume * 380).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Mousse Styrofoam:
                <span className="ft2"> {(woodVolume * 90).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Bois de Balsa:
                <span className="ft2"> {(woodVolume * 120).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Contreplaqué ordinaire:
                <span className="ft2"> {(woodVolume * 580).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Contreplaqué bouleau:
                <span className="ft2"> {(woodVolume * 700).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Contreplaqué peuplier:
                <span className="ft2"> {(woodVolume * 530).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Plâtre:
                <span className="ft2"> {(woodVolume * 850).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Bois d'Eucalyptus:
                <span className="ft2"> {(woodVolume * 900).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Verre:
                <span className="ft2"> {(woodVolume * 252).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Granite:
                <span className="ft2"> {(woodVolume * 270).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Aluminium:
                <span className="ft2"> {(woodVolume * 280).toFixed(2)} kg</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Acier:
                <span className="ft2"> {(woodVolume * 800).toFixed(2)} kg</span>
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

const PerformanceWidget = ({ icon, value, color, performance, tooltip }) => {
  return (
    <OverlayTrigger key={"left"} placement={"left"} overlay={<Tooltip id={`tooltip-${value}`}>{tooltip}</Tooltip>}>
      <Row className="">
        <div className="flex quadralab_round quadralab_game_border bg_dark ">
          <i className={icon}></i>
        </div>
        <div className="flex quadralab_line quadralab_game_border ">
          <div className="bg_red h-100" style={{ width: `${performance}%`, maxWidth: "100%", backgroundColor: color }}></div>
        </div>
        <p className="text-end">{value}</p>
      </Row>
    </OverlayTrigger>
  );
};

const Quadralab = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();

  const [defaultProduct, setDefaultProduct] = useState({});
  const [loading, setLoading] = useState(false);

  //get default product from tag category
  const [tag, setCategories] = useQueryState("TAG", queryTypes.integer.withDefault(1));
  useProductStore.setState({ tag: tag }); //global state
  const methods = useForm();

  const report2D = useProductStore((state) => state.report2D);
  const sizes = useProductStore((state) => state.sizes);
  const cwidth = useProductStore((state) => state.cwidth);
  const area = (sizes.longueur * sizes.largeur) / 1000;
  const volume = ((area * sizes.profondeur) / 1000).toFixed(5);
  const woodArea = (sizes.longueur * sizes.profondeur * (report2D.Type + 1) + sizes.largeur * sizes.profondeur * (report2D.Type + 1) + report2D.Cells * cwidth * cwidth) / 1000; //cm2
  const woodVolume = (woodArea * report2D.Thickness) / 1000; //m3
  const weightPoplar = (woodVolume * 530).toFixed(2); //kg pour le peuplier;
  const price = useProductStore.getState().price;
  const nomenclature = useProductStore.getState().nomenclature;
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const valuesSelected = useProductStore((state) => state.valuesSelected);

  console.log(report2D.Type + 1);

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    objectsInCategory(tag)
      .get()
      .then((response) => {
        var attributes = JSON.parse(response.data[0].note_private);
        setDefaultProduct({ ...response.data[0], attributes: attributes });
      })
      .catch((error) => {
        console.log(error);
        /*  setError(error); */ //waiting for work on absorbeurs
      });
  }, [tag]);

  return (
    <>
      {!error ? (
        <Row className="d-flex ft4 quadralab_main_row">
          <Layout header>
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                {!fetching ? <QuadralabOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}
                <Col md={12} className="d-flex flex-column justify-content-evenly ps-5 pe-5 quadralab_canvas_container">
                  {!loading ? <ProductCanvas></ProductCanvas> : "Chargement du modèle"}
                </Col>
                <Row className="justify-content-center align-items-center quadralab_title ">
                  <Link href={{ pathname: "/shop/product", query: valuesSelected }}>
                    <p className="ft4 mb-1">
                      Modèle similaire disponible : {nomenclature?.simple} ({price} €){" "}
                    </p>
                  </Link>
                </Row>
                <QuadralabPerformances nomenclature={nomenclature} fmin={fmin} fmax={fmax} cwidth={cwidth} weightPoplar={weightPoplar} report2D={report2D} area={area} volume={volume} sizes={sizes} woodArea={woodArea} woodVolume={woodVolume} />
                <Row className="quadralab_display flex-nowrap">
                  <Form.Check type={"switch"} id="custom-switch" label={"Hauteur(cm) / Ratio"} onChange={(e) => useProductStore.setState({ ratio: e.target.checked })} />
                  <Form.Check type={"switch"} id="custom-switch" label={"Surbrillance"} onChange={(e) => useProductStore.setState({ highlights: e.target.checked })} />
                </Row>
              </Form>
            </FormProvider>
          </Layout>
        </Row>
      ) : (
        "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
      )}
    </>
  );
};

export default Quadralab;
