import React from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { CardOptions } from "../product/CardOptions";

export const QuadralabPerformances = ({ nomenclature, fmin, fmax, cwidth, weightPoplar, report2D, area, volume }) => (
  <CardOptions title="performances" opened="0">
    <Col className="flex flex-column ">
      <p className="text-center mb-4">
        <i className="fad fa-stream"></i> REF : {nomenclature?.structurel}
      </p>
      <PerformanceWidget icon="fad fa-bolt" value={`${fmin} Hz - ${fmax} Hz`} color="#f26565" performance={((fmax - fmin) * 100) / 10000} tooltip={"La plage de fréquence traitée"} /> {/* 10k audio frequency */}
      <PerformanceWidget icon="fad fa-weight" value={`${weightPoplar} kg // ${report2D?.lengthWells?.toFixed(0)} cm`} color="#8ea65f" performance={(weightPoplar * 100) / 30} tooltip={"Le poids du diffuseur estimé si construit en peuplier. La longueur totale des hauteurs de puits du diffuseur"} />
      <PerformanceWidget icon="fad fa-sort-size-down" value={`${(cwidth * 10).toFixed(0)} mm`} color="#f1b672" performance={100 - (cwidth * 10 * 100) / 90} tooltip={"La taille des cellules. Plus elle est petite, plus les aigus sont traités"} />
      <PerformanceWidget icon="fad fa-box-open" value={`${area} m2 // ${volume} m3`} color="#7cb0eb" performance={(volume * 100) / 0.144} tooltip={"L'aire traitée par le diffuseur et le volume (boite) qu'il occupe"} /> {/* 120 * 60 * 20cm */}
    </Col>
  </CardOptions>
);
const PerformanceWidget = ({ icon, value, color, performance, tooltip }) => {
  return (
    <OverlayTrigger key={"left"} placement={"left"} overlay={<Tooltip id={`tooltip-${value}`}>{tooltip}</Tooltip>}>
      <Row className="quadralab_performance_widget">
        <div className="flex quadralab_round quadralab_game_border bg_dark ">
          <i className={icon}></i>
        </div>
        <div className="flex quadralab_line quadralab_game_border ">
          <div className="h-100" style={{ width: `${performance}%`, maxWidth: "100%", backgroundColor: color }}></div>
        </div>
        <p className="quadralab_perf_value text-end ft7">{value}</p>
      </Row>
    </OverlayTrigger>
  );
};
