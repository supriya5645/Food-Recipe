import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../features/recipes/recipesSlice';
import searchReducer from "../features/recipes/searchSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    search: searchReducer,
  },
});
