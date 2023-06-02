import { useMemo } from "react";

export const useDescription = (category, defaultProduct) =>
  useMemo(
    () =>
      defaultProduct &&
      category && {
        parent_label: defaultProduct.label,
        parent_description: defaultProduct.description,
        date_creation: defaultProduct.date_creation,
        date_modification: defaultProduct.date_modification,
        attributes_options: defaultProduct.note_private,
        category_label: category.label,
        category_desc: category.description,
        category_id: category.id,
        category_entity: category.entity,
        category_parent: category.fk_parent,
      }
  );
