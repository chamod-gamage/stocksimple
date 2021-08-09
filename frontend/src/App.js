import React, { useEffect, useState } from 'react';
import StockList from './components/StockList';
import AuthForm from './components/AuthForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@shopify/polaris/styles.css';
import PortfolioContextProvider from './contexts/PortfolioContext';
import ReactGA from 'react-ga';
import Footer from './components/Footer';
import './index.scss';

function App() {
  const [authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    ReactGA.initialize('UA-170137058-3');
    ReactGA.pageview('/homepage');
    fetch(`${process.env.REACT_APP_STOCKSIMPLE_API}/users/authorized`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data._id);
        setAuthorized(data.authorized === true);
      })
      .catch((err) => {
        setAuthorized(false);
      });
  }, []);

  return (
    <div className="App">
      <div className="container mt-5">
        {authorized === true ? (
          <PortfolioContextProvider user={user} setUser={setUser}>
            <StockList setAuthorized={setAuthorized} />
            <Footer />
          </PortfolioContextProvider>
        ) : authorized === false ? (
          <AuthForm setAuthorized={setAuthorized} />
        ) : (
          <div>
            <h1>Spinning up server...</h1>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default App;
