import React, {useEffect} from "react";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import "bootstrap/dist/css/bootstrap.min.css";
import "@shopify/polaris/styles.css";
import "./index.css";
import RecipeContextProvider from "./contexts/RecipeContext";
import RecipeForm from "./components/RecipeForm";
import ReactGA from 'react-ga';
function App() {

  useEffect(() => {
    ReactGA.initialize('UA-170137058-2');
    ReactGA.pageview('/homepage');
  }, [])

  return (
    
    <div className="App">
      <div className="container mt-5">
        <RecipeContextProvider>
          <Header />
          
          <RecipeForm button = {"Add Entry"} />
          
          <RecipeList />
        </RecipeContextProvider>
      </div>
    </div>
    
  );
}

export default App;
