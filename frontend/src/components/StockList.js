import React, { useContext, useState, useEffect } from 'react';
import { PortfolioContext } from '../contexts/PortfolioContext';
import StockDetails from './StockDetails';
import StockForm from './StockForm';
import Header from './Header';

const StockList = ({ setAuthorized, authorized, setShowForm }) => {
  const [trigger, setTrigger] = useState(false);
  const { stocks, login, getPortfolio } = useContext(PortfolioContext);

  useEffect(() => {
    getPortfolio();
    setTrigger(true);
  }, []);

  const handleButton = () => {
    if (authorized) {
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
    }
    setShowForm(true);
  };

  return !trigger ? (
    <div />
  ) : (
    <div>
      <div className="logout">
        <div>
          <h2>
            {authorized ? '' : 'To access your portfolio across devices:'}
          </h2>
        </div>
        <button className="btn btn-primary" onClick={handleButton}>
          <h2>
            {authorized ? 'Log Out' : login ? 'Sign In' : 'Create Account'}
          </h2>
        </button>
      </div>
      <Header />
      <StockForm buttonText={'Add Holding'} />
      <button
        onClick={(e) => {
          getPortfolio();
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
