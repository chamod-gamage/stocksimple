import React, { useContext } from "react";
import { PortfolioContext } from "../contexts/PortfolioContext";

const Header = () => {

  const { stocks } = useContext(PortfolioContext);
  const val = stocks?.reduce(function(prev, cur) {
    return prev + cur.value*cur.shares;
  }, 0);
  const prices = stocks?.reduce(function(prev, cur) {
    return prev + cur.price*cur.shares;
  }, 0);
  return (
    <div>
    <div className="container mt-5" style = {{marginTop: -30}}>
      <div className="row">
        <div className="col">
          <h1 style = {{fontSize: 40}}>📈</h1>
          <div style={{ height: 10 }} />
          {stocks?.length > 0  ? (
              <h1> Your current balance is ${Math.floor(val*100)/100} ({val/prices > 0 && '+'}{((val/prices)*100 - 100).toFixed(2)}% returns)</h1>
            ) : (
              <h1>Start tracking your stocks today!</h1>
            )}
          <div style={{ height: 10 }} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
