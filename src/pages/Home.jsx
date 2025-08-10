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
          axios.get(`${BASE_URL}/news?category=politics&limit=5&sort=latest`),
          axios.get(`${BASE_URL}/news?category=finance&limit=5&sort=latest`),
          axios.get(`${BASE_URL}/news?category=corporate&limit=5&sort=latest`),
          axios.get(`${BASE_URL}/news?limit=5&sort=latest`), // trending — no category, just latest
        ]);
      // console.log("Politics API data:", politicsRes.data);
      // console.log("Finance API data:", financeRes.data);
      // console.log("Corporate API data:", corporateRes.data);
      // console.log("Trending API data:", trendingRes.data);

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

  const newsArray = [
    newsData.politics[0],
    newsData.trending[0],
    newsData.finance[1],
    newsData.corporate[0],
    newsData.trending[1],
    newsData.trending[1],
    newsData.trending[2],
  ].filter(Boolean);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        {/* Main Content Grid */}
        <main className="w-full mx-auto grid md:grid-cols-3 gap-8 px-20 py-10 dark:bg-gray-200 dark:text-black">
          {/* Left Column */}
          <section className="md:col-span-2 space-y-10">
            <article>
              <div className="mb-6">
                <div className="flex items-center">
                  <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-sm z-10">
                    Trending
                  </div>
                  <div className="flex-grow border-b-2 border-red-600"></div>
                </div>
              </div>
              {newsData.trending.length > 0 ? (
                <>
                  <Link to={`/news/${newsData.trending[0]._id}`}>
                    <h4 className="text-2xl font-bold mb-2 hover:text-indigo-600 transition">
                      {newsData.trending[0].title}
                    </h4>
                    <img
                      src={newsData.trending[0].image || "news.jpg"}
                      alt={newsData.trending[0].title}
                      className="rounded-lg my-4"
                    />
                  </Link>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-black">
                    {newsData.trending.slice(1, 5).map((item, idx) => (
                      <li key={idx}>
                        <Link
                          key={item._id}
                          to={`/news/${item._id}`}
                          className="block text-black mb-2 hover:text-indigo-600 transition duration-500 ease-in-out"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>Loading main news...</p>
              )}
            </article>

            {/* Finance */}
            <section>
              <div className="mb-6">
                <div className="flex items-center">
                  <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-sm z-10">
                    Finance
                  </div>
                  <div className="flex-grow border-b-2 border-red-600"></div>
                </div>
              </div>
              <ul className="space-y-3">
                {newsData.finance.slice(0, 5).map((item, idx) => (
                  <Link
                    key={item._id}
                    to={`/news/${item._id}`}
                    className="block text-black mb-2 hover:text-indigo-600 transition duration-500 ease-in-out"
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
            </section>
          </section>

          {/* Sidebar */}
          <aside className="space-y-8">
            <section>
              <div className="mb-6">
                <div className="flex items-center">
                  <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-sm z-10">
                    Politics
                  </div>
                  <div className="flex-grow border-b-2 border-red-600"></div>
                </div>
              </div>
              <ul className="space-y-3">
                {newsData.politics.slice(0, 5).map((item) => (
                  <Link
                    key={item._id}
                    to={`/news/${item._id}`}
                    className="block text-black mb-2 hover:text-indigo-600 transition duration-500 ease-in-out"
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
            </section>
            <div className="rounded-md text-center">
              <p className="text-sm font-medium">Advertisement</p>
              <Link to="#">
                <img src="news.jpg" alt="Image" />
              </Link>{" "}
            </div>
            <div>
              <div className="mb-6">
                <div className="flex items-center">
                  <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-sm z-10">
                    Corporate
                  </div>
                  <div className="flex-grow border-b-2 border-red-600"></div>
                </div>
              </div>
              <ul className="space-y-3">
                {newsData.corporate.slice(0, 5).map((item, idx) => (
                  <Link
                    key={item._id}
                    to={`/news/${item._id}`}
                    className="block text-black mb-2 hover:text-indigo-600 transition duration-500 ease-in-out"
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
            </div>
            {/* <div className="rounded-md text-center">
              <p className="text-sm font-medium">Advertisement</p>
              <Link to="#">
                <img src="news.jpg" alt="Image" />
              </Link>
            </div> */}
          </aside>
        </main>

        {/* Advertisement Section */}
        <div className="w-full px-4 py-4 bg-white dark:bg-gray-200">
          <div className="max-w-screen-xl mx-auto">
            <img
              src="advertisement.jpg"
              alt="Ad Banner"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="w-full mx-auto p-5 sm:p-10 md:p-16 relative dark:bg-gray-200">
          <div className="mb-6">
            <div className="flex items-center">
              <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-sm z-10">
                Top News
              </div>
              <div className="flex-grow border-b-2 border-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            {newsArray.length > 0 && (
              <div className="sm:col-span-5">
                <Link to={`/news/${newsArray[0]._id}`}>
                  <div
                    className="bg-cover text-center overflow-hidden"
                    style={{
                      minHeight: "300px",
                      backgroundImage: `url('${
                        newsArray[0].imageUrl ||
                        "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                      }')`,
                    }}
                  ></div>
                </Link>
                <div className="mt-3 p-2 bg-gray-100 dark:bg-white  rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                  <div className="">
                    <Link
                      to="#"
                      className="text-xs text-indigo-600 uppercase font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                    >
                      {newsArray[0].category || "Category"}
                    </Link>
                    <Link
                      to={`/news/${newsArray[0]._id}`}
                      className="block text-gray-900 font-bold text-2xl mb-2 hover:text-indigo-600 transition duration-500 ease-in-out"
                    >
                      {newsArray[0].title}
                    </Link>
                    <p className="text-gray-700 text-base mt-2">
                      {newsArray[0].excerpt}
                    </p>
                    <Link to={`/news/${newsArray[0]._id}`}>
                      <div className="flex justify-center">
                        <button className="m-3 w-40 justify-center bg-blue-400 hover:bg-blue-700 text-white py-1 px-3 rounded-full text-sm">
                          Read More
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="sm:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-5">
              {newsArray.slice(1).map((item) => (
                <div key={item._id}>
                  <Link to={`/news/${item._id}`}>
                    <div
                      className="h-40 bg-cover text-center overflow-hidden"
                      style={{
                        backgroundImage: `url('${
                          item.imageUrl ||
                          "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                        }')`,
                      }}
                    ></div>
                  </Link>
                  <Link
                    to={`/news/${item._id}`}
                    className="text-gray-900 inline-block font-semibold text-md my-1 hover:text-indigo-600 transition duration-500 ease-in-out"
                  >
                    {item?.title}
                    <p className="text-xs text-black">{item?.excerpt}</p>{" "}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advertisement Section */}
        <div className="w-full px-4 py-4 bg-white dark:bg-gray-200">
          <div className="max-w-screen-xl mx-auto">
            <img
              src="advertisement.jpg"
              alt="Ad Banner"
              className="w-full h-auto object-contain  mb-5"
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
