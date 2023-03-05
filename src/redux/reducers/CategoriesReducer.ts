import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Category,
  UpdateCategory,
  DeleteCategoryField,
  UpdateCategoryField,
  CategoryField,
  AddCategoryField,
} from '../../models';

const initialState: Category[] = [];

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      return [...state, action.payload];
    },

    updateCategoryName: (state, action: PayloadAction<UpdateCategory>) => {
      const {categoryId, category} = action.payload;
      return state.map((categ: Category) => {
        if (categ.id === categoryId) {
          return {
            ...categ,
            name: category.name,
          };
        } else {
          return categ;
        }
      });
    },

    addCategoryField: (state, action: PayloadAction<AddCategoryField>) => {
      const {categoryId, field} = action.payload;
      return state.map((categ: Category) => {
        if (categ.id === categoryId) {
          const fieldList = categ.fields || [];
          let nextFieldId = Math.max(...fieldList?.map(c => c.id), 0);
          nextFieldId = nextFieldId + 1;
          return {
            ...categ,
            fields: [
              ...fieldList,
              {
                id: nextFieldId,
                type: field.type,
                name: 'Field',
                isTitle: false,
              },
            ],
          };
        }
        return categ;
      });
    },

    updateCategoryFieldName: (
      state,
      action: PayloadAction<UpdateCategoryField>,
    ) => {
      const {categoryId, fieldId, value} = action.payload;
      return state.map((categ: Category) => {
        if (categ.id === categoryId) {
          return {
            ...categ,
            fields: categ.fields?.map((f: CategoryField) => {
              if (f.id === fieldId) {
                return {
                  ...f,
                  name: value,
                };
              }
              return f;
            }),
          };
        }
        return categ;
      });
    },

    updateCategoryFieldType: (
      state,
      action: PayloadAction<UpdateCategoryField>,
    ) => {
      const {categoryId, fieldId, value} = action.payload;
      return state.map((categ: Category) => {
        if (categ.id === categoryId) {
          return {
            ...categ,
            fields: categ.fields?.map((f: CategoryField) => {
              if (f.id === fieldId) {
                return {
                  ...f,
                  type: value,
                };
              }
              return f;
            }),
          };
        }
        return categ;
      });
    },

    updateCategoryFieldIsTitle: (
      state,
      action: PayloadAction<UpdateCategoryField>,
    ) => {
      const {categoryId, fieldId} = action.payload;
      return state.map((categ: Category) => {
        if (categ.id === categoryId) {
          return {
            ...categ,
            fields: categ.fields?.map((f: CategoryField) => {
              if (f.id === fieldId) {
                return {
                  ...f,
                  isTitle: true,
                };
              }
              return {
                ...f,
                isTitle: false,
              };
            }),
          };
        }
        return categ;
      });
    },

    deleteCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      return state.filter(cat => cat.id !== categoryId);
    },

    deleteCategoryField: (
      state,
      action: PayloadAction<DeleteCategoryField>,
    ) => {
      const {categoryId, fieldId} = action.payload;
      return state.map((categ: Category) => {
        if (categ.id === categoryId) {
          return {
            ...categ,
            fields: categ.fields?.filter(
              (f: CategoryField) => f.id !== fieldId && f.name !== 'Field',
            ),
          };
        }
        return categ;
      });
    },

    deleteCategoryMachine: (state, action: PayloadAction<Category>) => {
      /** TODO add logic & payload  */
      return [...state, action.payload];
    },
  },
});

export const {
  addCategory,
  updateCategoryName,
  addCategoryField,
  updateCategoryFieldName,
  updateCategoryFieldType,
  updateCategoryFieldIsTitle,
  deleteCategory,
  deleteCategoryField,
  deleteCategoryMachine,
} = categorySlice.actions;
export default categorySlice.reducer;
