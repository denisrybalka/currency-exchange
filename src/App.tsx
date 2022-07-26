import axios from "axios";
import React, { useContext, useEffect } from "react";
import CurrencyExchange from "./components/CurrencyExchange";
import Header from "./components/Header";
import { ExchangeRateContext } from "./context";

const API_KEY = "d5dedcc189-54c3d15f5f-rfme67";
const API = "https://api.fastforex.io/fetch-multi?from=UAH&to=EUR,USD";

const App = () => {
  const { exchangeRate, setExchangeRate } = useContext(ExchangeRateContext);

  useEffect(() => {
    axios
      .get(`${API}&api_key=${API_KEY}`)
      .then(({ data }) => setExchangeRate({ ...data.results, UAH: 1 }));
  }, []);

  return (
    <div className="App">
      <Header />
      <CurrencyExchange />
    </div>
  );
};

export default App;
