import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
export const PortfolioContext = createContext();

const PortfolioContextProvider = (props) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
    postPortfolio();
  }, [stocks]);

  useEffect(() => {
    getPortfolio();
  }, []);

  const getTradier = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_TRADIER_API_TOKEN,
    },
  };

  const getPortfolio = async () => {
    return await fetch(`${process.env.REACT_APP_STOCKSIMPLE_API}/portfolio`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 401) {
          window.alert(
            'Please enable 3rd party cookies to use this app. This is likely disabled on Incognito/Private mode.'
          );
        }
        return res.json();
      })
      .then((data) => {
        fetchStocks(data.holdings);
      });
  };

  const postPortfolio = async () => {
    if (stocks?.length > 0) {
      fetch(`${process.env.REACT_APP_STOCKSIMPLE_API}/portfolio`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(stocks),
      })
        .then((res) => res.json())
        .then(() => {});
    }
  };

  const fetchStocks = (stockList) => {
    const stockArray = stockList ? stockList : stocks;
    if (stockArray?.length > 0) {
      let newStocks = [...stockArray];
      for (let i = 0; i < stockArray?.length; i++) {
        fetch(
          `${process.env.REACT_APP_TRADIER_API}/markets/quotes?symbols=${stockArray[i].symbol}`,
          getTradier
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            newStocks[i].description = stockArray[i].description;
            newStocks[i].date = stockArray[i].date;
            newStocks[i].id = stockArray[i].id;
            newStocks[i].price = stockArray[i].price;
            newStocks[i].symbol = stockArray[i].symbol;
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
        getPortfolio,
      }}
    >
      {props.children}
    </PortfolioContext.Provider>
  );
};
export default PortfolioContextProvider;
