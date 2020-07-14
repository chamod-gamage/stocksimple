import React, {useContext } from "react";
import "../index.css";
import { PortfolioContext } from "../contexts/PortfolioContext";
import StockDetails from "./StockDetails";

const StockList = (props) => {
  const { stocks } = useContext(PortfolioContext);
  return (
    <div style = {{width: "100%"}}>
      <div style = {{height: 10}}/>
      {console.log(stocks)}
      <ul style = {{padding:0}}>
        {stocks?.map((stock) => {
          return <div style = {{paddingTop: 10, paddingBottom: 10}}><StockDetails stock={stock} key={stock.id} /></div>;
        })}
      </ul>
    </div>
  );
};

export default StockList;
