import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";

export const PerformanceRow = ({ value, text, icon }) => (
  <Col className="d-flex flex-column d-md-flex flex-md-row align-items-center m-1 m-md-4 ">
    <OverlayTrigger
      key={"top"}
      placement={"top"}
      overlay={
        <Tooltip id={`tooltip-freq`}>
          <span className="p-4">{text}</span>
        </Tooltip>
      }
    >
      <>
        <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-md-4 ">
          <i className={icon} />
        </div>
        <span className="d-none d-md-flex">{value}</span>
        <span className="d-md-none ft8">{value}</span>
      </>
    </OverlayTrigger>
  </Col>
);
