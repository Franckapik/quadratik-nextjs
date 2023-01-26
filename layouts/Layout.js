import * as React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Layout({children}) {
  return (
    <Container fluid className="p-0">
<Row className="h-100">
  <Col className="lateral_menu">Menu</Col>
  <Col className="sections ps-0 pe-0" >{children}</Col>
</Row>
    </Container>
  );
}

export default Layout;
