import React, {useContext } from "react";
import "../index.css";
import { PortfolioContext } from "../contexts/PortfolioContext";
import RecipeDetails from "./RecipeDetails";

const RecipeList = (props) => {
  const { recipes } = useContext(PortfolioContext);
  return (
    <div style = {{width: "100%"}}>
      <ul style = {{padding:0}}>
        {recipes?.map((recipe) => {
          return <RecipeDetails recipe={recipe} key={recipe.id} />;
        })}
      </ul>
    </div>
  );
};

export default RecipeList;
