import React, { useState } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { store } from './app/store';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import RecipeList from './components/RecipeList';
import FavoritesList from './components/FavoritesList';
import { fetchRecipes } from './features/recipes/recipesSlice';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f6fa;
`;

const Header = styled.header`
  background-color: white;
  padding: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #2f3542;
  margin: 0;
  font-size: 2.5rem;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  gap: 1rem;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${props => props.active ? '#ff4757' : 'white'};
  color: ${props => props.active ? 'white' : '#2f3542'};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState('recipes');
  
  const handleSearch = (query) => {
    const state = store.getState().recipes; // Get current filters from Redux
    store.dispatch(
      fetchRecipes({ searchTerm: query, filters: state.filters })
    );
  };


  return (
    <Provider store={store}>
      <AppContainer>
        <Header>
          <Title>Recipe Finder</Title>
          <SearchBar onSearch={handleSearch} />
        </Header>
        <MainContent>
          <TabContainer>
            <TabButton
              active={activeTab === 'recipes'}
              onClick={() => setActiveTab('recipes')}
            >
              All Recipes
            </TabButton>
            <TabButton
              active={activeTab === 'favorites'}
              onClick={() => setActiveTab('favorites')}
            >
              My Favorites
            </TabButton>
          </TabContainer>
          
          {activeTab === 'recipes' && (
            <>
              <Filters />
              <RecipeList />
            </>
          )}
          
          {activeTab === 'favorites' && <FavoritesList />}
        </MainContent>
      </AppContainer>
    </Provider>
  );
}

export default App;
