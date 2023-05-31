import { useQuery } from "react-query";
import { attributesAllFetch, variantFetchByParentId } from "../components/dolibarrApi/fetch";

export const useAttributes = () =>
  useQuery(
    ["attributes"],
    () =>
      attributesAllFetch()
        .get()
        .then((response) => response.data),
    { staleTime: Infinity }
  );
