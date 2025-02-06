import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, fetchRecipes } from "../features/recipes/recipesSlice";


const FiltersContainer = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FilterSection = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background: ${props => props.selected ? '#ff4757' : '#f0f0f0'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.selected ? '#ff4757' : '#e0e0e0'};
  }
`;

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.recipes.filters);
const query = useSelector((state) => state.search.query);

  const filterOptions = {
    diet: ['Balanced', 'High-Protein', 'High-Fiber', 'Low-Fat', 'Low-Carb', 'Low-Sodium'],
    cuisine: ['Italian', 'Asian', 'Mexican', 'Mediterranean', 'American', 'Indian'],
    mealType: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'TeaTime', 'Brunch']
  };

  const handleFilterClick = (filterType, value) => {
    const currentFilters = filters[filterType];
    let newFilters;

    if (currentFilters.includes(value)) {
      newFilters = currentFilters.filter((item) => item !== value);
    } else {
      newFilters = [...currentFilters, value];
    }

    dispatch(setFilter({ filterType, value: newFilters }));
    dispatch(fetchRecipes({searchTerm: query, filters: filters})); // Fetch new recipes when filters change
  };

  return (
    <FiltersContainer>
      <FilterSection>
        <FilterTitle>Diet</FilterTitle>
        <FilterOptions>
          {filterOptions.diet.map(option => (
            <FilterButton
              key={option}
              selected={filters.diet.includes(option)}
              onClick={() => handleFilterClick('diet', option)}
            >
              {option}
            </FilterButton>
          ))}
        </FilterOptions>
      </FilterSection>
      
      <FilterSection>
        <FilterTitle>Cuisine Type</FilterTitle>
        <FilterOptions>
          {filterOptions.cuisine.map(option => (
            <FilterButton
              key={option}
              selected={filters.cuisine.includes(option)}
              onClick={() => handleFilterClick('cuisine', option)}
            >
              {option}
            </FilterButton>
          ))}
        </FilterOptions>
      </FilterSection>
      
      <FilterSection>
        <FilterTitle>Meal Type</FilterTitle>
        <FilterOptions>
          {filterOptions.mealType.map(option => (
            <FilterButton
              key={option}
              selected={filters.mealType.includes(option)}
              onClick={() => handleFilterClick('mealType', option)}
            >
              {option}
            </FilterButton>
          ))}
        </FilterOptions>
      </FilterSection>
    </FiltersContainer>
  );
};

export default Filters;
