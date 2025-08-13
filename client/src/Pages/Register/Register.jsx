import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router";
// import '../stylesheets/Register.css';
export default function Register() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/api/user-create",
        values
      );
      console.log("Register Response:", response.data);
      if (!response.data.success) {
        messageApi.error(response.data.message);
      }
      messageApi.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      messageApi.error("Registration failed. Please try again.");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    messageApi.error("Failed to register. Please check your inputs.");
  };

  return (
    <div className="register-container">
      {contextHolder}
      <h2>Register</h2>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
            { pattern: /^\d{10}$/, message: "Phone number must be 10 digits!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Profession"
          name="profession"
          rules={[{ required: true, message: "Please input your profession!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

        <Form.Item>
          Already have an account? <Link to="/">Login</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
