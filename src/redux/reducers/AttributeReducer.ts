import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Attribute} from '../../models';

const initialState: Attribute[] = [
  {
    id: 1,
    value: 'date',
    label: 'DATE',
  },
  {
    id: 2,
    value: 'text',
    label: 'TEXT',
  },
  {
    id: 3,
    value: 'checkbox',
    label: 'CHECKBOX',
  },
  {
    id: 4,
    value: 'number',
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
