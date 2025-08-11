import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SingleNews = () => {
  const { _id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);

  // Fetch the single news article
  const fetchNews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/news/${_id}`);
      if (response.status === 200) {
        setNews(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchNews();
  }, [_id]);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      if (news?.category?.categoryName) {
        try {
          const categoryParam = encodeURIComponent(news.category.categoryName);
          const response = await axios.get(
            `http://localhost:3000/news/category/${categoryParam}`
          );

          console.log("Related news response:", response.data);

          if (response.status === 200) {
            const filtered = response.data.data
              .filter((item) => item._id !== _id)
              .sort((a, b) => {
                const dateA = new Date(a.publishedAt).getTime() || 0;
                const dateB = new Date(b.publishedAt).getTime() || 0;
                return dateB - dateA;
              })
              .slice(0, 6);
            setRelatedNews(filtered);
          }
        } catch (error) {
          console.error("Error fetching related news:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchRelatedNews();
  }, [news, _id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!news) {
    return <div className="text-center mt-10">News not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-200 px-10 py-5 text-black dark:text-black">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[75%] space-y-6 pl-2 pr-4">
            <h1 className="text-xl md:text-3xl font-bold leading-snug mb-1">
              {news?.title}
            </h1>
            <div className="text-sm font-semibold text-black flex flex-wrap items-center pl-1 gap-3">
              Published On: {news?.publishedAt?.slice(0, 10)}
            </div>
            <div className="w-full">
              <div className="w-full md:w-[70%]">
                <div className="aspect-video md:aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={
                      news?.imageUrl ||
                      "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                    }
                    alt="News"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <p className="text-xs text-center text-black font-semibold mt-2">
                  फोटो : {news?.author || "सम्बन्धित निकाय"}
                </p>
              </div>
            </div>
            <div className="space-y-4 text-base leading-relaxed">
              <p>{news?.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus id hic aspernatur odit expedita? Mollitia culpa
                excepturi dolores, necessitatibus, inventore fugit dolorem vero
                qui, dolore atque quis sapiente repellat in unde similique eius
                quam sit consequuntur aliquam assumenda. Laborum velit hic esse
                sapiente nostrum sint minima itaque rem molestias rerum delectus
                deserunt, dicta, temporibus vel dolorem in eaque expedita fugiat
                quae doloremque necessitatibus libero! Nam inventore enim dolor,
                numquam minima maxime veritatis error fugiat dolorum unde
                reiciendis consectetur doloremque laudantium? Ut corrupti atque
                cum autem sint. Sed quam temporibus asperiores eos facilis
                aliquam veritatis eligendi autem laudantium. Deserunt, iure
                quod.
              </p>
            </div>
          </div>

          {/* Right: Advertisement Section */}
          <div className="w-full lg:w-[25%] bg-gray-100 p-4 rounded-lg shadow h-fit">
            <h2 className="bg-green-600 text-white text-sm font-semibold px-3 py-2 rounded">
              विज्ञापन
            </h2>
            <div className="mt-4 space-y-4">
              <div className="w-full h-40 bg-white rounded shadow overflow-hidden flex items-center justify-center">
                <img
                  src={
                    news.jpg ||
                    "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                  }
                  alt="Ad Banner 1"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full h-40 bg-white rounded shadow overflow-hidden flex items-center justify-center">
                <img
                  src={
                    news.jpg ||
                    "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                  }
                  alt="Ad Banner 1"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full h-40 bg-white rounded shadow overflow-hidden flex items-center justify-center">
                <img
                  src={
                    news.jpg ||
                    "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                  }
                  alt="Ad Banner 1"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related News Section */}
      <section className="p-10 bg-white  dark:bg-gray-200">
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-t font-semibold text-lg z-10">
              Other News
            </div>
            <div className="flex-grow border-b-2 border-red-600"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {relatedNews && relatedNews.length > 0 ? (
            relatedNews.map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <img
                  src={
                    item.imageUrl ||
                    "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                  }
                  alt={item.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <Link to={`/news/${item._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                      {item.title}
                    </h3>
                  </Link>
                  <h4 className="text-md text-gray-800 line-clamp-2">
                    {item.excerpt}
                  </h4>
                  <p className="text-md text-gray-800 mt-2">
                    <span className="text-green-600 font-semibold">
                      {item.author || "Bitta Today"}
                    </span>
                    <span>, </span>
                    {item.publishedAt?.slice(0, 10) || "Unknown time"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-black font-semibold text-center col-span-full">
              No related news found.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};
export default SingleNews;
