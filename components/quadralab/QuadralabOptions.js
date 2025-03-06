import { CardOptions } from "../../components/shared/CardOptions";
import ProductOptions from "../../components/shared/ProductOptions";

const QuadralabOptions = ({ product, height, changeAttributes }) => {
  return (
    <CardOptions title="parametres" opened={height > 700 ? "1" : "0"}>
      <ProductOptions product={product} changeAttributes={changeAttributes} />
    </CardOptions>
  );
};

export default QuadralabOptions;
