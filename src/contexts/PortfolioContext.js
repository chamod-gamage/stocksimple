import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
export const PortfolioContext = createContext();
let newStocks;
const PortfolioContextProvider = props => {
  const [stocks, setStocks] = useState(
    JSON.parse(localStorage.getItem("stocks")),
    []
  );

  useEffect(() => {
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }, [stocks]);

  useEffect(() => {
    fetchStocks()
  }, []);

  const get = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer ugQFa1vAGcLGq4LXMnBCN7VY5frW"
      // "Access-Control-Allow-Headers": "*"
    }
  };

  const fetchStocks = () => {
    if(stocks?.length>0){
      let newStocks = [...stocks];
      for(let i = 0; i< stocks?.length; i++) {
        fetch(`https://sandbox.tradier.com/v1/markets/quotes?symbols=${stocks.symbol}`, get)
          .then(function(response) {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            return response.json();
          })
          .then(function(data) {
            
            // `data` is the parsed version of the JSON returned from the above endpoint.
            newStocks[i].description = stocks[i].description;
            newStocks[i].date = stocks[i].date;
            newStocks[i].id = stocks[i].id;
            newStocks[i].price = stocks[i].price;
            newStocks[i].symbol = stocks[i].symbol;
            newStocks[i].value = data?.quotes?.quote?.last

          })
          .catch(err => {
            console.log(err);
          });
        
      setStocks(newStocks)
      }
      setStocks(newStocks)
    }
  };


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
    setStocks(stocks?.filter(stock => stock?.id !== id));
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
