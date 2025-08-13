import React from "react";
import axios from "axios";
import { Form, Input, Button, message,DatePicker } from "antd";
import { jwtDecode } from "jwt-decode";
import "./Task.css";
export default function Task() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return null;
      }
      const decodedToken = jwtDecode(token);
      const userID = decodedToken.userid;
      const payload = {
        ...values,
        duedate: values.duedate.toDate().toISOString()
      };
      console.log("Decoded User ID:", userID);
      console.log("Task Payload:", payload);
      // Send the task data to the server
        const response = await axios.post(
        `http://localhost:3000/task/api/add/${userID}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Task Added:", response.data);
      if (response.data.success) {
        messageApi.success(response.data.message);
      } else {
        messageApi.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task. Please try again.");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <div className="task">
        <div className="card">
          <Form
            name="Task"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Input />
            </Form.Item>
            <Form.Item name="priority" label="Priority">
              <Input />
            </Form.Item>
            <Form.Item name="duedate" label="Due-Date">
               <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                ADD TASK
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
