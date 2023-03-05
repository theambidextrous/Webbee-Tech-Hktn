export interface Category {
  id: number;
  name?: string;
  fields?: CategoryField[];
  machines?: any[];
}

export interface CategoryField {
  id: number;
  name?: string;
  type: string;
  isTitle: boolean; //to be the name of the machine
}

export interface AddCategoryField {
  categoryId: number;
  field: CategoryField;
}

export interface UpdateCategory {
  categoryId: number;
  category: Category;
}

export interface UpdateCategoryField {
  categoryId: number;
  fieldId: number;
  value: any;
}

export interface DeleteCategoryField {
  categoryId: number;
  fieldId: number;
}
