import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Other = () => {
  const [opinions, setOpinions] = useState([]);
  const [opinionsError, setOpinionsError] = useState(null);

  const [interviews, setInterviews] = useState([]);
  const [interviewsError, setInterviewsError] = useState(null);

  const [weatherNews, setWeatherNews] = useState([]);
  const [weatherError, setWeatherError] = useState(null);

  const [tourismNews, setTourismNews] = useState([]);
  const [tourismError, setTourismError] = useState(null);

  const BASE_URL = "http://localhost:3000";

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/news?category=interviews&limit=6&sort=latest`
      );
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setInterviews(data);
        setInterviewsError(null);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching interviews:", err);
      setInterviewsError("Failed to load interviews news");
    }
  };

  // Repeat similarly for opinions, weatherNews, tourismNews...
  const fetchOpinions = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/news?category=opinions&limit=6&sort=latest`
      );
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setOpinions(data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching opinions:", err);
      setOpinionsError("Failed to load opinions:");
    }
  };

  const fetchWeatherNews = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/news?category=weather&limit=6&sort=latest`
      );
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setWeatherNews(data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching weather news:", err);
      setWeatherError("Failed to load weather news");
    }
  };

  const fetchTourismNews = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/news?category=tourism&limit=6&sort=latest`
      );
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setWeatherNews(data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching tourism news:", err);
      setTourismError("Failed to load tourism news");
    }
  };

  useEffect(() => {
    fetchInterviews();
    fetchOpinions();
    fetchWeatherNews();
    fetchTourismNews();
  }, []);

  return (
    <>
      <Navbar />
      {/* Interviews Section */}
      <section className="p-10 bg-white dark:bg-gray-200">
        {/* Advertisement Section */}
        <div className="max-w-screen-xl mx-auto">
          <img
            src="advertisement.gif"
            alt="Ad Banner"
            className="w-full h-auto object-contain mb-8"
          />
        </div>
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
              Interviews
            </div>
            <div className="flex-grow border-b-2 border-red-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews && interviews.length > 0 ? (
              interviews.map((item, idx) => {
                console.log("imageUrl for item", item?.imageUrl);

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
                );
              })
            ) : interviewsError ? (
              <p className="text-red-600 col-span-full">{interviewsError}</p>
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

      {/* Opinions Section */}
      <section className="p-10 bg-white  dark:bg-gray-200">
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
              Opinions
            </div>
            <div className="flex-grow border-b-2 border-red-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {opinions && opinions.length > 0 ? (
              opinions.map((item, idx) => {
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
                );
              })
            ) : opinionsError ? (
              <p className="text-red-600 col-span-full">{opinionsError}</p>
            ) : (
              <p className="text-gray-500 col-span-full">Loading news...</p>
            )}
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section className="p-10 bg-white  dark:bg-gray-200">
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
              Weather
            </div>
            <div className="flex-grow border-b-2 border-red-600"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weatherNews && weatherNews.length > 0 ? (
              weatherNews.map((item, idx) => {
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
                );
              })
            ) : weatherError ? (
              <p className="text-red-600 col-span-full">{weatherError}</p>
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

      {/* Tourism Section */}
      <section className="p-10 bg-white  dark:bg-gray-200">
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
              Tourism
            </div>
            <div className="flex-grow border-b-2 border-red-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourismNews && tourismNews.length > 0 ? (
              tourismNews.map((item, idx) => {
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
                );
              })
            ) : tourismError ? (
              <p className="text-red-600 col-span-full">{tourismError}</p>
            ) : (
              <p className="text-gray-500 col-span-full">Loading news...</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Other;
