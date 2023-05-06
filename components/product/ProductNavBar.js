import Link from "next/link";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { listCategories } from "../dolibarrApi/fetch";
import { useProductStore } from "../../hooks/store";

export const ProductNavBar = () => {
  const [categories, setCategories] = useState([]);
  const tag = useProductStore.getState().tag;

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
    <Navbar className="product_navbar_row ft2 text-uppercase align-items-center">
      {categories
        .filter((cat) => cat.fk_parent == 0)
        .map((a, i) => (
          <Nav key={"Tag" + i} style={{backgroundColor : a.id == tag ? "#9fb07ca9" : "inherit"}}>
            <Link href={`?TAG=${a.id}`}>{a.label}</Link>
          </Nav>
        ))}
      {/*         <Navbar >
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
             
              <Nav.Link href="?TAG=Absorbeurs">Absorbeurs</Nav.Link>
              <Nav.Link href="#link">Accessoires</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
    </Navbar>
  );
};
