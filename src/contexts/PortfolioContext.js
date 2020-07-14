import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
export const PortfolioContext = createContext();

const PortfolioContextProvider = props => {
  const [stocks, setStocks] = useState(
    JSON.parse(localStorage.getItem("stocks")),
    []
  );

  useEffect(() => {
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }, [stocks]);

  //hello can you stop changing the names i cant see what im doing... this should be last
  //we need to still make the lsit show up
  //cant do any of the front end stuff when its like this go ahead lol i just made it match so it doesnt crash
  // its not working it keep sl
  const addStock = (symbol, description, date, price, shares, value) => {
    if (!stocks) {
      setStocks([
        { symbol, description, date, price, shares, value, id: uuidv4() }
      ]);
      return;
    }
    setStocks(
      _.orderBy(
        [
          ...stocks,
          { symbol, description, date, price, shares, value, id: uuidv4() }
        ],
        ["symbol"],
        ["asc"]
      )
    );
    console.log(stocks);
  };

  const removeStock = id => {
    setStocks(stocks?.filter(stock => stock.id !== id));
  };

  // const editRecipe = (id, newText, newTitle, newSteps, newDate) => {
  //   let newRecipes = recipes;

  //   for (let i = 0; i < recipes.length; i++) {
  //     if (recipes[i].id === id) {
  //       newRecipes[i].description = newText;
  //       newRecipes[i].title = newTitle;
  //       newRecipes[i].steps = newSteps;
  //       newRecipes[i].date = newDate;
  //       setRecipes(newRecipes);
  //       localStorage.setItem("recipes", JSON.stringify(newRecipes));
  //     }
  //   }
  // };

  return (
    <PortfolioContext.Provider value={{ stocks, addStock, removeStock }}>
      {props.children}
    </PortfolioContext.Provider>
  );
};
export default PortfolioContextProvider;

//Provider: provides values and passing everything down
