import { Button, Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";

export const QuadralabHud = () => {
  //just on page render
  const price = useProductStore.getState().price;
  const nomenclature = useProductStore.getState().nomenclature;

  //need to re-render the page
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const cwidth = useProductStore((state) => state.cwidth);
  const sizes = useProductStore((state) => state.sizes);

  return (
    <Col className=" flex flex-column quadralab_hud_col quadralab_params">
      <Row>
        <div className="m-2">
          <div className="flex quadralab_round quadralab_game_border dark_bg ">
            <i className="fad fa-bolt"></i>
          </div>
          <div className="flex quadralab_line quadralab_game_border ">
            <div className="bg_red h-100" style={{ width: " 50%" }}></div> 
          </div>
          <div className="text-end">{fmin} Hz - {fmax} Hz</div>
        </div>
        <div className="m-2">
          <div className="flex quadralab_square quadralab_game_border dark_bg ">
          <i className="fad fa-sort-size-up"></i>
          </div>
          <div className="flex quadralab_line quadralab_game_border ">
            <div className="bg_red h-100" style={{ width: " 70%" }}></div> 
          </div>
          <div className="text-end">{(cwidth * 10).toFixed(0)} mm</div>
        </div>
        <p className="ft05 mb-1">
          {nomenclature?.simple} {price} €
        </p>
        <span className="ft4">REF : {nomenclature?.structurel}</span>
      </Row>
      <Row className="align-items-center">
        <div className="product_list_square border_creme d-flex justify-content-center align-items-center me-4">D</div> {sizes.longueur} x {sizes.largeur} x {sizes.profondeur} cm
      </Row>
      <Button variant="secondary" type="submit" className="m-auto mt-4">
  Rapport 2D
</Button>

<Button variant="primary" type="submit" className="m-auto mt-4">
  Demander un devis
</Button>
    </Col>
  );
};
