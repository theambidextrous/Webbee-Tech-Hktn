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

export interface UpdateCategory {
  categoryId: number;
  category: Category;
}

export interface DeleteCategoryAttribute {
  categoryId: number;
  attributeId: number;
}
