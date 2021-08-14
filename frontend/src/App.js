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
  const [showForm, setShowForm] = useState(true);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    ReactGA.initialize('UA-170137058-3');
    ReactGA.pageview('/homepage');
    if (localStorage.getItem('stocks')) {
      setLogin(true);
      setShowForm(true);
    }
    fetch(`${process.env.REACT_APP_STOCKSIMPLE_API}/users/authorized`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data._id);
        setAuthorized(data.authorized === true);
        setShowForm(data.authorized !== true && localStorage.getItem('stocks'));
      })
      .catch((err) => {
        setAuthorized(false);
        setShowForm(localStorage.getItem('stocks') && true);
      });
  }, []);

  return (
    <div className="App">
      <div className="container mt-5">
        {/* {JSON.stringify(login)} */}
        {authorized !== null ? (
          !showForm || authorized ? (
            <PortfolioContextProvider
              authorized={authorized}
              user={user}
              setUser={setUser}
              login={login}
            >
              <StockList
                setShowForm={setShowForm}
                authorized={authorized}
                setAuthorized={setAuthorized}
              />
              <Footer />
            </PortfolioContextProvider>
          ) : (
            <>
              <AuthForm
                setShowForm={setShowForm}
                setAuthorized={setAuthorized}
                login={login}
                setLogin={setLogin}
              />
              <button
                onClick={() => {
                  setShowForm(false);
                }}
                className="btn btn-primary"
              >
                Continue without{login ? ' logging in ' : ' signing up '}→
              </button>
            </>
          )
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
