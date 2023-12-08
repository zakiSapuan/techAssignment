import React from "react";
import { Form } from "antd";
import "../../App.css";
import { DatePicker } from "antd";
const dayjs = require("dayjs");

const FormInput = ({ payload = {} }) => {
  const { key, name, disabled, value, onClick } = payload;
  const disabledDate = (current) => {
    return current && current < dayjs().subtract(1, "day").endOf("day");
  };

  return (
    <Form.Item
      label={name}
      name={key}
      key={key}
      rules={
        !disabled && [
          {
            required: true,
            message: `Please input ${name}!`,
          },
        ]
      }
      onChange={(event) => onClick(event)}
    >
      <DatePicker
        disabledDate={disabledDate}
        className="datePicker"
        selected={value}
        format="D MMM YYYY"
        onChange={(event) => {
          onClick(event);
        }}
        minDate={dayjs().toDate()}
      />
    </Form.Item>
  );
};

export default FormInput;
