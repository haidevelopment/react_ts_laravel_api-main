import React, { useState, ChangeEvent } from "react";

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  html?: "input" | "textarea";
  type?: string;
  left?: string;
  values: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  submit: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder = "",
  required = false,
  html = "input",
  onChange,
  type = "text",
  left = "0px",
  values = "",
  submit,
}) => {
  const [value, setValue] = useState<string>(values);
  // const [error, setError] = useState<string>('');

  // const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   e.preventDefault();
  //   if (required && !value) {
  //     setError(`${label} là bắt buộc.`);
  //   } else {
  //     setError('');
  //   }
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div
      style={{
        marginBottom: "1rem",
        marginTop: "10px",
        flex: "1",
        marginLeft: left,
        position: "relative",
      }}
    >
      <label
        htmlFor={name}
        style={{ display: "block", marginBottom: "0.5rem" }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      {html === "input" ? (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          // required={required}
          // onBlur={handleBlur}
          style={{
            border: `1px solid ${
              submit && required && value == "" ? "red" : "#ccc"
            }`,
            padding: "0.5rem",
            borderRadius: "4px",
            width: "100%",
            height: "40px",
          }}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          // required={required}
          // onBlur={handleBlur}
          style={{
            border: `1px solid ${
              submit && required && value == "" ? "red" : "#ccc"
            }`,
            padding: "0.5rem",
            borderRadius: "4px",
            width: "100%",
            height: "221px",
          }}
        />
      )}

      {submit && required && value == "" && (
        <span
          style={{
            color: "red",
            fontSize: "0.875rem",
            position: "absolute",
            bottom: "-20px",
            left: "0",
          }}
        >
          Vui lòng không để trống trường này
        </span>
      )}
    </div>
  );
};

export default Input;
