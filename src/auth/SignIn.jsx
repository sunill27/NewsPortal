import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "./Authentication";

const SignIn = () => {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      setStatus("loading");

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        // Optionally store token in localStorage or cookies
        localStorage.setItem("token", result.token); // assuming backend returns a JWT
        setStatus("success");
      } else {
        console.error("Login failed:", result.message);
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
