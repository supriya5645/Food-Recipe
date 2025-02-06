import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';
import { current } from '@reduxjs/toolkit';

const FavoritesContainer = styled.div`
  margin: 2rem 0;
`;

const FavoritesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  color: #2f3542;
  margin: 0;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const FavoritesList = () => {
  const favorites = useSelector(state => state.recipes.favorites);

  if (favorites?.length === 0) {
    return (
      <FavoritesContainer>
        <FavoritesHeader>
          <Title>My Favorite Recipes</Title>
        </FavoritesHeader>
        <EmptyMessage>
          You haven't added any favorites yet. Click the heart icon on any recipe to add it to your favorites!
        </EmptyMessage>
      </FavoritesContainer>
    );
  }

  return (
    <FavoritesContainer>
      <FavoritesHeader>
        <Title>My Favorite Recipes ({favorites?.length})</Title>
      </FavoritesHeader>
      <Grid>
        {favorites?.map((recipe, index) => (
          <RecipeCard key={`${recipe.uri}-${index}`} recipe={recipe } />
        ))}
      </Grid>
    </FavoritesContainer>
  );
};

export default FavoritesList;
