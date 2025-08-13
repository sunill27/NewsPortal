import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Sports = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [otherNews, setOtherNews] = useState([]);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:3000";
  const currentCategory = "sports";

  const fetchSportsNews = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/news?category=sports&limit=6&sort=latest`
      );
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setSportsNews(data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching sports news:", err);
      setError("Failed to load sports news");
    }
  };

  useEffect(() => {
    fetchSportsNews();
  }, []);

  const fetchOtherNews = async (currentCategory) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/news?limit=6&sort=latest&random=true&excludeCategory=${currentCategory}`
      );
      console.log("Other news", response);
      const data = response.data?.data;

      if (Array.isArray(data)) {
        setOtherNews(data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching other news:", err);
      setError("Failed to load other news");
    }
  };

  useEffect(() => {
    fetchOtherNews(currentCategory);
  }, [currentCategory]);
  return (
    <>
      <Navbar />
      <section className="p-10 bg-white dark:bg-gray-200">
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
              Sports
            </div>
            <div className="flex-grow border-b-2 border-red-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {sportsNews && sportsNews.length > 0 ? (
                sportsNews.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    className="bg-white shadow rounded-lg overflow-hidden"
                  >
                    <img
                      src={item?.imageUrl || "news.jpg"}
                      alt={item?.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <Link to={`/news/${item._id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                          {item?.title}
                        </h3>
                      </Link>
                      <h4 className="text-md text-gray-800">{item?.excerpt}</h4>
                      <p className="text-md text-gray-800 mt-2">
                        <span className="text-green-600 font-semibold">
                          {item?.author || "Bitta Today"}
                        </span>
                        <span>,</span>{" "}
                        {item?.publishedAt?.slice(0, 10) || "Unknown time"}
                      </p>
                    </div>
                  </div>
                ))
              ) : error ? (
                <p className="text-red-600 col-span-full">{error}</p>
              ) : (
                <p className="text-gray-500 col-span-full">Loading news...</p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Ad Section */}
          <div className="bg-gray-100 p-4 rounded-lg shadow h-fit">
            <h2 className="bg-green-600 text-white text-sm font-semibold px-3 py-2 rounded">
              विज्ञापन
            </h2>
            <div className="mt-4 space-y-4">
              <div className="w-full h-40 bg-white rounded shadow overflow-hidden flex items-center justify-center">
                <img
                  src="news.jpg"
                  alt="Ad Banner 1"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full h-40 bg-white rounded shadow overflow-hidden flex items-center justify-center">
                <img
                  src="news.jpg"
                  alt="Ad Banner 2"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full h-40 bg-white rounded shadow overflow-hidden flex items-center justify-center">
                <img
                  src="news.jpg"
                  alt="Ad Banner 3"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other News Section */}
      <section className="p-10 bg-white  dark:bg-gray-200">
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
              Other News
            </div>
            <div className="flex-grow border-b-2 border-red-600"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {otherNews && otherNews.length > 0 ? (
                otherNews.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    className="bg-white shadow rounded-lg overflow-hidden"
                  >
                    <img
                      src={item?.imageUrl || "news.jpg"}
                      alt={item?.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <Link to={`/news/${item._id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                          {item?.title}
                        </h3>
                      </Link>
                      <h4 className="text-md text-gray-800">{item?.excerpt}</h4>
                      <p className="text-md text-gray-800 mt-2">
                        <span className="text-green-600 font-semibold">
                          {item?.author || "Bitta Today"}
                        </span>
                        <span>,</span>{" "}
                        {item?.publishedAt?.slice(0, 10) || "Unknown time"}
                      </p>
                    </div>
                  </div>
                ))
              ) : error ? (
                <p className="text-red-600 col-span-full">{error}</p>
              ) : (
                <p className="text-gray-500 col-span-full">Loading news...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Sports;
