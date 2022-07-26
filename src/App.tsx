import React, { useContext, useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

import axios from "axios";
import { ExchangeRateContext } from "./context";

import CurrencyExchange from "./components/CurrencyExchange";
import Header from "./components/Header";

import "./scss/app.scss";

const API_KEY = "d5dedcc189-54c3d15f5f-rfme67";
const API = "https://api.fastforex.io/fetch-multi?from=UAH&to=EUR,USD";

const App = () => {
  const { exchangeRate, setExchangeRate } = useContext(ExchangeRateContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}&api_key=${API_KEY}`)
      .then(({ data }) => setExchangeRate({ ...data.results, UAH: 1 }))
      .catch((e) => {
        console.error("Error while fetching data!", e);
        setError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1500)
      });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="loader-wrap">
          <BeatLoader size={50} color={"lightgreen"} />
        </div>
      ) : (
        <div className="content">
          <Header />
          <CurrencyExchange />
        </div>
      )}
    </div>
  );
};

export default App;
