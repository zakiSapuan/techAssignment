import React from "react";
import { Form, Input } from "antd";

const FormInput = ({ payload = {} }) => {
  const { key, name, disabled, onClick } = payload;
  if (!key || !name || !onClick) return;

  return (
    <Form.Item
      label={name}
      name={key}
      key={key}
      rules={[
        {
          required: true,
          message: `Please input ${name}!`,
        },
      ]}
      onChange={(event) => onClick(event.target.value)}
      style={{ alignItems: "start" }}
    >
      <Input disabled={disabled} />
    </Form.Item>
  );
};

export default FormInput;
