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
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }, [stocks]);

  // useEffect(() => {
  //   fetchStocks()
  // },[]);

  // useEffect(() => {
  //   fetchStocks()
  // }, [update]);

  const get = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer ugQFa1vAGcLGq4LXMnBCN7VY5frW"
    }
  };

  const fetchStocks = () => {
    if(stocks?.length>0){
      let newStocks = [...stocks];
      for(let i = 0; i< stocks?.length; i++) {
        fetch(`https://sandbox.tradier.com/v1/markets/quotes?symbols=${stocks[i].symbol}`, get)
          .then(function(response) {
            // console.log(response)
            return response.json();
            
          })
          .then(function(data) {
            // console.log(data)
            newStocks[i].description = stocks[i].description;
            newStocks[i].date = stocks[i].date;
            newStocks[i].id = stocks[i].id;
            newStocks[i].price = stocks[i].price;
            newStocks[i].symbol = stocks[i].symbol;
            newStocks[i].value = data?.quotes?.quote?.last
            setStocks(newStocks)
            // console.log(stocks)

          })
          .catch(err => {
            console.log(err);
          });
        
      }
      
    }
  };

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
    // console.log(stocks);
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
    <PortfolioContext.Provider value={{ stocks, addStock, removeStock, setUpdate, fetchStocks, setStocks }}>
      {props.children}
    </PortfolioContext.Provider>
  );
};
export default PortfolioContextProvider;

//Provider: provides values and passing everything down
