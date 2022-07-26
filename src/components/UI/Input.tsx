import React, { useEffect } from "react";

import "../../scss/input.scss";

const Input = ({
  value,
  id,
  calcNewValues,
}: {
  value: number;
  id: number;
  calcNewValues: any;
}) => {
  const [inputValue, setInputValue] = React.useState(0);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (!isNaN(value)) {
      setInputValue(value);

      calcNewValues(id, value);
    }
  };

  return (
    <input
      className="converter-input"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default Input;
