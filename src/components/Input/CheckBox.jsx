/* eslint-disable react/prop-types */
import { useState } from "react";

function CheckBox({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue((prev) => !prev);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-[100px] ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
        <input
          type={type || "checkbox"}
          checked={value}
          value={value}
          className="checkbox"
          placeholder={placeholder || ""}
          onClick={(e) => updateInputValue(e.target.value)}
        />
      </label>
    </div>
  );
}

export default CheckBox;
