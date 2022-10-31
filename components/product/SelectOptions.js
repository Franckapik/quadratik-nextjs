import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';



const attributes = axios.create({
  baseURL: "https://shop.quadratik.fr/api/index.php/products/attributes",
  headers: {
    Accept: "application/json",
    DOLAPIKEY: "4BWD37pVYZ9quAL6m9zrzB2U96al4vdE",
  },
});

const Values = ({ valueId }) => {
  const [values, setValues] = useState([]);
  useEffect(() => {
    attributes.get("/" + valueId + "/values").then((response) => {
      setValues(response.data);
    });
  }, [valueId, setValues]);

  return (

    <Form.Select >
      {values.map((a, i) => (
        <option>{a.value}</option>
      ))}
    </Form.Select>
  );
};


const Select_Options = () => {
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
      <Form.Group className="mb-3">
        <Form.Label>{a.label}</Form.Label>
        {<Values valueId={a.id}></Values>}{" "}
      </Form.Group>

    ))
  );
};

export default Select_Options;