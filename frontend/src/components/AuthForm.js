import React, { useContext, useState } from 'react';
import { SectionHead } from './SectionHead';

const AuthForm = ({ setAuthorized, login, setLogin, setShowForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    fetch(
      `${process.env.REACT_APP_STOCKSIMPLE_API}/users/${login ? 'login' : ''}`,
      {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    )
      .then((res) => {
        if (res.status === 409) {
          setError('Account with this username already exists.');
        } else if (res.status > 399) {
          setError(
            'Could not ' +
              (login ? 'log in.' : 'sign up.') +
              ' Please try again.'
          );
        }
        return res.json();
      })
      .then((data) => {
        if (data.username) {
          setAuthorized(true);
          setLogin(true);
        }
      })
      .catch((err) => {
        console.log(err);

        setAuthorized(false);
      });
  };

  return (
    <>
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <h1>📈</h1>
              <h1>
                {login
                  ? 'Welcome back to StockSimple!'
                  : 'Start tracking your stocks today!'}
              </h1>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="form login">
        <div className="input-row">
          <div className="input-block">
            {SectionHead('Username')}
            <input onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="input-block">
            {SectionHead('Password')}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error?.length > 0 && (
          <div className="error">
            <h4>{error}</h4>
          </div>
        )}
        <button className="btn btn-primary login-btn" onClick={handleSubmit}>
          <p>{login ? 'Log In' : 'Sign Up'}</p>
        </button>
        <div
          onClick={() => {
            setLogin(!login);
          }}
        >
          <h3>
            {login ? "Don't have an account?" : 'Already have an account?'}
          </h3>
        </div>
        <br />
      </div>
    </>
  );
};

export default AuthForm;
