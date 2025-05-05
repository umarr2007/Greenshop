import { Button, Form, Input, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MainButton from "../button/button";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function AccountDetails() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name);
      setSurname(storedUser.surname);
      setEmail(storedUser.email);
      setNumber(storedUser.number);
      setUsername(storedUser.username);
    }
  }, []);

  const handleSubmit = () => {
    try {
      const userData = {
        name,
        surname,
        email,
        number,
        username,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      toast.success("Successfully updated!");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <h2 className="text-[16px] leading-[16px] font-[500] text-[#3D3D3D] mb-[20px]">
        Personal Information
      </h2>
      <Form
        name="layout-multiple-horizontal"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="gap-[30px] grid grid-cols-1 sm:grid-cols-2"
      >
        <Form.Item
          layout="vertical"
          label="First Name"
          name="first name"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Last Name"
          name="last name"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input value={surname} onChange={(e) => setSurname(e.target.value)} />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Email address"
          name="email"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Phone Number"
          name="phone"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Space.Compact className="w-full">
            <Input value="+998" style={{ width: "15%" }} disabled />
            <Input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={{ width: "85%" }}
            />
          </Space.Compact>
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Username"
          name="username"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Profile photo"
          name="profile photo"
          rules={[{ required: true }]}
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 24 }}
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <button className="text-start" type="button" onClick={handleSubmit}>
          <MainButton>Save Changes</MainButton>
        </button>
      </Form>
    </>
  );
}

export default AccountDetails;
