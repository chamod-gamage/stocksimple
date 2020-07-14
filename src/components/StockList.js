import React, {useContext } from "react";
import "../index.css";
import { PortfolioContext } from "../contexts/PortfolioContext";
import StockDetails from "./StockDetails";

const StockList = (props) => {
  const { stocks, setUpdate } = useContext(PortfolioContext);
  return (
    <div style = {{width: "100%"}}>
      <div style = {{height: 10}}/>
      {console.log(stocks)}
      <ul style = {{padding:0}}>
        {stocks?.map((stock) => {
          return <div style = {{paddingTop: 10, paddingBottom: 10}}><StockDetails stock={stock} key={stock?.id} /></div>;
        })}
      </ul>
      <button
            onClick={e => {
              setUpdate(0)
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
