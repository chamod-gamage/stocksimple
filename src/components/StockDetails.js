import React, { Fragment, useContext, useState } from "react";
import { PortfolioContext } from "../contexts/PortfolioContext";
import RecipeForm from "./StockForm"
import { AppProvider, Card } from "@shopify/polaris";

// need access to learn inside this component
const StockDetails = (props) => {
  const { removeStock,stocks} = useContext(PortfolioContext);
  // const [date, setDate] = useState(stock?.date)
  // const [edit, setEdit] = useState(false);
  // const [description, setDescription] = useState(stock?.description);
  // const [value, setValue] = useState(stock?.value);
  // const [symbol, setSymbol] = useState(stock?.symbol);
 
  
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
      <div>{stocks[props.index]?.description}</div>
      <div style = {{height: 10}}/>
      <div style = {{backgroundColor: "#FFEFEE"}}>
        {stocks[props.index]?.value/stocks[props.index]?.price * 100}%
      <div style = {{height: 10}}/>
      </div>
      </Fragment>
    );
  };

  return (
    <div className="form"  >
      <AppProvider>
        {console.log(props)}
        {console.log(stocks)}
        {console.log(props.index)}
        <div className="row m-3">
        <div className="col-6">
          <div style={{ float: "left", paddingTop: 10, paddingBottom: 10 }}>
            <h2>{stocks[props.index]?.symbol}</h2>
          </div>
          
        </div>

        <div className="col-6">
          <div style={{ float: "right", paddingTop: 10, paddingBottom: 10 }}>
            
            <h2>${(stocks[props.index]?.value* stocks[props.index]?.shares).toFixed(2)}</h2>
          </div>
        </div>
      </div>
      <div className="row m-3">
      <div className="col-6">
        <div style={{ float: "left", textAlign: "left", paddingTop: 10, paddingBottom: 10 }}>
            
            <h2>{stocks[props.index]?.description}</h2>
          </div>
          </div>
        <div className="col-6">
        <div style={{ float: "right", paddingTop: 10, paddingBottom: 10 }}>
            
        <h2>{stocks[props.index]?.value/stocks[props.index]?.price > 1 && "+"}{  ((stocks[props.index]?.value/stocks[props.index]?.price)*100-100).toFixed(2)}%</h2>
          </div>
          
        </div>
      </div>
      <div className = "row m-3">
        <div className="col-6">
          <div style={{ float: "left", textAlign: "left", paddingTop: 10, paddingBottom: 10 }}>
            
            <h2>Shares: {stocks[props.index]?.shares}</h2>
          </div>
        </div>
        
        <div className="col-6">
      <div
        style={{ margin: "auto", textAlign: "right" }}
        className="row m-3 align-items-center center"
      >
        <div style = {{padding: 0}}className="col-12 align-self-center">
          <button
            
            onClick={e => {
              removeStock(stocks[props.index].id)
            }}
            className="btn btn-primary"
          >
            {" "}
            <h2> Delete Holding </h2>
            <div className="row" style={{ justifyContent: "center" }}>
              <div style={{ margin: "auto 0" }} />
            </div>
          </button>
        </div>
      </div>
      </div>
      </div>
      </AppProvider>
    </div>
  );
};

export default StockDetails;
