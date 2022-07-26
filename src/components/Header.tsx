import React, { useContext } from "react";
import { ExchangeRateContext } from "../context";

import "../scss/header.scss";

const Header = () => {
  const { exchangeRate, setExchangeRate } = useContext(ExchangeRateContext);

  return (
    <header className="header">
      <p className="header__info">
        <span>Denis Rybalka</span> for ITOP1000, React Currancy Exchange
        Application
      </p>
      <ul>
        {Object.keys(exchangeRate).map((item, index) => {
          if (item !== "UAH") {
            return (
              <li key={index}>
                <span>1 UAH</span>
                {`${exchangeRate[item]} ${item}`}
              </li>
            );
          }
        })}
      </ul>
    </header>
  );
};

export default Header;
