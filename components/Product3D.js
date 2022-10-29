import React, { useEffect, useState } from "react";
import useToggle from "../hooks/useToggle";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Form,
  Table,
} from "react-bootstrap";
import Preview3D from "./Preview3D";
import { useQueryState, queryTypes } from "next-usequerystate";

export const Product3D = ({ p_selected }) => {
  const [width, setWidth] = useQueryState(
    "width",
    queryTypes.integer.withDefault(50)
  );
  const [length, setLength] = useQueryState(
    "length",
    queryTypes.integer.withDefault(50)
  );
  const [depth, setDepth] = useQueryState(
    "depth",
    queryTypes.integer.withDefault(10)
  );
  const [prime, setPrime] = useQueryState(
    "prime",
    queryTypes.integer.withDefault(7)
  );
  const [ratio, setRatio] = useQueryState(
    "ratio",
    queryTypes.boolean.withDefault(false)
  );
  const [invert, setInvert] = useQueryState(
    "invert",
    queryTypes.integer.withDefault(true)
  );
  const [vert, setVert] = useQueryState(
    "vert",
    queryTypes.integer.withDefault(0)
  );
  const [hor, setHor] = useQueryState("hor", queryTypes.integer.withDefault(0));
  const [amax, setAmax] = useState(4);
  const [cwidth, setCwidth] = useState(31);
  const [thickness, setThickness] = useState(0.3);

  const fmin = Math.round((((344 / 2 / depth / 10) * amax) / prime) * 1000);
  const fmax = Math.round(344 / 2 / (cwidth / 100));

  /*   useEffect(() => {
    setWidth(p_selected.width);
    setLength(p_selected.length);
    setDepth(p_selected.depth);
    setPrime(p_selected.prime_nb);
    setThickness(p_selected.thickness);
  }, [p_selected]); */

  return (
    <Row>
      <Col md={8}>
        <div
          style={{
            position: "absolute",
            zIndex: "0",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "50%",
            backgroundPosition: "center",
            filter: "opacity(5%)",
          }}
        ></div>
        <Card className="m-2 p-2">
          <h3 style={{ textAlign: "center" }}>
            D2N{prime}P{Math.round(depth)}L{Math.round(width)}
            {width !== length ? "W" + Math.round(length) : null}P
          </h3>{" "}
        </Card>
        <Row style={{ height: "33em" }}>
          <div
            style={{
              position: "absolute",
              width: "200px",
              top: "25%",
              zIndex: "1000",
              fontSize: "0.8em",
            }}
            onClick={() => console.log("hey")}
          >
            <ListGroup className="ml-2">
              <ListGroupItem className="border-0 bg-transparent">
                <i className="fas fa-ruler-combined mr-2"></i> {width} x{" "}
                {length} x {depth} cm
              </ListGroupItem>
              <ListGroupItem className="border-0 bg-transparent">
                <i className="fas fa-grip-lines-vertical mr-2"></i> {thickness}{" "}
                cm
              </ListGroupItem>
              <ListGroupItem className="border-0 bg-transparent">
                <i className="fas fa-square-full mr-2"></i> {cwidth.toFixed(2)}{" "}
                cm
              </ListGroupItem>
              <ListGroupItem
                className="border-0 bg-transparent"
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-file-export mr-2 "></i> 2D report
              </ListGroupItem>
            </ListGroup>
          </div>
          <div
            style={{
              position: "absolute",
              width: "100px",
              left: "75%",
              top: "80%",
              zIndex: "1000",
              cursor: "pointer",
              fontSize: "0.8em",
            }}
            onClick={() => console.log("hey")}
          >
            <Table
              style={{ textAlign: "center" }}
              className="table-borderless table-sm"
            >
              <tbody>
                <tr>
                  <td></td>
                  <td onClick={() => setVert(vert - 1)}>
                    <i className="fas fa-arrow-up p-0"></i>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td onClick={() => setHor(hor + 1)}>
                    <i className="fas fa-arrow-left"></i>
                  </td>
                  <td>
                    {vert} / {hor}
                  </td>

                  <td onClick={() => setHor(hor - 1)}>
                    <i className="fas fa-arrow-right"></i>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td onClick={() => setVert(vert + 1)}>
                    <i className="fas fa-arrow-down"></i>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Preview3D
            style={{ position: "absolute" }}
            width={width}
            length={length}
            prime={prime}
            depth={depth}
            ratio={ratio}
            hor={hor}
            vert={vert}
            invert={invert}
            amax={amax}
            setAmax={setAmax}
            cwidth={cwidth}
            setCwidth={setCwidth}
            thickness={thickness}
            setThickness={setThickness}
          ></Preview3D>
        </Row>
      </Col>

      <Col md={4}>
        <Card
          style={{ width: "100%", display: "inline-block" }}
          className="m-2"
        >
          <Form.Label className="mr-4">Type </Form.Label>

          <Button onClick={() => setPrime(7)}>7</Button>
          <Button onClick={() => setPrime(11)}>11</Button>
          <Button onClick={() => setPrime(13)}>13</Button>
          <Button onClick={() => setPrime(17)}>17</Button>
        </Card>
        <Card style={{ width: "100%" }} className="m-2">
          <Form.Label>Largeur</Form.Label>
          <Form.Control
            type="range"
            min="1"
            max="200"
            className="form-control"
            defaultValue={width}
            onChange={(e) => setWidth(e.target.value)}
          ></Form.Control>
          <Form.Label>Longueur</Form.Label>
          <Form.Control
            type="range"
            min="1"
            max="200"
            className="form-control"
            defaultValue={length}
            onChange={(e) => setLength(e.target.value)}
          ></Form.Control>
          <Form.Label>Profondeur</Form.Label>
          <Form.Control
            type="range"
            min="1"
            max="50"
            className="form-control"
            defaultValue={depth}
            onChange={(e) => setDepth(e.target.value)}
          ></Form.Control>
          <Form.Control
            type="switch"
            id="ratio"
            name="rationame"
            label="Ratio/Hauteur"
            onClick={() => setRatio(!ratio)}
          />
          <Form.Control
            type="switch"
            id="inv"
            name="invname"
            label="Inverser"
            onClick={() => setInvert(!invert)}
          />
        </Card>
        <Row>
          <Col md={12}>
            <Card style={{ width: "100%" }} className="m-2">
              <Card.Header>
                <Card.Title>Diffusion</Card.Title>
              </Card.Header>
              <Card.Body tag="h3">
                {fmin} Hz -{fmax} Hz
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
