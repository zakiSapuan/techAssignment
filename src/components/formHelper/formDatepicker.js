import React from "react";
import { Form } from "antd";
import "../../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
// import { DatePicker } from "antd";

const FormInput = ({ payload = {} }) => {
  const { key, name, disabled, value, onClick } = payload;

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
        wrapperClassName="datePicker"
        className="datePicker"
        selected={value}
        // onChange={(date, dateString) => onClick(dateString)}
        onChange={(event) => onClick(event)}
        minDate={moment().toDate()}
      />
    </Form.Item>
  );
};

export default FormInput;
