import React, { useEffect, useState } from "react";
import Authentication from "./Authentication";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      setStatus("loading");
      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        console.error("Registration failed:", result.message);
        setStatus("error");
      }
    } catch (err) {
      console.error("Server error:", err);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/login");
    }
  }, [status, navigate]);

  return <Authentication type="register" onSubmit={handleRegister} />;
};

export default SignUp;
