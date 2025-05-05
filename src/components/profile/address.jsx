import { Form, Input, Space } from "antd";
import MainButton from "../button/button";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Address() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [extra, setExtra] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [firstName, setFirstName] = useState(storedUser?.name || "");
  const [lastName, setLastName] = useState(storedUser?.surname || "");
  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleSubmit = (values) => {
    try {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        region: region,
        city: city,
        street: street,
        extra: extra,
        state: state,
        zip: zip,
      };
      console.log(userData);
      localStorage.setItem("address", JSON.stringify(userData));
      setUser((prevState) => ({ ...prevState, name: firstName })); // Update user name in state
      toast.success("Address updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while saving the address");
    }
  };

  return (
    <>
      <h2 className="text-[16px] leading-[16px] font-[500] text-[#3D3D3D] mb-[10px]">
        Billing Address
      </h2>
      <h3 className="text-[14px] leading-[15px] font-[400] text-[#727272] mb-[30px]">
        The following addresses will be used on the checkout page by default.
      </h3>
      <Form
        name="layout-multiple-horizontal"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="gap-[30px] grid grid-cols-1 sm:grid-cols-2"
        onFinish={handleSubmit}
      >
        <Form.Item
          layout="vertical"
          label="First Name"
          name="first name"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValue={firstName}
        >
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Last Name"
          name="last name"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValue={lastName}
        >
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Country / Region"
          name="region"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            placeholder="Select a country / region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Town / City"
          name="city"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            placeholder="Select a town / city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Street Address"
          name="street"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            placeholder="House number and street name"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Extra address"
          name="extra"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            placeholder="Apartment, suite, unit, etc. (optional)"
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="State"
          name="state"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            placeholder="Select a state..."
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Zip"
          name="zip"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            placeholder="Apartment, suite, unit, etc. (optional)"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Email address"
          name="email"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValue={storedUser?.email || ""}
        >
          <Input placeholder="asliddinnorboyev@gmail.com" />
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
            <Input style={{ width: "15%" }} defaultValue="+998" />
            <Input
              style={{ width: "85%" }}
              defaultValue={storedUser?.number || ""}
            />
          </Space.Compact>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <MainButton onClick={handleSubmit}>Save Changes</MainButton>
        </Form.Item>
      </Form>
    </>
  );
}

export default Address;
