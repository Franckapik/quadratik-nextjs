import { useQuery } from "react-query";
import { documentByFilename } from "../components/dolibarrApi/fetch";

export const usePicture = (nomenclature, miniature) => {
  const { data: facePicture, isSuccess: facePictureSucceed } = useQuery(["facePicture", { name: nomenclature?.simple, miniature: miniature }], () => documentByFilename(`Modeles/Face/${miniature ? "Miniature/" : "Large/"}${nomenclature?.simple}.png`), { staleTime: Infinity, enabled: !!nomenclature?.simple });
  const { data: sidePicture, isSuccess: sidePictureSucceed } = useQuery(["sidePicture", { name: nomenclature?.simple, miniature: miniature }], () => documentByFilename(`Modeles/Side/${miniature ? "Miniature/" : "Large/"}${nomenclature?.simple}.png`), { staleTime: Infinity, enabled: !!nomenclature?.simple });

  return { facePicture: facePicture, sidePicture: sidePicture, isSuccess: facePictureSucceed && sidePictureSucceed };
};
