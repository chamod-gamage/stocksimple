import React, { useState, useContext, useEffect } from 'react';
import { SectionHead } from './SectionHead';
import { PortfolioContext } from '../contexts/PortfolioContext';
import { Select } from '@shopify/polaris';
import CurrencyInput from 'react-currency-input-field';
import { TextField, AppProvider } from '@shopify/polaris';
import moment from 'moment';
import _ from 'lodash'

const StockForm = (props) => {
  const { addStock } = useContext(PortfolioContext);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState('');
  const [shares, setShares] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [click, setClick] = useState(0);
  const [error, setError] = useState('');

  const get = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `${process.env.REACT_APP_TRADIER_API_TOKEN}`,
    },
  };

  const getHistorical = (query) => {
    fetch(
      `https://sandbox.tradier.com/v1/markets/history?symbol=${query.stock}&interval=${query.interval}&start=${query.start}&end=${query.end}`,
      get
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (query.start === query.end) {
          setPrice((data?.history?.day?.high + data?.history?.day?.low) / 2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchStocks = (query) => {
    fetch(`https://sandbox.tradier.com/v1/markets/quotes?symbols=${query}`, get)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        addStock(
          stock,
          data?.quotes?.quote?.description,
          date,
          price,
          shares,
          data?.quotes?.quote?.last
        );
        setDate('');
        setPrice(0);
        setStock('');
        setShares(0);
      })
      .catch((err) => {
        setError(JSON.stringify(err));
      });
  };

  const searchStock = async (query) => {
    try {
      let results = await Promise.all([
        fetch(
          `https://sandbox.tradier.com/v1/markets/search?q=${query}`,
          get
        ).then((res) => res.json()),
        fetch(
          `https://sandbox.tradier.com/v1/markets/lookup?q=${query}`,
          get
        ).then((res) => res.json()),
      ]);
      let unfilteredOptions = results.flatMap((data) =>
        data?.securities?.security
          ? [data?.securities?.security] //the api annoyingly returns an object instead of array of objects when there's only one security
              ?.flatMap((arr) => arr)
              .map((item) => ({
                value: item.symbol,
                label: `${item.symbol} - ${item.description}`,
              }))
          : []
      );
      let filteredOptions = _.uniqBy(unfilteredOptions, 'value') || [];
      setOptions(filteredOptions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (date?.length > 0 && stock?.length > 0) {
      getHistorical({
        stock: stock,
        interval: 'daily',
        start: date,
        end: date,
        shares: shares,
      });
    }
  }, [date, stock]);

  useEffect(() => {
    fetchStocks(stock);
  }, [click]);

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents page from being refreshed
  };

  const handleButton = (e) => {
    e.preventDefault(); //prevents page from being refreshed
    setClick(click + 1);
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="row m-3">
        <div className="col-6">
          {SectionHead('Symbol')}

          <textarea
            prefix="s"
            className="text_edit"
            name="textarea"
            rows="1"
            cols="5"
            placeholder={'Search for stocks (press enter)...'}
            value={query}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                setTrigger(false);
                e.preventDefault();
                searchStock(query);
              }
            }}
            onChange={(e) => {
              setTrigger(true);
              setStock('');
              setQuery(e.target.value);
            }}
          />
          <AppProvider>
            <Select
              placeholder={
                trigger
                  ? 'Press enter to complete search'
                  : error?.length > 0 && error !== '{}'
                  ? error
                  : options.length === 0
                  ? 'Enter search parameter'
                  : 'Select stocks from here'
              }
              options={options}
              onChange={setStock}
              value={stock}
            />
          </AppProvider>
        </div>

        <div className="col-6">
          {SectionHead('Shares')}
          <AppProvider>
            <TextField
              type="number"
              value={shares}
              required
              onChange={(value) => {
                setShares(value);
              }}
            />
          </AppProvider>
        </div>
      </div>
      <div className="row m-3">
        <div className="col-6">
          {SectionHead('Date')}
          <input
            type="date"
            placeholder="date"
            value={date}
            onChange={(e) => {
              e.target.value <= moment().format('YYYY-MM-DD') &&
                setDate(e.target.value);
            }}
            required
          />
        </div>
        <div className="col-6">
          {SectionHead('Share Price')}

          <CurrencyInput
            value={price}
            className="currency-input"
            placeholder="$"
            defaultValue={0}
            allowDecimals={true}
            decimalsLimit={2}
            prefix="$"
            onChange={(value) => {
              setPrice(value);
            }}
            required
          />
        </div>
      </div>
      <div className="row m-3 align-items-center center">
        <div className="col-12 align-self-center">
          <button
            onClick={handleButton}
            className="btn btn-primary"
            disabled={!(stock && date && shares > 0 && price > 0)}
          >
            {' '}
            <h2> {props.buttonText} </h2>
          </button>
        </div>
      </div>
    </form>
  );
};

export default StockForm;
