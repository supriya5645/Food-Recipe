import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.edamam.com/api/recipes/v2";
const APP_ID = "900da95e";
const APP_KEY = "40698503668e0bb3897581f4766d77f9	";

// Load favorites from localStorage
const loadFavorites = () => {
  try {
    const favorites = localStorage.getItem("favorites");
    return favorites?.length > 1 ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ searchTerm = "", filters }) => {
    const params = new URLSearchParams({
      type: "public",
      q: searchTerm,
      app_id: APP_ID,
      app_key: APP_KEY,
      from: 0,
      to: 50,
    });

    // Function to clean filter values: Remove special characters, keep only alphabets
    const cleanFilter = (str) => str.toLowerCase();

    // Append filters dynamically if they exist
    if (filters?.diet?.length) {
      filters.diet.forEach((diet) => params.append("diet", cleanFilter(diet)));
    }
    if (filters?.cuisine?.length) {
      filters.cuisine.forEach((cuisine) =>
        params.append("cuisineType", cleanFilter(cuisine))
      );
    }
    if (filters?.mealType?.length) {
      filters.mealType.forEach((meal) =>
        params.append("mealType", cleanFilter(meal))
      );
    }
    if (filters?.dishType?.length) {
      filters.dishType.forEach((dish) =>
        params.append("dishType", cleanFilter(dish))
      );
    }
    if (filters?.health?.length) {
      filters.health.forEach((health) =>
        params.append("health", cleanFilter(health))
      );
    }
    if (filters?.excluded?.length) {
      filters.excluded.forEach((excluded) =>
        params.append("excluded", cleanFilter(excluded))
      );
    }

    if (filters?.calories) params.append("calories", filters.calories);
    if (filters?.time) params.append("time", filters.time);
    if (filters?.ingr) params.append("ingr", filters.ingr);

    const url = `${API_URL}?${params.toString()}`;

    console.log("API Request URL:", url); // Debugging: Check API URL in console

    const response = await axios.get(url);
    return response.data.hits;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    searchTerm: "pizza",
    favorites: loadFavorites(),
    filters: {
      diet: [],
      cuisine: [],
      mealType: [],
      dishType: [],
      health: [],
      calories: "",
      time: "",
      ingr: "",
      excluded: [],
    },
  },

  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      let _favorites = [...current(state.favorites)];
      const index = _favorites?.findIndex((fav) => fav?.uri == recipe?.uri);

      console.log("state index -- ", _favorites, recipe, index);
      if (index == -1) {
        _favorites?.push(recipe);
      } else {
        _favorites?.splice(index, 1);
      }

      state.favorites = _favorites;
      console.log("state mutated -- ", _favorites, current(state));
      localStorage.setItem("favorites", JSON.stringify(_favorites));
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
    },
    clearFilters: (state) => {
      state.filters = {
        diet: [],
        cuisine: [],
        mealType: [],
        dishType: [],
        health: [],
        calories: "",
        time: "",
        ingr: "",
        excluded: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite, setFilter, clearFilters } = recipesSlice.actions;
export default recipesSlice.reducer;
