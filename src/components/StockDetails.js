import React, { Fragment, useContext, useState } from "react";
import { PortfolioContext } from "../contexts/PortfolioContext";
import RecipeForm from "./RecipeForm"
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
    <div className="container mt-5" >
      <AppProvider>
        {console.log(stock)}
        <div className="portfolio-cards">
          <Card
            style = {{backgroundColor: "#363636"}}
            subdued
            title={!edit &&
              <Fragment>
              <div className = "row">
              <div className = "col-6"><h2>{stock.symbol}</h2></div>
              <div className = "col-6" style = {{textAlign: "right"}}><h2>{stock.value * stock.shares}</h2></div>
              </div>
              </Fragment>
            }
            primaryFooterAction={[
              {
                content: "Delete Entry",
                destructive: true,
                onAction: () => removeStock(stock.id),
              },
            ]}
            // primaryFooterAction={
            //   !edit
            //     ? {
            //         content: "Edit your recipe",
            //         onAction: () => {
            //           setEdit(true);
            //         },
            //       }
            //     : {
            //         content: "Save changes",
            //         onAction: () => {
            //           editRecipe(recipe.id, description, title, steps, date);
            //           setEdit(false);
            //         },
            //       }
            // }
          >
            <Card.Section style = {{backgroundColor: "#363636"}}>
              {renderBody()}
            </Card.Section>
          </Card>
        </div>
      </AppProvider>
    </div>
  );
};

export default StockDetails;
