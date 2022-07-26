import React, { useContext } from "react";
import { ExchangeStateContext } from "../context";
import ExchangeItem from "./ExchangeItem";

import { ReactComponent as ExchangeImage } from "../assets/exchange.svg";

import "../scss/currencyExchange.scss";

const CurrencyExchange = () => {
  const { exchangeState, setExchangeState } = useContext(ExchangeStateContext);

  return (
    <div className="curencyExchange">
      {exchangeState.map((item: ICurrency, index: number) => {
        return <ExchangeItem isOdd={index % 2 !== 0} {...item} key={item.id} />;
      })}

      <ExchangeImage className="curencyExchange__image" />
    </div>
  );
};

export default CurrencyExchange;
