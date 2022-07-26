import React, { useEffect, useContext, useState } from "react";
import { ExchangeRateContext, ExchangeStateContext } from "../context";

import Input from "./UI/Input";
import Select from "./UI/Select";

import "../scss/exchangeItem.scss";

interface ExchangeItemProps {
  isOdd?: boolean;
  currency: string;
  value: number;
  id: number;
}

interface RenderFooterProps {
  exchangeState: ICurrency[];
  exchangeRate: any;
}

const options = [
  {
    value: "United States Dollar",
    label: "USD",
    imageSrc: require("../assets/flags/usd.png"),
  },
  {
    value: "Euro",
    label: "EUR",
    imageSrc: require("../assets/flags/eur.png"),
  },
  {
    value: "Ukrainian Hryvna",
    label: "UAH",
    imageSrc: require("../assets/flags/uah.png"),
  },
];

const RenderFooter = ({ exchangeState, exchangeRate }: RenderFooterProps) => {
  const leftCurrency = exchangeState[0].currency;
  const rightCurrency = exchangeState[1].currency;

  const result = exchangeRate[rightCurrency] / exchangeRate[leftCurrency];

  return (
    <div className="exchangeItem__footer">
      <span>{`1${leftCurrency} = `}</span>
      {`${result.toFixed(3)}${rightCurrency}`}
    </div>
  );
};

const ExchangeItem = ({ isOdd, currency, value, id }: ExchangeItemProps) => {
  const { exchangeState, setExchangeState } = useContext(ExchangeStateContext);
  const { exchangeRate, setExchangeRate } = useContext(ExchangeRateContext);

  const [activeCurrency, setActiveCurrency] = useState<IOption>();

  useEffect(() => {
    setActiveCurrency(options.find((opt) => opt.label === currency));
  }, [currency]);

  const calcNewValues = (id: number, newValue: number | string) => {
    if (!isNaN(+newValue)) { // if value can be given as number
      const newArray = exchangeState.map((el: ICurrency) => {
        if (el.id === id) {
          return {
            ...el,
            value: newValue,
          };
        } else {
          if (id === 1) { // check the order of exchange
            return {
              ...el,
              value:
                (exchangeRate[el.currency] /
                  exchangeRate[exchangeState[0].currency]) *
                +newValue,
            };
          } else {
            return {
              ...el,
              value:
                (exchangeRate[el.currency] /
                  exchangeRate[exchangeState[1].currency]) *
                +newValue,
            };
          }
        }
      });
      setExchangeState(newArray);
    } else {
      const newArray = exchangeState.map((el: ICurrency) => {
        if (el.id === id) {
          return {
            ...el,
            currency: newValue,
          };
        } else {
          return el;
        }
      });

      const updatedArray = newArray.map((el: ICurrency) => {
        if (el.id === id) {
          return el;
        } else {
          if (id === 1) {
            return {
              ...el,
              value:
                (exchangeRate[el.currency] /
                  exchangeRate[newArray[0].currency]) *
                newArray[0].value,
            };
          } else {
            return {
              ...el,
              value:
                (exchangeRate[el.currency] /
                  exchangeRate[newArray[1].currency]) *
                newArray[1].value,
            };
          }
        }
      });

      setExchangeState(updatedArray);
    }
  };

  return (
    <div className={`exchangeItem ${isOdd ? "grey" : ""}`}>
      <div className="exchangeItem__head">
        <h3>{isOdd ? "You Get" : "You Have"}</h3>
        <p>{activeCurrency?.value}</p>
      </div>
      <div className="exchangeItem__converter">
        <Input value={value} id={id} calcNewValues={calcNewValues} />
        <Select
          activeCurrency={activeCurrency || options[0]}
          id={id}
          calcNewValues={calcNewValues}
          options={options}
        />
      </div>
      {isOdd && (
        <RenderFooter
          exchangeState={exchangeState}
          exchangeRate={exchangeRate}
        />
      )}
    </div>
  );
};

export default ExchangeItem;
