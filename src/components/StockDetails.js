import React, { Fragment, useContext, useState } from "react";
import { PortfolioContext } from "../contexts/PortfolioContext";
import RecipeForm from "./StockForm"
import { AppProvider, Card } from "@shopify/polaris";

// need access to learn inside this component
const StockDetails = ({ stock }) => {
  const { removeStock } = useContext(PortfolioContext);
  const [date, setDate] = useState(stock.date)
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState(stock.description);
  const [value, setValue] = useState(stock.value);
  const [symbol, setSymbol] = useState(stock.symbol);
 
  
  const SectionHead = (label) => {
    return(
      <div className = "row"> 
      <div className = "col-12">
      <div style = {{float: "left", paddingTop: 10, paddingBottom: 10}}><h2>{label}</h2></div>
      </div>
      </div>
    )

  }

  const renderBody = () => {  
    return (
      <Fragment>
      <div>{stock.description}</div>
      <div style = {{height: 10}}/>
      <div style = {{backgroundColor: "#FFEFEE"}}>
        {stock.value/stock.price * 100}%
      <div style = {{height: 10}}/>
      </div>
      </Fragment>
    );
  };

  return (
    <div className="form"  >
      <AppProvider>
        {console.log(stock)}
        <div className="row m-3">
        <div className="col-6">
          <div style={{ float: "left", paddingTop: 10, paddingBottom: 10 }}>
            <h2>{stock.symbol}</h2>
          </div>
          
        </div>

        <div className="col-6">
          <div style={{ float: "right", paddingTop: 10, paddingBottom: 10 }}>
            
            <h2>{Math.floor(stock.value* stock.shares * 100)/100}</h2>
          </div>
        </div>
      </div>
      <div className="row m-3">
      <div className="col-6">
        <div style={{ float: "left", textAlign: "left", paddingTop: 10, paddingBottom: 10 }}>
            
            <h2>{stock.description}</h2>
          </div>
          </div>
        <div className="col-6">
        <div style={{ float: "right", paddingTop: 10, paddingBottom: 10 }}>
            
        <h2>{Math.floor((stock.value/stock.price) * 10000)/100}%</h2>
          </div>
          
        </div>
      </div>
      </AppProvider>
    </div>
  );
};

export default StockDetails;
