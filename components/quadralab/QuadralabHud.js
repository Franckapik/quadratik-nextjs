import { Button, Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";

export const QuadralabHud = () => {
  //just on page render

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
          <div className="text-end">
            {fmin} Hz - {fmax} Hz
          </div>
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
        <div className="m-2">
          <div className="flex quadralab_square quadralab_game_border dark_bg ">
            <i className="fad fa-box-open"></i>
          </div>
          <div className="flex quadralab_line quadralab_game_border ">
            <div className="bg_red h-100" style={{ width: " 70%" }}></div>
          </div>
          <div className="text-end">
            {(sizes.longueur * sizes.largeur) / 1000} m2 // {(sizes.longueur * sizes.largeur * sizes.profondeur) / 10000} m3
          </div>
        </div>
            </Row>

Rapport 2D

      <Button variant="primary" type="submit" className="quadralab_devis_button m-auto mt-4">
        Demander un devis
      </Button>
    </Col>
  );
};
