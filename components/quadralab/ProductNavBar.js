import Link from "next/link";
import { Col, Row } from "react-bootstrap";

export const ProductNavBar = ({categories}) => {

    return (
    <Row className="product_navbar_row ft1 align-items-center">
      {categories.map((a,i) => (
        <Col md={2} key={"Tag" + i} ><Link href={`?TAG=${a.id}`}>{a.label}</Link></Col>
        
      ))}
      </Row>)
}