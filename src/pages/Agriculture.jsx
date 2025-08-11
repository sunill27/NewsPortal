import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Agriculture = () => {
  const [financeNews, setFinanceNews] = useState([]);
  const [otherNews, setOtherNews] = useState([]);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:3000";

  const fetchFinanceNews = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/news?category=finance&limit=6&sort=latest`
      );
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setFinanceNews(data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching finance news:", err);
      setError("Failed to load finance news");
    }
  };

  useEffect(() => {
    fetchFinanceNews();
  }, []);

  const fetchOtherNews = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/news?limit=6&sort=latest&random=true&&`
      );
      //   console.log("Other news", response);
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setOtherNews(data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching finance news:", err);
      setError("Failed to load finance news");
    }
  };

  useEffect(() => {
    fetchOtherNews();
  }, []);

  return (
    <>
      <Navbar />

      <Footer />
    </>
  );
};

export default Agriculture;
