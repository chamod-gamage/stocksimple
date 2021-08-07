import React, { useContext, useState, useEffect } from 'react';
import { PortfolioContext } from '../contexts/PortfolioContext';
import StockDetails from './StockDetails';
import StockForm from './StockForm';
import Header from './Header';

const StockList = (props) => {
  const [trigger, setTrigger] = useState(false);
  const { stocks, fetchStocks } = useContext(PortfolioContext);

  useEffect(() => {
    fetchStocks();
    setTrigger(true);
  }, []);

  return !trigger ? (
    <div />
  ) : (
    <div>
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
