import React from "react";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";

export const PerformanceWidget = ({ icon, value, color, performance, tooltip }) => {
  return (
    <OverlayTrigger key={"left"} placement={"left"} overlay={<Tooltip id={`tooltip-${value}`}>{tooltip}</Tooltip>}>
      <Row className="performance_widget">
        <div className="flex performance_round performance_border bg_dark ">
          <i className={icon}></i>
        </div>
        <div className="flex performance_line performance_border ">
          <div className="h-100" style={{ width: `${performance}%`, maxWidth: "100%", backgroundColor: color }}></div>
        </div>
        <p className="performance_value text-end">{value}</p>
      </Row>
    </OverlayTrigger>
  );
};
