import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
export const PortfolioContext = createContext();

const PortfolioContextProvider = props => {
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")),
    []
  );

  const [stocks, setStocks] = useState(
    JSON.parse(localStorage.getItem("stocks")),
    []
  );

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }, [recipes]);

  //hello can you stop changing the names i cant see what im doing... this should be last
  //we need to still make the lsit show up
  //cant do any of the front end stuff when its like this go ahead lol i just made it match so it doesnt crash
  // its not working it keep sl
  const addRecipe = (symbol, description, date, price, shares, value) => {
    if (!recipes) {
      setRecipes([
        { symbol, description, date, price, shares, value, id: uuidv4() }
      ]);
      return;
    }
    setRecipes(
      _.orderBy(
        [
          ...recipes,
          { symbol, description, date, price, shares, value, id: uuidv4() }
        ],
        ["date"],
        ["desc"]
      )
    );
  };

  const removeRecipe = id => {
    setRecipes(recipes?.filter(recipe => recipe.id !== id));
  };

  const editRecipe = (id, newText, newTitle, newSteps, newDate) => {
    let newRecipes = recipes;

    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].id === id) {
        newRecipes[i].description = newText;
        newRecipes[i].title = newTitle;
        newRecipes[i].steps = newSteps;
        newRecipes[i].date = newDate;
        setRecipes(newRecipes);
        localStorage.setItem("recipes", JSON.stringify(newRecipes));
      }
    }
  };

  return (
    <PortfolioContext.Provider
      value={{ recipes, addRecipe, removeRecipe, editRecipe }}
    >
      {props.children}
    </PortfolioContext.Provider>
  );
};
export default PortfolioContextProvider;

//Provider: provides values and passing everything down
