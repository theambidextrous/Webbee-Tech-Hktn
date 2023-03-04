import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category, UpdateCategory, DeleteCategoryAttribute} from '../../models';

const initialState: Category[] = [];

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      return [...state, action.payload];
    },

    updateCategory: (state, action: PayloadAction<UpdateCategory>) => {
      /** TODO add logic  */
      const {categoryId, category} = action.payload;
      return [...state, category];
    },

    updateCategoryMachine: (state, action: PayloadAction<UpdateCategory>) => {
      /** TODO add logic  */
      const {categoryId, category} = action.payload;
      return [...state, category];
    },

    deleteCategory: (state, action: PayloadAction<number>) => {
      return state.filter(cat => cat.id !== action.payload);
    },

    deleteCategoryAttribute: (
      state,
      action: PayloadAction<DeleteCategoryAttribute>,
    ) => {
      /** TODO add logic  */
      const {categoryId, attributeId} = action.payload;
      const newAttributes = state.filter(cat => cat.id !== attributeId);
    },

    deleteCategoryMachine: (state, action: PayloadAction<Category>) => {
      /** TODO add logic & payload  */
      return [...state, action.payload];
    },
  },
});

export const {
  addCategory,
  updateCategory,
  updateCategoryMachine,
  deleteCategory,
  deleteCategoryAttribute,
  deleteCategoryMachine,
} = categorySlice.actions;
export default categorySlice.reducer;
