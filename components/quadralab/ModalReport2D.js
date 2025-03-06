import React from "react";
import { Button, Col, ListGroup, Modal, Row, Table } from "react-bootstrap";

export const DiffusorTable = ({ dimensions, value }) => {
  return (
    <Table striped bordered hover className="text-center">
      <tbody>
        {Array(dimensions.report.length) //cellules
          .fill("")
          .map((a, index) => {
            const n = index % dimensions.p;
            if (n === 0) {
              return (
                <tr>
                  {Array(dimensions.p) //cellules
                    .fill("")
                    .map((a, i) => {
                      return <td>{dimensions.report[Math.floor(index / dimensions.p) * dimensions.p + i][value]}</td>;
                    })}
                </tr>
              );
            }
          })}
      </tbody>
    </Table>
  );
};

export const ModalReport2D = ({product, show, setShow, handleClose }) => {
  const dimensions = product.dimensions;

  const hauteurs = Object.values(dimensions.report)
    .map((a, i) => a.hauteur)
    .filter((item) => item); //no undefined
  const hauteurCount = {};

  hauteurs.forEach((element) => {
    hauteurCount[element] = (hauteurCount[element] || 0) + 1;
  });

  return (
    <Modal show={show} onHide={handleClose} className="text_dark" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Rapport de fabrication d'un diffuseur Quadratik</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            Dimensions du diffuseur (l x L x P) :
            <span className="ft2">
              {dimensions.w} cm x {dimensions.l} cm x {dimensions.P} cm
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Aire du diffuseur : <span className="ft2">{dimensions.area /1000} m2</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Volume du diffuseur : <span className="ft2">{dimensions.volume/100000} m3</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Type de diffuseur :
            <span className="ft2">
              N{dimensions.N} - {dimensions.D === "D1" ? "1D" : "2D"}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Fréquence de design : <span className="ft2">{dimensions.fmin} Hz</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Nombre de puits/cellules : <span className="ft2">{dimensions.report.length}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Epaisseur des parois : <span className="ft2">{dimensions.E} mm</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Décalage de cellules en vertical : <span className="ft2">{dimensions.V}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Décalage de cellules en horizontal : <span className="ft2">{dimensions.H}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Nombre de hauteur de cellules différentes: <span className="ft2">{dimensions.amax}</span>
          </ListGroup.Item>
        </ListGroup>
        <Row className="align-items-end">
          <p>{dimensions.D === "D1" ? "Rangée du diffuseur 1D" : "1ere rangée du diffuseur 2D"}</p>
          {Array(dimensions.p)
            .fill("")
            .map((a, i) => {
              return <Col key={"rangée" + i} className="border_creme" style={{ height: dimensions.report[i]?.ratio * 10 }}></Col>;
            })}
          <p>Ratio</p>
          <DiffusorTable dimensions={dimensions} value="ratio" />
          <p>Hauteur</p>
          <DiffusorTable dimensions={dimensions} value="hauteur" />
        </Row>
        <Row>
          <ListGroup>
            <ListGroup.Item>
              Nombre de puits vides :<span className="ft2">{Object.values(dimensions.report).filter((val) => val.hauteur === 0).length}</span>
            </ListGroup.Item>
            {Object.entries(hauteurCount)
              .sort((a, b) => a[0] - b[0])
              .map((a, i) => {
                return (
                  <ListGroup.Item key={"blocs" + i}>
                    {a[1]} bloc(s) de ratio {i + 1} ou hauteur {a[0]} cm
                  </ListGroup.Item>
                );
              })}
            <ListGroup.Item>
              Longueur totale des blocs:
              <span className="ft2"> {dimensions.report.lengthWells?.toFixed(2)} cm</span>
            </ListGroup.Item>
          </ListGroup>
          <p>Travail du bois</p>
          <ListGroup>
            <ListGroup.Item>
              Surface de bois découpée:
              <span className="ft2"> {dimensions.woodArea?.toFixed(4)} m2</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Volume de bois découpé:
              <span className="ft2"> {dimensions.woodVolume?.toFixed(4)} m3</span>
            </ListGroup.Item>
          </ListGroup>

          <p>Poids estimé</p>
          <ListGroup>
            <ListGroup.Item>
              MDF:
              <span className="ft2"> {(dimensions.woodVolume * 700).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Bois de pin:
              <span className="ft2"> {(dimensions.woodVolume * 550).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Bois de Cedre:
              <span className="ft2"> {(dimensions.woodVolume * 380).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Mousse Styrofoam:
              <span className="ft2"> {(dimensions.woodVolume * 90).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Bois de Balsa:
              <span className="ft2"> {(dimensions.woodVolume * 120).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Contreplaqué ordinaire:
              <span className="ft2"> {(dimensions.woodVolume * 580).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Contreplaqué bouleau:
              <span className="ft2"> {(dimensions.woodVolume * 700).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Contreplaqué peuplier:
              <span className="ft2"> {(dimensions.woodVolume * 530).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Plâtre:
              <span className="ft2"> {(dimensions.woodVolume * 850).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Bois d'Eucalyptus:
              <span className="ft2"> {(dimensions.woodVolume * 900).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Verre:
              <span className="ft2"> {(dimensions.woodVolume * 252).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Granite:
              <span className="ft2"> {(dimensions.woodVolume * 270).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Aluminium:
              <span className="ft2"> {(dimensions.woodVolume * 280).toFixed(2)} kg</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Acier:
              <span className="ft2"> {(dimensions.woodVolume * 800).toFixed(2)} kg</span>
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Modal.Body>
      <Modal.Footer className="flex-nowrap">
        <Button variant="secondary" onClick={handleClose}>Fermer</Button>
        <Button variant="secondary" type="submit">
          Demander un devis
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
