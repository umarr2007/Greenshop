import { Button, Form, Input } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFacebook } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

FormLogin.propTypes = {
  setOpen2: PropTypes.func.isRequired,
};

export default function FormLogin({ setOpen2 }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postLogin = async () => {
    try {
      const res = await axios.post(
        `https://green-shop-backend.onrender.com/api/user/sign-in?access_token=6506e8bd6ec24be5de357927`,
        { email, password }
      );
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setOpen2(false);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("Foydalanuvchi topilmadi, qaytadan urinib ko‘ring");
      } else {
        toast.error("Tizimda xatolik yuz berdi");
      }
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      const email = decoded.email;
      const res = await axios.post(
        `https://green-shop-backend.onrender.com/api/user/sign-in/google?access_token=6506e8bd6ec24be5de357927`,
        { token: response.credential, email }
      );
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setOpen2(false);
    } catch {
      toast.error("Google bilan kirishda xatolik yuz berdi");
    }
  };

  return (
    <Form
      name="basic"
      onFinish={postLogin}
      initialValues={{ remember: true }}
      autoComplete="off"
      style={{ width: "100%" }}
    >
      <h2 className="text-[13px] mb-[14px]">
        Username va parolingizni kiriting.
      </h2>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Email kiritilmagan!" }]}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Parol kiritilmagan!" }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Parol"
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          style={{
            width: "100%",
            backgroundColor: "#46A358",
            color: "#fff",
            padding: "16px 0",
            border: "none",
            marginBottom: "30px",
          }}
        >
          Login
        </Button>
      </Form.Item>

      <h2 className="text-center mb-[27px]">
        Yoki ijtimoiy tarmoq bilan kirish
      </h2>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => toast.error("Login failed")}
        useOneTap
        shape="rectangular"
        theme="outline"
        size="large"
      />

      <Button
        className="mt-[20px] flex gap-[10px] items-center border py-[10px]"
        style={{ width: "100%" }}
      >
        <FaFacebook />
        <span>Facebook bilan kirish</span>
      </Button>
    </Form>
  );
}
