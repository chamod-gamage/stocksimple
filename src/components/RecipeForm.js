import React, { useState, useContext, Fragment, useCallback, useEffect } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import {Select} from "@shopify/polaris";
import CurrencyInput from 'react-currency-input-field';
import {Autocomplete, Icon, TextField, AppProvider} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import moment from "moment";

const RecipeForm = (props) => {
  
  const { addRecipe } = useContext(RecipeContext);
  const [options, setOptions] = useState([])
  const [query, setQuery] = useState('')
  const [date, setDate] = useState('');
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [company, setCompany] = useState('')
  const [stock, setStock] = useState('');
  const [shares, setShares] = useState(1);

  useEffect(() => {
    getHistorical(
      {
        stock: stock,
        interval: "daily",
        start: date,
        end: date,
        shares: shares
      }
    )

  }, [date, shares])
  
  const handleSubmit = e => {
    e.preventDefault(); //prevents page from being refreshed
    // addRecipe(date, description, title, steps); //Add steps to context
    // setDate("");
    // setCompany('');
    // setCost(0);
    // setStock('');
    // setShares(1);
    // fetchStocks()
    
  };

  const handleButton = e => {
    e.preventDefault(); //prevents page from being refreshed
    // addRecipe(date, description, title, steps); //Add steps to context
    setDate("");
    setCompany('');
    setCost(0);
    setStock('');
    setShares(1);
    fetchStocks()
    
  };

  const get = {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Authorization": "Bearer ugQFa1vAGcLGq4LXMnBCN7VY5frW",
      // "Access-Control-Allow-Headers": "*"
    }
  }

  const getHistorical = (query) => {
    fetch(`https://sandbox.tradier.com/v1/markets/history?symbol=${query.stock}&interval=${query.interval}&start=${query.start}&end=${query.end}`, get)
    .then(function(response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    }).then(function(data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log(data);
      if (query.start === query.end) {
        setPrice((data?.history?.day?.high + data?.history?.day?.low)/2)
        setCost(query.shares*(data?.history?.day?.high + data?.history?.day?.low)/2) 
      }
      

    })
    .catch(err => {
      console.log(err);
    });
  }
  

  const fetchStocks = (query) => {
    
    fetch(`https://sandbox.tradier.com/v1/markets/quotes?symbols=${query}`, get)
    .then(function(response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    }).then(function(data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log(data);
      setCompany(data?.quotes?.quote?.description)  

    })
    .catch(err => {
      console.log(err);
    });

  }

  const searchStock = (query) => {
    fetch(`https://sandbox.tradier.com/v1/markets/lookup?q=${query}`, get)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      
      (data.securities.security.length > 1) ? 
      setOptions(
        data?.securities?.security?.map(item => ({value: item.symbol, label: `${item.symbol} - ${item.description}`}))
      ) 
      :
      setOptions(
        [{value: data?.securities?.security?.symbol, label: `${data?.securities?.security?.symbol} - ${data?.securities?.security?.description}`}]
      )

      // console.log(options)
      // console.log(data?.securities?.security?.map(item => ({value: item.symbol, label: `${item.symbol} - ${item.description}`})))
    })
    .catch(err => {
      console.log(err);
    });
  }

  const updateText = useCallback(
    (value) => {
      setQuery(value)
      if (value === '') {
        setOptions([])
        return
      }
      setOptions(searchStock())
    }
  )

  const SectionHead = (label) => {
    return(
      <div className = "row"> 
      <div className = "col-12">
      <div style = {{float: "left", paddingTop: 10, paddingBottom: 10}}><h2>{label}</h2></div>
      </div>
      </div>
    )

  }

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Symbols"
      value={query}
      prefix={<Icon source={SearchMinor} color="inkLighter" />}
      placeholder="Search"
    />
  );
  
  
  return (
    
    <form onSubmit={e => {handleSubmit(e)}} style = {{backgroundColor: "#EFEFFF"}}>
      <div className = "col-12">
        <div className="row">
        
        
          
          <div class="col-3">
          {SectionHead('Date')}
            <input
            type="date"
            placeholder="date"
            value={date}
            onChange={e => {e.target.value <= moment().format("YYYY-MM-DD") && setDate(e.target.value)}}
            required
          />
          </div>
        </div>
      </div>
        
        <div className="col-4">
          
          {SectionHead('Symbol')}
          
          <textarea className="text_edit"
          name="textarea"
          rows="1"
          cols="5"
          placeholder= {"Search for symbols"}
          value={stock}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              e.preventDefault();
              searchStock(stock)
              console.log(options)
            }
          }}
          onChange={e => {setStock(e.target.value)}}
        />
        <AppProvider>
          <Select
            options={options}
            onChange={selected => setStock(selected)}
            value={stock}
          />
        </AppProvider>


       

        <div className = "col4">
          
          {SectionHead('Shares')}
          <AppProvider>
            <TextField
              type="number"
              value={shares}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  e.preventDefault();                  
                }
              }}
              onChange={value => {setShares(value)}}
            />
          </AppProvider>
        </div>
        <div className = "col4">
          
          {SectionHead('Cost')}
          
          <CurrencyInput
            value = {cost}
            placeholder="$1,000"
            defaultValue={0}
            allowDecimals={true}
            decimalsLimit={2}
            prefix = "$"
            onChange={(value) => {setCost(value); setPrice(value/shares)}}
          />
        </div>
        <div className = "col4">
          
          {SectionHead('Share Price')}
          
          <CurrencyInput
            value = {price}
            placeholder="$1,000"
            defaultValue={0}
            allowDecimals={true}
            decimalsLimit={2}
            prefix = "$"
            onChange={(value) => {setPrice(value); setCost(value*shares)}}
          />
        </div>
      </div>
      {props.button && <input type="button"  value={props.button} onClick = {e => {handleButton(e)}}/>}
      <div style = {{height: 10}}/>
    </form>
  );
};

export default RecipeForm;
