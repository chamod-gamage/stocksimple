import React, {useContext } from "react";
import "../index.css";
import { PortfolioContext } from "../contexts/PortfolioContext";
import StockDetails from "./StockDetails";

const StockList = (props) => {
  const { stocks } = useContext(PortfolioContext);
  return (
    <div style = {{width: "100%"}}>
      {console.log(stocks)}
      <ul style = {{padding:0}}>
        {stocks?.map((stock) => {
          return <StockDetails stock={stock} key={stock.id} />;
        })}
      </ul>
    </div>
  );
};

export default StockList;
