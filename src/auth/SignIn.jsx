import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "./Authentication";

const SignIn = () => {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      setStatus("loading");

      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result = {};
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        result = await res.json();
      }

      if (res.ok) {
        localStorage.setItem("token", result.token || "");
        setStatus("success");
      } else {
        console.error("Login failed:", result.message || "Unknown error");
        setStatus("error");
      }
    } catch (err) {
      console.error("Server error:", err);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/");
    }
  }, [status, navigate]);

  return <Authentication type="login" onSubmit={handleLogin} />;
};

export default SignIn;
