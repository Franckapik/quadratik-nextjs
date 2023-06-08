import React from "react";
import { Col } from "react-bootstrap";
import { PerformanceWidget } from "./PerformanceWidget";

export const PerformancesCard = ({ product }) => {
  return (
    <>
      {product.dimensions.D === "D1" || product.dimensions.D === "D2" ? (
        <Col className="flex flex-column ">
          <PerformanceWidget icon="fad fa-bolt fa-xs" value={`${product.dimensions.fmin} Hz - ${product.dimensions.fmax} Hz`} color="#f26565" performance={((product.dimensions.fmax - product.dimensions.fmin) * 100) / 10000} tooltip={"La plage de fréquence traitée"} /> {/* 10k audio frequency */}
          <PerformanceWidget
            icon="fad fa-weight"
            value={`${product.dimensions.weightPoplar} kg // ${product.dimensions.lengthWells?.toFixed(0)} cm`}
            color="#8ea65f"
            performance={(product.dimensions.weightPoplar * 100) / 30}
            tooltip={"Le poids du diffuseur estimé si construit en peuplier. La longueur totale des hauteurs de puits du diffuseur"}
          />
          <PerformanceWidget icon="fad fa-sort-size-down fa-xs" value={`${(product.dimensions.c * 10).toFixed(0)} mm`} color="#f1b672" performance={100 - (product.dimensions.c * 10 * 100) / 90} tooltip={"La taille des cellules. Plus elle est petite, plus les aigus sont traités"} />
          <PerformanceWidget
            icon="fad fa-box-open fa-xs"
            value={`${product.dimensions.area /10000} m2 // ${product.dimensions.volume/1000000} m3`}
            color="#7cb0eb"
            performance={(product.dimensions.volume * 100) / 0.144}
            tooltip={"L'aire traitée par le diffuseur et le product.dimensions.volume (boite) qu'il occupe"}
          />
        </Col>
      ) : null}
      {product.dimensions.D !== "D2" && product.dimensions.D !== "D1" && product.dimensions.F !== undefined ? "ici" : null}
    </>
  );
};
