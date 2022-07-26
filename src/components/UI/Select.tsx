import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

import "../../scss/select.scss";

const formatOptionLabel = ({ value, label, imageSrc }: IOption) => {
  return (
    <div className="option">
      <img className="option__flag" src={imageSrc} />
      <span>{label}</span>
    </div>
  );
};

const customStyles = {
  control: (base: any) => ({
    ...base,
    width: 200,

    padding: "10px 0px",

    border: 0,
    borderBottom: "2px solid #dedede",

    borderRadius: 0,
    boxShadow: "none",
    background: "transparent",

    fontSize: 42,
    fontWeight: "bold",
  }),
};

interface SelectProps {
  id: number;
  calcNewValues: any;
  options: IOption[];
  activeCurrency: IOption;
}

const Select = ({
  activeCurrency,
  id,
  calcNewValues,
  options,
}: SelectProps) => {
  const [defaultValue, setDefaultValue] = useState<number>(options.findIndex((a) => a.label === activeCurrency.label));
  
  useEffect(() => {
    setDefaultValue(options.findIndex((a) => a.label === activeCurrency.label));
  }, [activeCurrency]);

  return (
    <ReactSelect
      options={options}
      isSearchable={false}
      formatOptionLabel={formatOptionLabel}
      components={{
        IndicatorSeparator: () => null,
      }}
      value={options[defaultValue]}
      styles={customStyles}
      onChange={(asset: any) => calcNewValues(id, asset.label)}
    />
  );
};

export default Select;
