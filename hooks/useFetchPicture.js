import { useEffect, useState } from "react";
import { documentByFilename } from "../components/dolibarrApi/fetch";

export const useFetchPicture = (nomenclature, folder) => {
  const [productImg, setProductImg] = useState();
  const [error, setError] = useState(false);


  useEffect(() => {
    if (nomenclature) {
      documentByFilename("Modeles/" + folder + "/" + nomenclature.simple + ".png")
        .get()
        .then((response) => {
          setProductImg(response.data.content);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [nomenclature]);
  

return [productImg, error];    
}