import React, { useContext, useState, useEffect } from 'react';
import { PortfolioContext } from '../contexts/PortfolioContext';
import StockDetails from './StockDetails';
import StockForm from './StockForm';
import Header from './Header';

const StockList = ({ setAuthorized }) => {
  const [trigger, setTrigger] = useState(false);
  const { stocks, fetchStocks } = useContext(PortfolioContext);

  useEffect(() => {
    fetchStocks();
    setTrigger(true);
  }, []);

  const logout = () => {
    fetch(`${process.env.REACT_APP_STOCKSIMPLE_API}/users/logout`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then(() => {
      setAuthorized(false);
    });
  };

  return !trigger ? (
    <div />
  ) : (
    <div>
      <div className="logout">
        <button className="btn btn-primary" onClick={logout}>
          <h2>Log Out</h2>
        </button>
      </div>
      <Header />
      <StockForm buttonText={'Add Holding'} />
      <button
        onClick={(e) => {
          fetchStocks();
        }}
        className="btn btn-primary"
      >
        <h2> UPDATE </h2>
      </button>
      <ul>
        {stocks?.map((stock, index) => (
          <StockDetails stock={stock} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default StockList;
