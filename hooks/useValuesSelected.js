
export const useValuesSelected = (allAttributes, attributes, values, key, value) => allAttributes && attributes && values && attributes.reduce((acc, cur, i, a) => ({ ...acc, [allAttributes.filter((a) => a.id == cur.id)[0][key]]: values.filter((a) => a.v_id == cur.fk_prod_attr_val)[0][value] }), {});
