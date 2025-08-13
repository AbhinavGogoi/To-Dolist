import { React, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Navbar.css";
import axios from "axios";

import { Button, Modal, Checkbox, Form, Input, message } from "antd";
export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/api/user-login",
        values
      );
      console.log("Login Response:", response.data);
      if (!response.data.success) {
        messageApi.error(response.data.message);
        return;
      }

      const token = response.data.token;
      localStorage.setItem("token", token);

      messageApi.success(response.data.message);
      navigate("/profile");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Login Error:", error);
      messageApi.error("Login failed. Please try again.");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <>
      {contextHolder}
      <nav>
        <div className="navigation">
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/task">Task</Link>
            </li>
          </ul> 
        </div>
        <div className="login">
        {!isLoggedIn && (
          <div className="buttons"><Button variant="primary" onClick={showModal}>
              Login
            </Button><Button variant="outlined"></Button></div>
        )}
        {isLoggedIn && (
          <Button
            type="primary"
            onClick={() => {
              localStorage.removeItem("token");
              messageApi.success("Logged out successfully");
              navigate("/");
            }}
          >
            Logout
          </Button>
        )}
        </div>
      </nav>
      <Modal
        title="Login"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        Dont have an account?{" "}
        <Link
          to="/register"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Register
        </Link>
      </Modal>
    </>
  );
}
