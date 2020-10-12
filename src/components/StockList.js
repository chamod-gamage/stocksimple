import React, {useContext, useState, useEffect } from "react";
import "../index.css";
import { PortfolioContext } from "../contexts/PortfolioContext";
import StockDetails from "./StockDetails";
import StockForm from "./StockForm"
import Header from "./Header"

const StockList = (props) => {
  const [trigger, setTrigger] = useState(false)
  const { stocks, setUpdate, fetchStocks , setStocks} = useContext(PortfolioContext);
  useEffect(() => { 
    // console.log(JSON.parse(localStorage.getItem("stocks")));
    // setStocks(JSON.parse(localStorage.getItem("stocks"))); 
    fetchStocks(); 
    // console.log('hi'); 
    setTrigger(true)}
  , [])
  return ( 
    !trigger ? <div/> :
    <div style = {{width: "100%"}}>
      <Header />

      <StockForm button={"Add Holding"} />  
      <div style = {{height: 10}}/>
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
      
      {/* {console.log(stocks)} */}
      <ul style = {{padding:0}}>
        {stocks?.map((stock, index) => {
          return <div style = {{paddingTop: 10, paddingBottom: 10}}>{console.log(index)}<StockDetails stock = {stock} index={index} /></div>;
        })}
      </ul>
      
    </div>
  );
};

export default StockList;