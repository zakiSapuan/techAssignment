import React from "react";
import { Button, Row, Col, Card, List, Typography } from "antd";
import "../App.css";
import { acknowledgementItems, additionalFormItems } from "./constant";
import { useNavigate, useLocation } from "react-router-dom";

const Acknowledgement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formValues = { ...location.state };

  if (!formValues) {
    navigate("/");
    return;
  }

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
          title={<Typography>Library XYZ - Acknowledgement Page</Typography>}
          bordered={false}
          style={{
            width: "50%",
            height: "50%",
            // display: "flex",
            alignItems: " center",
            justifyContent: " center",
            marginTop: "10%",
          }}
        >
          <Typography.Text style={{ marginTop: 0, color: "green" }}>
            Your booking has been confirmed!
          </Typography.Text>
          <Col
            span={24}
            style={{
              display: "flex",
              alignItems: " center",
              justifyContent: " center",
            }}
            bordered={false}
          >
            <List
              style={{
                textAlign: "left",
              }}
              bordered={false}
              dataSource={[...acknowledgementItems, ...additionalFormItems]}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text>
                    {item.name}: {formValues[item.key]} {item.showPostText}
                  </Typography.Text>
                </List.Item>
              )}
            />
          </Col>
          <Button
            type="primary"
            style={{ marginTop: "1em", marginLeft: "1em" }}
            href={"../"}
          >
            <Typography.Text style={{ color: "white" }}>Home</Typography.Text>
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Acknowledgement;
