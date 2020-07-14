import React, { Fragment, useContext, useState } from "react";
import { PortfolioContext } from "../contexts/PortfolioContext";
import RecipeForm from "../components/RecipeForm"
import { AppProvider, Card } from "@shopify/polaris";

// need access to learn inside this component
const RecipeDetails = ({ recipe }) => {
  const { removeRecipe, editRecipe } = useContext(PortfolioContext);
  const [date, setDate] = useState(recipe.date)
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState(recipe.description);
  const [title, setTitle] = useState(recipe.title);
  const [steps, setSteps] = useState(recipe.steps);
  //Function to render a Text field when editing
  
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
      <div>{recipe.description}</div>
      <div style = {{height: 10}}/>
      <div style = {{backgroundColor: "#FFEFEE"}}>
        <ol >
          {recipe?.steps?.map((step) => {
          return(
            <div>
              <div style = {{height: 10}}/>
              <li style = {{textAlign: "left", overflowWrap: "break-word"}}>
                {step}
              </li>             
            </div>
          )})}
        </ol>
        <div style = {{height: 10}}/>
      </div>
      </Fragment>
    );
  };

  return (
    <div className="container mt-5">
      <AppProvider>
        <div class="recipe-cards">
          <Card
            title={!edit &&
              <Fragment>
              <div className = "row">
              <div className = "col-6"><h2>{recipe.title}</h2></div>
              <div className = "col-6" style = {{textAlign: "right"}}><h2>{recipe.date}</h2></div>
              </div>
              </Fragment>
            }
            secondaryFooterActions={[
              {
                content: "Delete Entry",
                destructive: true,
                onAction: () => removeRecipe(recipe.id),
              },
            ]}
            primaryFooterAction={
              !edit
                ? {
                    content: "Edit your recipe",
                    onAction: () => {
                      setEdit(true);
                    },
                  }
                : {
                    content: "Save changes",
                    onAction: () => {
                      editRecipe(recipe.id, description, title, steps, date);
                      setEdit(false);
                    },
                  }
            }
          >
            <Card.Section>
              {!edit ? renderBody() : <RecipeForm button = {false} title = {title} description = {description} steps = {steps} date = {date}/>}
            </Card.Section>
          </Card>
        </div>
      </AppProvider>
    </div>
  );
};

export default RecipeDetails;
