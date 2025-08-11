import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home = () => {
  const [newsData, setNewsData] = useState({
    politics: [],
    finance: [],
    corporate: [],
    trending: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:3000";
  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const [politicsRes, financeRes, corporateRes, trendingRes] =
        await Promise.all([
          axios.get(`${BASE_URL}/news?category=politics&limit=6&sort=latest`),
          axios.get(`${BASE_URL}/news?category=finance&limit=6&sort=latest`),
          axios.get(`${BASE_URL}/news?category=corporate&limit=6&sort=latest`),
          axios.get(`${BASE_URL}/news?limit=5&sort=latest`), // trending — no category, just latest
        ]);
      setNewsData({
        trending: trendingRes.data.data || [],
        finance: financeRes.data.data || [],
        politics: politicsRes.data.data || [],
        corporate: corporateRes.data.data || [],
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNewsData();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900 font-">
        {/* Top Section */}
        <section className="w-full mx-auto p-5 sm:p-10 md:p-10 relative dark:bg-gray-200">
          <div className="mb-6">
            <div className="flex items-center">
              <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
                Top News
              </div>
              <div className="flex-grow border-b-2 border-red-600"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            {newsData.trending && newsData.trending.length > 0 && (
              <>
                <div
                  className="sm:col-span-5 bg-white shadow rounded-lg overflow-hidden flex flex-col"
                  style={{ height: "550px" }}
                >
                  <Link to={`/news/${newsData.trending[0]._id}`}>
                    <img
                      src={
                        newsData.trending[0].imageUrl ||
                        "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                      }
                      alt={newsData.trending[0].title}
                      className="w-full h-80 object-cover"
                    />
                  </Link>
                  <div
                    className="p-4 flex flex-col justify-between flex-grow"
                    style={{ height: "calc(450px - 240px)" }}
                  >
                    <Link
                      to="#"
                      className="text-xs text-indigo-600 uppercase font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                    >
                      {newsData.trending[0].category || "Category"}
                    </Link>
                    <Link
                      to={`/news/${newsData.trending[0]._id}`}
                      className="text-gray-900 font-bold text-2xl my-2 hover:text-indigo-600 transition duration-500 ease-in-out"
                    >
                      {newsData.trending[0].title}
                    </Link>
                    <p
                      className="text-gray-700 text-base mb-4 overflow-hidden"
                      style={{ maxHeight: "100px", textOverflow: "ellipsis" }}
                    >
                      {newsData.trending[0].excerpt}
                    </p>
                    <Link to={`/news/${newsData.trending[0]._id}`}>
                      <button className="w-40 bg-blue-400 hover:bg-blue-700 text-white py-1 px-3 rounded-full text-sm self-center">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}

            <div className="sm:col-span-7 grid grid-cols-2 gap-4">
              {newsData.trending && newsData.trending.length > 1 ? (
                newsData.trending.slice(1).map((item, idx) => (
                  <div
                    key={item._id || idx}
                    className="bg-white shadow rounded-lg overflow-hidden"
                  >
                    <img
                      src={
                        item?.imageUrl ||
                        "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                      }
                      alt={item?.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <Link to={`/news/${item._id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 cursor-pointer">
                          {item?.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-700 mt-1">
                        {item?.excerpt}
                      </p>
                      <p className="text-xs text-gray-600 mt-3">
                        <span className="text-green-600 font-semibold">
                          {item?.author || "Bitta Today"}
                        </span>
                        <span>, </span>
                        {item?.publishedAt
                          ? item.publishedAt.slice(0, 10)
                          : "Unknown time"}
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

          {/* Advertisement Section */}
          <div className="w-full p-4 bg-white dark:bg-gray-200 mt-2">
            <div className="max-w-screen-xl mx-auto">
              <img
                src="advertisement.jpg"
                alt="Ad Banner"
                className="w-full h-auto object-contain  mb-5"
              />
            </div>
          </div>
        </section>

        {/* Politics Section */}
        <section className="px-10 bg-white dark:bg-gray-200">
          <div className="mb-6">
            <div className="flex items-center">
              <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
                Politics
              </div>
              <div className="flex-grow border-b-2 border-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData.politics && newsData.politics.length > 0 ? (
                newsData.politics.map((item, idx) => {
                  console.log("imageUrl for item", item?.imageUrl); // ✅ This works now

                  return (
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
                        <h4 className="text-md text-gray-800">
                          {item?.excerpt}
                        </h4>

                        <p className="text-md text-gray-800 mt-2">
                          <span className="text-green-600 font-semibold">
                            {item?.author || "Bitta Today"}
                          </span>
                          <span>,</span>{" "}
                          {item?.publishedAt?.slice(0, 10) || "Unknown time"}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : error ? (
                <p className="text-red-600 col-span-full">{error}</p>
              ) : (
                <p className="text-gray-500 col-span-full">Loading news...</p>
              )}
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

        {/* Finance Section */}
        <section className="p-10 bg-white dark:bg-gray-200">
          <div className="mb-6">
            <div className="flex items-center">
              <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
                Finance
              </div>
              <div className="flex-grow border-b-2 border-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {newsData.finance && newsData.finance.length > 0 ? (
                newsData.finance.map((item, idx) => {
                  console.log("imageUrl for item", item?.imageUrl); // ✅ This works now

                  return (
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
                        <h4 className="text-md text-gray-800">
                          {item?.excerpt}
                        </h4>

                        <p className="text-md text-gray-800 mt-2">
                          <span className="text-green-600 font-semibold">
                            {item?.author || "Bitta Today"}
                          </span>
                          <span>,</span>{" "}
                          {item?.publishedAt?.slice(0, 10) || "Unknown time"}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : error ? (
                <p className="text-red-600 col-span-full">{error}</p>
              ) : (
                <p className="text-gray-500 col-span-full">Loading news...</p>
              )}
            </div>
          </div>
        </section>

        {/* Corporate Section */}
        <section className="px-10 bg-white dark:bg-gray-200">
          <div className="mb-6">
            <div className="flex items-center">
              <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
                Corporate
              </div>
              <div className="flex-grow border-b-2 border-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {newsData.corporate && newsData.corporate.length > 0 ? (
                newsData.corporate.map((item, idx) => {
                  console.log("imageUrl for item", item?.imageUrl); // ✅ This works now

                  return (
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
                        <h4 className="text-md text-gray-800">
                          {item?.excerpt}
                        </h4>

                        <p className="text-md text-gray-800 mt-2">
                          <span className="text-green-600 font-semibold">
                            {item?.author || "Bitta Today"}
                          </span>
                          <span>,</span>{" "}
                          {item?.publishedAt?.slice(0, 10) || "Unknown time"}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : error ? (
                <p className="text-red-600 col-span-full">{error}</p>
              ) : (
                <p className="text-gray-500 col-span-full">Loading news...</p>
              )}
            </div>
          </div>
          {/* Advertisement Section */}
          <div className="w-full p-4 bg-white dark:bg-gray-200 mt-2">
            <div className="max-w-screen-xl mx-auto">
              <img
                src="advertisement.jpg"
                alt="Ad Banner"
                className="w-full h-auto object-contain  mb-5"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
