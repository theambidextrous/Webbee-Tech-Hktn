import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Category,
  UpdateCategory,
  DeleteCategoryField,
  UpdateCategoryField,
  CategoryField,
  AddCategoryField,
  AddMachine,
  DeleteMachine,
  Machine,
  UpdateMachine,
  MachineProperty,
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

    addMachine: (state, action: PayloadAction<AddMachine>) => {
      const {categoryId, machine} = action.payload;
      return state.map((categ: Category) => {
        if (categ.id === categoryId) {
          const currentMachines = categ.machines || [];
          return {
            ...categ,
            machines: [...currentMachines, machine],
          };
        }
        return categ;
      });
    },

    deleteMachine: (state, action: PayloadAction<DeleteMachine>) => {
      const {machineId, categoryId} = action.payload;
      return state.map((categ: Category) => {
        if (categ.id === categoryId) {
          return {
            ...categ,
            machines: categ.machines?.filter(
              (m: Machine) => m.id !== machineId,
            ),
          };
        }
        return categ;
      });
    },

    updateMachineFieldValue: (state, action: PayloadAction<UpdateMachine>) => {
      const {categoryId, fieldId, machineId, value} = action.payload;
      return state.map((categ: Category) => {
        if (categ.id === categoryId) {
          return {
            ...categ,
            machines: categ.machines?.map((m: Machine) => {
              if (m.id === machineId) {
                return {
                  ...m,
                  properties: m.properties?.map((p: MachineProperty) => {
                    if (p.fieldId === fieldId) {
                      return {
                        ...p,
                        fieldValue: value,
                      };
                    }
                    return p;
                  }),
                };
              }
              return m;
            }),
          };
        }
        return categ;
      });
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
  addMachine,
  deleteMachine,
  updateMachineFieldValue,
} = categorySlice.actions;
export default categorySlice.reducer;
