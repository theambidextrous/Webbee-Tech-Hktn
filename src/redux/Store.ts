import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AttributeReducer from './reducers/AttributeReducer';
import CategoriesReducer from './reducers/CategoriesReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  attribute: AttributeReducer,
  category: CategoriesReducer,
});

const persistConfig: any = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
