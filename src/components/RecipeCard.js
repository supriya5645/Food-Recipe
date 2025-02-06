import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  FaHeart,
  FaRegHeart,
  FaClock,
  FaUtensils,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { toggleFavorite } from "../features/recipes/recipesSlice";

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.2rem;
`;

const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Label = styled.span`
  background: ${(props) => (props.type === "diet" ? "#ff4757" : "#f1f2f6")};
  color: ${(props) => (props.type === "diet" ? "white" : "#2f3542")};
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #747d8c;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff4757;
  font-size: 1.5rem;
  padding: 0.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ExpandButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0.5rem;
  color: #2f3542;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background: #f1f2f6;
  }
`;

const DetailsSection = styled.div`
  padding: 1rem;
  border-top: 1px solid #f1f2f6;
`;

const DetailsList = styled.ul`
  list-style-position: inside;
  padding: 0;
  margin: 0.5rem 0;
`;

const DetailItem = styled.li`
  margin-bottom: 0.5rem;
  color: #2f3542;
  font-size: 0.9rem;
`;

const SectionTitle = styled.h4`
  color: #2f3542;
  margin: 1rem 0 0.5rem 0;
  font-size: 1rem;
`;

const HealthLabel = styled.span`
  display: inline-block;
  background: #2ecc71;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
  margin: 0.25rem;
`;

const RecipeCard = ({ recipe }) => {
  console.log("anand recipe card", recipe);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipes.favorites);
  const isFavorite = recipe && favorites.some((fav) => fav?.uri === recipe.uri);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFavoriteClick = () => {
    console.log("meassage", recipe);
    dispatch(toggleFavorite(recipe));
  };

  const {
    label,
    image,
    dietLabels,
    healthLabels,
    cuisineType,
    mealType,
    ingredientLines,
    totalTime,
    calories,
    yield: servings,
    url,
  } = recipe;

  return (
    <Card>
      <div style={{ position: "relative" }}>
        <Image src={image} alt={label} />
        <FavoriteButton
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </FavoriteButton>
      </div>
      <Content>
        <Title>{label}</Title>
        <Labels>
          {dietLabels?.map((label, index) => (
            <Label key={index} type="diet">
              {label}
            </Label>
          ))}
          {cuisineType && <Label key="cuisine">{cuisineType[0]}</Label>}
          {mealType && <Label key="mealType">{mealType[0]}</Label>}
        </Labels>
        <MetaInfo>
          <MetaItem>
            <FaClock />
            {totalTime ? `${totalTime} mins` : "N/A"}
          </MetaItem>
          <MetaItem>
            <FaUtensils />
            {Math.round(calories)} cal
          </MetaItem>
        </MetaInfo>

        <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Show Less <FaChevronUp />
            </>
          ) : (
            <>
              Show More <FaChevronDown />
            </>
          )}
        </ExpandButton>

        {isExpanded && (
          <DetailsSection>
            <SectionTitle>Health Labels</SectionTitle>
            <div>
              {healthLabels?.slice(0, 5)?.map((label, index) => (
                <HealthLabel key={index}>{label}</HealthLabel>
              ))}
            </div>

            <SectionTitle>Ingredients ({ingredientLines.length})</SectionTitle>
            <DetailsList>
              {ingredientLines?.map((ingredient, index) => (
                <DetailItem key={index}>{ingredient}</DetailItem>
              ))}
            </DetailsList>

            <SectionTitle>Additional Information</SectionTitle>
            <DetailsList>
              <DetailItem>Servings: {servings}</DetailItem>
              <DetailItem>
                Calories per serving: {Math.round(calories / servings)}
              </DetailItem>
            </DetailsList>

            <ExpandButton
              as="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Recipe
            </ExpandButton>
          </DetailsSection>
        )}
      </Content>
    </Card>
  );
};

export default RecipeCard;
