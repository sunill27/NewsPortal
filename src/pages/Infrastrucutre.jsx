import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Infrastructure = () => {
  const [infrastructureNews, setInfrastructureNews] = useState([]);
  const [otherNews, setOtherNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3000";
  const currentCategory = "infrastructure";

  const [pageState, setPageState] = useState({
    infrastructure: 1,
  });
  const [hasMore, setHasMore] = useState({
    infrastructure: true,
  });

  const fetchInfrastructureNews = async (
    category,
    page = 1,
    append = false
  ) => {
    try {
      setLoading(true);
      const limit = 4;
      const endpoint = `${BASE_URL}/news?category=${category}&limit=${limit}&sort=latest&page=${page}`;

      const res = await axios.get(endpoint); // ✅ define res here
      const newItems = res.data.data || [];

      setInfrastructureNews((prev) =>
        append ? [...prev, ...newItems] : newItems
      );

      // If fewer items returned than requested, there's no more data
      if (newItems.length < limit) {
        setHasMore((prev) => ({
          ...prev,
          [category]: false,
        }));
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching politics news:", err);
      setError("Failed to load politics news");
    }
  };

  useEffect(() => {
    fetchInfrastructureNews("infrastructure", 1);
  }, []);

  const handleLoadMore = (category) => {
    if (!hasMore[category] || loading) return;

    const nextPage = pageState[category] + 1;
    setPageState((prev) => ({
      ...prev,
      [category]: nextPage,
    }));
    fetchInfrastructureNews(category, nextPage, true);
  };

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

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Navbar />
      <section className="p-10 bg-white dark:bg-gray-200">
        {/* Advertisement Section */}
        <div className="max-w-screen-xl mx-auto">
          <img
            src="advertisement.gif"
            alt="Ad Banner"
            className="w-full h-auto object-contain  mb-5"
          />
        </div>
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
              Infrastructure
            </div>
            <div className="flex-grow border-b-2 border-red-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {infrastructureNews && infrastructureNews.length > 0 ? (
                infrastructureNews.map((item, idx) => (
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

          {hasMore.infrastructure && (
            <div className="col-span-full text-center mt-6">
              <button
                onClick={() => handleLoadMore("infrastructure")}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
          {!hasMore.infrastructure && (
            <p className="text-center text-gray-500 col-span-full mt-4">
              No more news to load.
            </p>
          )}
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
          <div className="lg:col-span-3">
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

      <Footer />
    </>
  );
};

export default Infrastructure;
