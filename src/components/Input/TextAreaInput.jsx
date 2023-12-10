/* eslint-disable react/prop-types */
import { useState } from "react";

function TextAreaInput({
  labelTitle,
  labelStyle,
  // eslint-disable-next-line no-unused-vars
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <textarea
        value={value}
        className="textarea textarea-bordered w-full"
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
      ></textarea>
    </div>
  );
}

export default TextAreaInput;
