import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { listCategories } from "../dolibarrApi/fetch";
import { useState } from "react";
import Link from "next/link";

export const ProductNavBar = () => {

  const [categories, setCategories] = useState([]);

  //get all categories
  useEffect(() => {
    listCategories()
      .get()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

    return (
    <Row className="product_navbar_row ft1 align-items-center">
      {categories.map((a,i) => (
        <Col md={2} ><Link href={`?TAG=${a.id}`}>{a.label}</Link></Col>
        
      ))}
{/*         <Navbar >
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
             
              <Nav.Link href="?TAG=Absorbeurs">Absorbeurs</Nav.Link>
              <Nav.Link href="#link">Accessoires</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
      </Row>)
}