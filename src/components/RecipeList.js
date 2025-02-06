import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchRecipes } from "../features/recipes/recipesSlice";
import RecipeCard from "./RecipeCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const Message = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: ${({ error }) => (error ? "#ff4757" : "#666")};
`;

const RecipeList = () => {
  const dispatch = useDispatch();
  const { items, status, error, filters } = useSelector((state) => {
    return state.recipes;
  });
  
const query = useSelector((state) => state.search.query);

  useEffect(() => {
    dispatch(fetchRecipes({ searchTerm: query, filters }));
  }, [dispatch, filters]); // Fetch data when filters change

  const filterRecipes = (recipes) => {
    console.log("anand filter", recipes, filters, items);

    if (!filters) return recipes; // Avoid undefined filters error

    return recipes.filter((recipe) => {
      console.log("anand filtering", recipe);

      const { diet = [], cuisine = [], mealType = [] } = filters;
      const recipeData = recipe.recipe;

      const matchesDiet =
        diet.length === 0 ||
        diet.some((d) =>
          recipeData.dietLabels.some(
            (label) => label.toLowerCase() === d.toLowerCase()
          )
        );

      const matchesCuisine =
        cuisine.length === 0 ||
        (recipeData.cuisineType &&
          recipeData.cuisineType.some((c) =>
            cuisine.some((filter) => c.toLowerCase() === filter.toLowerCase())
          ));

      const matchesMealType =
        mealType.length === 0 ||
        (recipeData.mealType &&
          recipeData.mealType.some((m) =>
            mealType.some((filter) => m.toLowerCase() === filter.toLowerCase())
          ));

      return matchesDiet && matchesCuisine && matchesMealType;
    });
  };


  if (status === "loading") {
    return <Message>Loading recipes...</Message>;
  }

  if (status === "failed") {
    return <Message error>Error: {error}</Message>;
  }

  const filteredRecipes = filterRecipes(items || []); // Ensure `hits` exists

  if (filteredRecipes.length === 0) {
    return <Message>No recipes found matching your criteria.</Message>;
  }

  return (
    <Grid>
      {filteredRecipes.map((recipe, index) => (
        <RecipeCard
          key={`${recipe.recipe.uri}-${index}`}
          recipe={recipe.recipe}
        />
      ))}
    </Grid>
  );
};

export default RecipeList;
