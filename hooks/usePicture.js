import { useQuery } from "react-query";
import { documentByFilename } from "../components/dolibarrApi/fetch";

export const usePicture = (nom, miniature) => {

  const { data: facePicture, isSuccess: facePictureSucceed } = useQuery(["facePicture", { name: nom, miniature: miniature }], () => documentByFilename(`Modeles/Face/${miniature ? "Miniature/" : "Large/"}${nom}.png`), { staleTime: Infinity, enabled: !!nom && nom !== undefined });
  const { data: sidePicture, isSuccess: sidePictureSucceed } = useQuery(["sidePicture", { name: nom, miniature: miniature }], () => documentByFilename(`Modeles/Side/${miniature ? "Miniature/" : "Large/"}${nom}.png`), { staleTime: Infinity, enabled: !!nom && nom !== undefined });

  return { facePicture: facePicture, sidePicture: sidePicture, isSuccess: facePictureSucceed && sidePictureSucceed };
};
