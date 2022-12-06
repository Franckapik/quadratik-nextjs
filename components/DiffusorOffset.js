import React from "react";
import { Table } from "react-bootstrap";

export const DiffusorOffset = ({ product3D, set3DProduct }) => (
  <Table style={{ textAlign: "center" }} className="table-borderless table-sm">
    <tbody>
      <tr>
        <td></td>
        <td onClick={() => set3DProduct({ V: product3D.V - 1 })}>
          <i className="fas fa-arrow-up p-0"></i>
        </td>
        <td></td>
      </tr>
      <tr>
        <td onClick={() => set3DProduct({ H: product3D.H + 1 })}>
          <i className="fas fa-arrow-left"></i>
        </td>
        <td>
          {product3D.V} / {product3D.H}
        </td>

        <td onClick={() => set3DProduct({ H: product3D.H - 1 })}>
          <i className="fas fa-arrow-right"></i>
        </td>
      </tr>
      <tr>
        <td></td>
        <td onClick={() => set3DProduct({ V: product3D.V + 1 })}>
          <i className="fas fa-arrow-down"></i>
        </td>
        <td></td>
      </tr>
    </tbody>
  </Table>
);
