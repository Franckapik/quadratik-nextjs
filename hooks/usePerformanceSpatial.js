import { useEffect, useState } from "react";
import { documentByFilename } from "../components/dolibarrApi/fetch";
import { useQuery } from "react-query";

export const usePerformanceSpatial = (nom) => {
  const [polarImg, setPolarImg] = useState(false);

  const { data: polar, isSuccess: polarSucceed } = useQuery(["polar", { name: nom }], () => documentByFilename("Polar/" + nom + ".png"), { staleTime: Infinity, enabled: !!nom && nom != undefined });

  useEffect(() => {
    if (polarSucceed) {
      setPolarImg(polar);
    }
  }, [polarSucceed]);

  return { polarImg, polarSucceed };
};