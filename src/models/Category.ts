import {Attribute} from './Attribute';

export interface Category {
  id: number;
  name?: string;
  attributes?: Attribute[];
  title?: string; //to be the name of the machine
  machines?: any[];
}

export interface UpdateCategory {
  categoryId: number;
  category: Category;
}

export interface DeleteCategoryAttribute {
  categoryId: number;
  attributeId: number;
}
