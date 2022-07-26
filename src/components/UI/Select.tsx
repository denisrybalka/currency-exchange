import React from "react";
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
  currency: string;
  id: number;
  calcNewValues: any;
  options: IOption[];
}

const Select = ({ currency, id, calcNewValues, options }: SelectProps) => {
  const defaultValue = options[options.findIndex((o) => o.label === currency)];

  return (
    <ReactSelect
      options={options}
      isSearchable={false}
      formatOptionLabel={formatOptionLabel}
      components={{
        IndicatorSeparator: () => null,
      }}
      defaultValue={defaultValue}
      styles={customStyles}
      onChange={(asset: any) => calcNewValues(id, asset.label)}
    />
  );
};

export default Select;
