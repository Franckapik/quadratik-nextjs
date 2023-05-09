import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useProductStore } from "../../hooks/store";

export const ProductNavBar = ({categories}) => {
  const tag = useProductStore.getState().tag;

    return (
      <Navbar className="d-none d-md-flex product_navbar_row ft2 text-uppercase align-items-center bg_dark">
      {categories.map((a, i) => (
          <Nav key={"Tag" + i} style={{backgroundColor : a.id == tag ? "#9fb07ca9" : "inherit"}}>
            <Link href={{ pathname: "/shop/product", query: {TAG : a.id} }} >{a.label}</Link>
          </Nav>
        ))}
    </Navbar>)
}