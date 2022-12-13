import React from "react";
import { Table } from "react-bootstrap";

export const DiffusorOffset = ({ p3d, setProduct }) => (
  <Table style={{ textAlign: "center" }} className="table-borderless table-sm">
    <tbody>
      <tr>
        <td></td>
        <td onClick={() => setProduct((prevProduct) => ( {...prevProduct, V: prevProduct.V - 1} ))}>
          <i className="fas fa-arrow-up p-0"></i>
        </td>
        <td></td>
      </tr>
      <tr>
      <td onClick={() => setProduct((prevProduct) => ( {...prevProduct, H: prevProduct.H + 1} ))}>
          <i className="fas fa-arrow-left"></i>
        </td>
        <td>
          {p3d.V} / {p3d.H}
        </td>

        <td onClick={() => setProduct((prevProduct) => ( {...prevProduct, H: prevProduct.H - 1} ))}>
          <i className="fas fa-arrow-right"></i>
        </td>
      </tr>
      <tr>
        <td></td>
        <td onClick={() => setProduct((prevProduct) => ( {...prevProduct, V: prevProduct.V + 1} ))}>
          <i className="fas fa-arrow-down"></i>
        </td>
        <td></td>
      </tr>
    </tbody>
  </Table>
);
