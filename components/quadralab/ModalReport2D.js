import React from "react";
import { Button, Col, ListGroup, Modal, Row, Table } from "react-bootstrap";

export const DiffusorTable = ({ report2D, value }) => {
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

export const ModalReport2D = ({ sizes, area, volume, fmin, woodArea, woodVolume, report2D, show, setShow, handleClose }) => {
  const D = report2D.Cells === report2D.Type;
  console.log(report2D);
  const hauteurs = Object.values(report2D)
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
              {sizes?.largeur} cm x {sizes?.longueur} cm x {sizes?.profondeur} cm
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Aire du diffuseur : <span className="ft2">{area} m2</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Volume du diffuseur : <span className="ft2">{volume} m3</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Type de diffuseur :
            <span className="ft2">
              N{report2D.Type} - {D ? "1D" : "2D"}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Fréquence de design : <span className="ft2">{fmin} Hz</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Nombre de puits/cellules : <span className="ft2">{report2D.Cells}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Epaisseur des parois : <span className="ft2">{report2D.Thickness * 10} mm</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Décalage de cellules en vertical : <span className="ft2">{report2D.ShiftVert}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Décalage de cellules en horizontal : <span className="ft2">{report2D.ShiftHor}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Nombre de hauteur de cellules différentes: <span className="ft2">{report2D.MaxDepth}</span>
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
              Nombre de puits vides :<span className="ft2">{Object.values(report2D).filter((val) => val.hauteur === 0).length}</span>
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
              <span className="ft2"> {report2D.lengthWells?.toFixed(2)} cm</span>
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
      <Modal.Footer className="flex-nowrap">
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="secondary" type="submit">
          Demander un devis
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
