import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../features/recipes/searchSlice";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 2rem auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #ff4757;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #ff4757;
  }
`;

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;
