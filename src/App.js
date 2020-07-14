import React, { useEffect } from "react";
import Header from "./components/Header";
import StockList from "./components/StockList";
import "bootstrap/dist/css/bootstrap.min.css";
import "@shopify/polaris/styles.css";
import "./index.css";
import PortfolioContextProvider from "./contexts/PortfolioContext";
import StockForm from "./components/StockForm";
import ReactGA from "react-ga";
function App() {
  useEffect(() => {
    ReactGA.initialize('UA-170137058-3');
    ReactGA.pageview("/homepage");
    
  }, []);

  return (
    <div className="App">
      <div className="container mt-5">
        <PortfolioContextProvider>
          <Header />

          <StockForm button={"Add Holding"} />

          <StockList />
          
        </PortfolioContextProvider>
      </div>
    
    <div style = {{height: 10}}/>
    </div>

  );
}

export default App;
