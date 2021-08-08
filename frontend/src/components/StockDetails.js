import React, { useContext } from 'react';
import { PortfolioContext } from '../contexts/PortfolioContext';
import { AppProvider } from '@shopify/polaris';

const StockDetails = (props) => {
  const { removeStock, stocks } = useContext(PortfolioContext);

  return (
    <div className="form">
      <AppProvider>
        <div className="row m-3">
          <div className="left col-6">
            <div>
              <h2>{stocks[props.index]?.symbol}</h2>
            </div>
          </div>

          <div className="right col-6">
            <div>
              <h2>
                $
                {(
                  stocks[props.index]?.value * stocks[props.index]?.shares
                ).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
        <div className="row m-3">
          <div className="left col-6">
            <h2>{stocks[props.index]?.description}</h2>
          </div>
          <div className="right col-6">
            <h2>
              {stocks[props.index]?.value / stocks[props.index]?.price > 1 &&
                '+'}
              {(
                (stocks[props.index]?.value / stocks[props.index]?.price) *
                  100 -
                100
              ).toFixed(2)}
              %
            </h2>
          </div>
        </div>
        <div className="row m-3">
          <div className="left col-6">
            <h2>Shares: {stocks[props.index]?.shares}</h2>
          </div>

          <div className="right col-6">
            <button
              onClick={(e) => {
                removeStock(stocks[props.index].id);
              }}
              className="btn btn-primary"
            >
              <h2> Delete Holding </h2>
            </button>
          </div>
        </div>
      </AppProvider>
    </div>
  );
};

export default StockDetails;
