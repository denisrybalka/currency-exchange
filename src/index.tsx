import React from "react";
import ReactDOM from "react-dom/client";
import { ExchangeRateContext, ExchangeStateContext } from "./context";
import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function Main() {
  const [exchangeState, setExchangeState] = React.useState<ICurrency[]>([
    { currency: "UAH", value: 0, id: 1 },
    { currency: "USD", value: 0, id: 2 },
  ]);
  const [exchangeRate, setExchangeRate] = React.useState({});

  return (
    <ExchangeRateContext.Provider value={{ exchangeRate, setExchangeRate }}>
      <ExchangeStateContext.Provider
        value={{ exchangeState, setExchangeState }}
      >
        <App />
      </ExchangeStateContext.Provider>
    </ExchangeRateContext.Provider>
  );
}

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
