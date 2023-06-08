import { Accordion, Col, Row } from "react-bootstrap";

export const CardOptions = ({ title, children, opened, transparent }) => {
  return (
    <Row className="card_options" >
      <Accordion defaultActiveKey={opened} >
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <span className="text-uppercase">
              <i className="fad fa-sliders-v me-2"></i> {title}
            </span>{" "}
          </Accordion.Header>
          <Accordion.Body className="text-center" style={{backgroundColor : transparent? "inherit" : "#2f2a28"}}>{children}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Row>
  );
};
