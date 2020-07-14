import React, {useContext, useState } from "react";
import "../index.css";
import { PortfolioContext } from "../contexts/PortfolioContext";
import StockDetails from "./StockDetails";

const StockList = (props) => {
  const { stocks, setUpdate, fetchStocks } = useContext(PortfolioContext);
  
  return (
    <div style = {{width: "100%"}}>
      <div style = {{height: 10}}/>
      {console.log(stocks)}
      <ul style = {{padding:0}}>
        {stocks?.map((stock, index) => {
          return <div style = {{paddingTop: 10, paddingBottom: 10}}>{console.log(index)}<StockDetails stock = {stock} index={index} /></div>;
        })}
      </ul>
      <button
            onClick={e => {
              fetchStocks()
            }}
            className="btn btn-primary"
          >
            {" "}
            <h2> UPDATE </h2>
            <div className="row" style={{ justifyContent: "center" }}>
              <div style={{ margin: "auto 0" }} />
            </div>
          </button>
    </div>
  );
};

export default StockList;
