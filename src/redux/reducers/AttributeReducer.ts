import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Attribute} from '../../models';

const initialState: Attribute[] = [
  {
    id: 1,
    name: 'date',
    label: 'DATE',
  },
  {
    id: 2,
    name: 'text',
    label: 'TEXT',
  },
  {
    id: 3,
    name: 'checkbox',
    label: 'CHECKBOX',
  },
  {
    id: 4,
    name: 'number',
    label: 'NUMBER',
  },
];

export const attributeSlice = createSlice({
  name: 'attribute',
  initialState,
  reducers: {
    addAttribute: (state, action: PayloadAction<Attribute>) => {
      return [...state, action.payload];
    },
  },
});

export const {addAttribute} = attributeSlice.actions;
export default attributeSlice.reducer;
