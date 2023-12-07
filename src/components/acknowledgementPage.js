import React from "react";
import { Button, Row, Col, Card, List, Typography } from "antd";
import "../App.css";
import { formItems } from "./constant";
import { useNavigate, useLocation } from "react-router-dom";

const Acknowledgement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formValues = location.state;

  if (!formValues) {
    navigate("/");
    return;
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
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
          title={"Library XYZ - Acknowledgement Page"}
          bordered={false}
          style={{
            width: "50%",
            height: "50%",
            // display: "flex",
            alignItems: " center",
            justifyContent: " center",
          }}
        >
          <Col
            span={24}
            style={{
              display: "flex",
              alignItems: " center",
              justifyContent: " center",
            }}
          >
            <List
              bordered
              dataSource={formItems}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[{item.name}]</Typography.Text>
                  {": "}
                  {formValues[item.key]}
                  {item.showPostText}
                </List.Item>
              )}
            />
          </Col>
          <Button type="primary" style={{ marginTop: "1em" }} href={"../"}>
            Confirm
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Acknowledgement;
