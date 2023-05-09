import { Accordion } from "react-bootstrap";

export const CardOptions = ({ title, children }) => {
  return (
    <Accordion defaultActiveKey="none0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {" "}
          <span className="ft6 text-uppercase">
            <i class="fad fa-sliders-v me-2"></i> {title}
          </span>{" "}
        </Accordion.Header>
        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
