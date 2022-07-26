import React, { useEffect, useState } from "react";

import "../../scss/input.scss";

interface InputProps {
  value: number;
  id: number;
  calcNewValues: any;
}

const Input = ({ value, id, calcNewValues }: InputProps) => {
  const [inputValue, setInputValue] = useState(0);

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
