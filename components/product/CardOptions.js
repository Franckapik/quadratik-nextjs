import { Accordion, Col, Row } from "react-bootstrap";

export const CardOptions = ({ title, children, className, opened }) => {
  return (
    <Row className={className}>
      <Accordion defaultActiveKey={opened}>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <span className="ft6 text-uppercase">
              <i className="fad fa-sliders-v me-2"></i> {title}
            </span>{" "}
          </Accordion.Header>
          <Accordion.Body>{children}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Row>
  );
};
