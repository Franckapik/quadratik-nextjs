import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import axios from "axios";

import { Product3D } from "../../components/Product3D";
import Preview3D from "../../components/Preview3D";

const attributes = axios.create({
  baseURL: "https://shop.quadratik.fr/api/index.php/products/attributes",
  headers: {
    Accept: "application/json",
    DOLAPIKEY: "4BWD37pVYZ9quAL6m9zrzB2U96al4vdE",
  },
});

function Quadralab() {
  return (
    <Container fluid>
      <Row>
        <Col sm={1}>
          <Row>
            <Col sm={8} className="menu">
              <i className="fal fa-light fa-bars fa-2x burger"></i>
            </Col>
            <Col sm={4} className="main"></Col>
          </Row>
        </Col>
        <Col sm={11} className="main">
          <Quadralab_Comp />
          <Product3D />
        </Col>
      </Row>
    </Container>
  );
}

const Values = ({ valueId }) => {
  const [values, setValues] = useState([]);
  useEffect(() => {
    attributes.get("/" + valueId + "/values").then((response) => {
      setValues(response.data);
    });
  }, [valueId, setValues]);

  return (
    <select name="pets" id="pet-select">
      {values.map((a, i) => (
        <option>{a.value}</option>
      ))}
    </select>
  );
};

const Quadralab_Comp = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    attributes
      .get("?sortfield=t.ref&sortorder=ASC&limit=100")
      .then((response) => {
        setPosts(response.data);
      });
  }, []);

  return (
    posts &&
    posts.map((a, i) => (
      <li>
        {a.label} {<Values valueId={a.id}></Values>}{" "}
      </li>
    ))
  );
};

export default Quadralab;
