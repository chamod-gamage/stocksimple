import React, { useContext } from 'react';
import { PortfolioContext } from '../contexts/PortfolioContext';

const Header = () => {
  const { stocks } = useContext(PortfolioContext);
  const val = stocks?.reduce(function (prev, cur) {
    return prev + cur?.value * cur?.shares;
  }, 0);
  const prices = stocks?.reduce(function (prev, cur) {
    return prev + cur?.price * cur?.shares;
  }, 0);
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h1>📈</h1>
            <br />
            {stocks?.length > 0 ? (
              <h1>
                {' '}
                Your current balance is ${val.toFixed(2)} USD (
                {val / prices > 1 && '+'}
                {((val / prices) * 100 - 100).toFixed(2)}% returns)
              </h1>
            ) : (
              <h1>Start tracking your stocks today!</h1>
            )}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
