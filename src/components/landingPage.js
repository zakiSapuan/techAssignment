import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "antd";
import "../App.css";
import { formItems, podLocation, layout, tailLayout } from "./constant";
import FormInput from "./formHelper/formInput";
import FormDropdown from "./formHelper/formDropdown";
import FormDatePicker from "./formHelper/formDatepicker";
import validateForm from "./formHelper/formValidator";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

const LandingPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  let listOfFormItems = [];

  // To pre-populate onClick function for each form input
  if (formItems && !listOfFormItems.length) {
    listOfFormItems = formItems.map((item) => {
      return {
        ...item,
        onClick: (payload) => updateFormValues(item.key, payload),
      };
    });
  }

  const updateFormValues = (key, value) => {
    const newValues =
      key === "podNumber"
        ? {
            [key]: value,
            podLocation: podLocation[parseInt(value) - 1],
          }
        : key === "dateOfBooking"
        ? {
            [key]: moment(value).format("DD MMM YYYY"),
          }
        : {
            [key]: value,
          };

    form.setFieldsValue({
      ...newValues,
    });
  };

  const submitBookingForm = () => {
    const allFormValues = form.getFieldValue();
    const errorMessageValidate = validateForm(allFormValues, listOfFormItems);

    if (errorMessageValidate?.errorMessage) {
      setErrorMessage(errorMessageValidate.errorMessage);
    } else {
      navigate("./Acknowledgement", {
        state: { ...allFormValues, endTime: errorMessageValidate },
      });
    }
  };

  return (
    <Row
      style={{
        display: "flex",
        alignItems: " center",
        justifyContent: " center",
      }}
    >
      {/* <Row align={"center"} className={"justify-content-center"}> */}
      <Col
        span={24}
        style={{
          display: "flex",
          alignItems: " center",
          justifyContent: " center",
        }}
      >
        <Card
          title={"Library XYZ - Pod Booking Portal"}
          bordered={false}
          style={{
            width: "50%",
            height: "50%",
            // display: "flex",
            alignItems: " center",
            justifyContent: " center",
            marginTop: "5%",
          }}
        >
          <p style={{ fontSize: "0.9em", marginTop: 0, marginBottom: 0 }}>
            Welcome to the pod booking portal for Library XYZ!
          </p>
          <p style={{ fontSize: "0.9em", marginTop: 0 }}>
            Opening Hours: 12PM to 8PM daily!
          </p>
          <Col
            span={24}
            style={{
              display: "flex",
              alignItems: " center",
              justifyContent: " center",
            }}
          >
            <Form
              {...layout}
              name="basic"
              style={{ width: "100%" }}
              form={form}
            >
              {listOfFormItems?.length &&
                listOfFormItems.map((formContent) => {
                  const { type } = formContent;

                  switch (type) {
                    case "textInput":
                      return <FormInput payload={formContent} />;
                    case "dropdown":
                      return <FormDropdown payload={formContent} />;
                    case "datePicker":
                      return <FormDatePicker payload={formContent} />;
                    default:
                      return;
                  }
                })}
              <Form.Item {...tailLayout} key={"button"}>
                {/* <Button type="primary" htmlType="submit" > */}
                <Button type="primary" onClick={() => submitBookingForm()}>
                  Submit
                </Button>
              </Form.Item>
              {errorMessage && (
                <p style={{ margin: 0, color: "red" }}>Error: {errorMessage}</p>
              )}
            </Form>
          </Col>
        </Card>
      </Col>
    </Row>
  );
};

export default LandingPage;
