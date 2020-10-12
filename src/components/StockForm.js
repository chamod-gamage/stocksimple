import React, {
  useState,
  useContext,
  Fragment,
  useCallback,
  useEffect
} from "react";
import { PortfolioContext } from "../contexts/PortfolioContext";
import { Select } from "@shopify/polaris";
import CurrencyInput from "react-currency-input-field";
import { Autocomplete, Icon, TextField, AppProvider } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";

const StockForm = props => {
  const { addStock, setUpdate } = useContext(PortfolioContext);
  const [options, setOptions] = useState([]);
  const [description, setDescription] = useState()
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [company, setCompany] = useState("");
  const [stock, setStock] = useState("");
  const [shares, setShares] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [trigger, setTrigger] = useState(false)
  const [click, setClick] = useState(0)

  useEffect(() => {
    // console.log(date)
    getHistorical({
      stock: stock,
      interval: "daily",
      start: date,
      end: date,
      shares: shares
    });
  }, [date, stock]);

  useEffect(() => {
    fetchStocks(stock);
  }, [click]);

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
    
    
  };

  const get = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer ugQFa1vAGcLGq4LXMnBCN7VY5frW"
      // "Access-Control-Allow-Headers": "*"
    }
  };

  const getHistorical = query => {
    fetch(
      `https://sandbox.tradier.com/v1/markets/history?symbol=${
        query.stock
      }&interval=${query.interval}&start=${query.start}&end=${query.end}`,
      get
    )
      .then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      })
      .then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        // console.log(data);
        if (query.start === query.end) {
          setPrice((data?.history?.day?.high + data?.history?.day?.low) / 2);
          setCost(
            (query.shares *
              (data?.history?.day?.high + data?.history?.day?.low)) /
              2
          );
        }
        

      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchStocks = query => {
    fetch(`https://sandbox.tradier.com/v1/markets/quotes?symbols=${query}`, get)
      .then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      })
      .then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        // console.log(data);
        setValue(data?.quotes?.quote?.last);
        setDescription(data?.quotes?.quote?.description)
        addStock(stock, data?.quotes?.quote?.description, date, price, shares, data?.quotes?.quote?.last);
        setDate("");
        setCompany("");
        setPrice(0);
        setCost(0);
        setStock("");
        setShares(0);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const searchStock = query => {
    fetch(`https://sandbox.tradier.com/v1/markets/lookup?q=${query}`, get)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        data.securities.security.length > 1
          ? setOptions(
              data?.securities?.security?.map(item => ({
                value: item.symbol,
                label: `${item.symbol} - ${item.description}`
              }))
            )
          : setOptions([
              {
                value: data?.securities?.security?.symbol,
                  
                label: `${data?.securities?.security?.symbol} - ${
                  data?.securities?.security?.description
                }`
              }
            ]);

        // console.log(options)
        // console.log(data?.securities?.security?.map(item => ({value: item.symbol, label: `${item.symbol} - ${item.description}`})))
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateText = useCallback(value => {
    setQuery(value);
    if (value === "") {
      setOptions([]);
      return;
    }
    setOptions(searchStock());
  });

  const SectionHead = label => {
    return (
      <div className="row">
        <div className="col-12">
          <div style={{ float: "left", paddingTop: 10, paddingBottom: 10 }}>
            <h2>{label}</h2>
          </div>
        </div>
      </div>
    );
  };



  return (
    <form
      className="form"
      onSubmit={e => {
        handleSubmit(e);
      }}
    >
      <div className="row m-3">
        <div className="col-6">
          {SectionHead("Symbol")}

          <textarea
            prefix="s"
            className="text_edit"
            name="textarea"
            rows="1"
            cols="5"
            placeholder={"Search for stocks (press enter)..."}
            value={query}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                setTrigger(false)
                e.preventDefault();
                searchStock(query);
                // console.log(options);
              }
            }}
            onChange={e => {
              setTrigger(true)
              setQuery(e.target.value);
              // searchStock(query);
            }}
          />
          <AppProvider>
            <Select
              placeholder={
                (trigger
                  ? "Press enter to complete search"
                  : (options.length === 0 ? "Enter search parameter" : "Select stocks from here")  )
              }
              options={options}
              onChange={selected => setStock(selected)}
              value={stock}
            />
          </AppProvider>
        </div>

        <div className="col-6">
          {SectionHead("Shares")}
          <AppProvider>
            <TextField
              type="number"
              value={shares}
              // onKeyDown={e => {
              //   if (e.keyCode === 13) {
              //     e.preventDefault();
              //   }
              // }}
              required
              onChange={value => {
                setShares(value);
                setCost(value * price);
              }}
            />
          </AppProvider>
        </div>
      </div>
      <div className="row m-3">
        <div className="col-6">
          {SectionHead("Date")}
          <input
            type="date"
            placeholder="date"
            value={date}
            onChange={e => {
              e.target.value <= moment().format("YYYY-MM-DD") &&
                setDate(e.target.value);
            }}
            required
          />
        </div>
        <div className="col-6">
          {SectionHead("Share Price")}

          <CurrencyInput
            value={price}
            style={{ height: 50, borderRadius: 7, width: "100%" }}
            placeholder="$"
            defaultValue={0}
            allowDecimals={true}
            decimalsLimit={2}
            prefix="$"
            onChange={value => {
              setPrice(value);
              setCost(value * shares);
            }}
            required
          />
        </div>
      </div>
      <div
        style={{ margin: "auto", textAlign: "center" }}
        className="row m-3 align-items-center center"
      >
        <div className="col-12 align-self-center">
          
          <button
            onClick={e => {
              setClick(click + 1)
              handleButton(e);
            }}
            className="btn btn-primary"
            disabled = {!(stock && date && shares > 0 && price > 0)} 
          >
            {" "}
            <h2> {props.button} </h2>
            <div className="row" style={{ justifyContent: "center" }}>
              <div style={{ margin: "auto 0" }} />
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default StockForm;
