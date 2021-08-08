import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
export const PortfolioContext = createContext();

const PortfolioContextProvider = (props) => {
  const [stocks, setStocks] = useState(
    JSON.parse(localStorage.getItem('stocks')),
    []
  );

  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  const get = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_TRADIER_API_TOKEN,
    },
  };

  const fetchStocks = () => {
    if (stocks?.length > 0) {
      let newStocks = [...stocks];
      for (let i = 0; i < stocks?.length; i++) {
        fetch(
          `https://sandbox.tradier.com/v1/markets/quotes?symbols=${stocks[i].symbol}`,
          get
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            newStocks[i].description = stocks[i].description;
            newStocks[i].date = stocks[i].date;
            newStocks[i].id = stocks[i].id;
            newStocks[i].price = stocks[i].price;
            newStocks[i].symbol = stocks[i].symbol;
            newStocks[i].value = data?.quotes?.quote?.last;
            setStocks(newStocks);
          });
      }
    }
  };

  const addStock = (symbol, description, date, price, shares, value) => {
    if (!stocks) {
      setStocks([
        { symbol, description, date, price, shares, value, id: uuidv4() },
      ]);
      return;
    }
    setStocks(
      _.orderBy(
        [
          ...stocks,
          { symbol, description, date, price, shares, value, id: uuidv4() },
        ],
        ['symbol'],
        ['asc']
      )
    );
  };

  const removeStock = (id) => {
    setStocks(stocks?.filter((stock) => stock?.id !== id));
  };

  return (
    <PortfolioContext.Provider
      value={{
        stocks,
        addStock,
        removeStock,
        fetchStocks,
        setStocks,
      }}
    >
      {props.children}
    </PortfolioContext.Provider>
  );
};
export default PortfolioContextProvider;
