import { useEffect, useState } from "react";
import { useProductStore } from "./store";
import { attributesAllFetch, attributesFetchById } from "../components/dolibarrApi/fetch";

export const useAttributes = () => {
  const store_attributes = useProductStore((state) => state.attributes);
  const [attributes, setAttributes] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);

  // get attributes (ex : Width) and then values (ex: 50cm)
  useEffect(() => {
    if (Object.keys(store_attributes).length) {
      setAttributes(store_attributes);
    } else {
      attributesAllFetch()
      .get()
      .then((response) => {
        const attributes = response.data;
        if (attributes.length) {
          Promise.all(
            attributes.map((a) =>
              attributesFetchById(a.id)
                .get()
                .then((response) => {
                  return response.data;
                })
                .catch((error) => {
                  return error;
                })
            )
          )
            .then((values) => {
              const filteredValues = values.filter((item) => item).flat(); //no undefined and same level
              const attributesAndValues = Object.entries(attributes).reduce((acc, [key, val] = item) => {
                const v = filteredValues.filter((a) => a.fk_product_attribute == val.id).sort((a, b) => a.id - b.id);
                let newV = {};
                if (v.length) {
                  newV = Object.entries(v).reduce((acc, [key, val] = item) => {
                    return {
                      ...acc,
                      [key]: {
                        v_id: val.id,
                        v_ref: val.ref,
                        v_3d: val.value?.split(",")[0],
                        v_label: val.value?.split(",")[1],
                        v_operator: val.value?.split(",")[3],
                        v_factor: val.value?.split(",")[2],
                      },
                    };
                  }, 0);
                }

                return {
                  ...acc,
                  [key]: {
                    a_id: val.id,
                    a_ref: val.ref,
                    a_position: val.position,
                    a_label: val.label,
                    values: newV,
                  },
                };
              }, 0);

              useProductStore.setState({ attributes: attributesAndValues }); //global state
              setAttributes(attributesAndValues);
              setFetching(false);
            })
            .catch((error) => {
              return error;
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
    }
    
  }, [store_attributes]);

  return [attributes, fetching, error];
};
