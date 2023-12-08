import React from "react";
import { Form, Select } from "antd";
const { Option } = Select;

const FormDropdown = ({ payload = {} }) => {
  const {
    key,
    name,
    values,
    disabled,
    value,
    onClick,
    helperText,
    showPostText = "",
  } = payload;

  return (
    <Form.Item
      label={name}
      name={key}
      key={key}
      rules={[
        {
          required: true,
          message: `Please select ${name}!`,
        },
      ]}
      value={value}
      disabled={disabled}
      style={{ alignItems: "start" }}
    >
      <Select
        value={value}
        onChange={(event) => onClick(event)}
        style={{ alignItems: "start" }}
      >
        {values.map((item) => {
          return (
            <Option value={item} name={item} key={item}>
              {item} {showPostText}
            </Option>
          );
        })}
      </Select>

      {helperText && (
        <p style={{ margin: 0, fontSize: "0.8em", textAlign: "start" }}>
          {helperText}
        </p>
      )}
    </Form.Item>
  );
};

export default FormDropdown;
