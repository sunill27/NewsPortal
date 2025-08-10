import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SingleNews = () => {
  const { _id } = useParams();
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);
  const fetchNews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/news/${_id}`);
      console.log("Response from API:", response);
      if (response.status === 200) {
        console.log("News data:", response.data.data);
        setNews(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      await fetchNews();
    };
    loadData();
  }, [_id]);

  // useEffect(() => {
  //   const fetchRelatedNews = async () => {
  //     if (news?.category) {
  //       try {
  //         const response = await axios.get(`/news/category/${news.category}`);
  //         if (response.status === 200) {
  //           const filtered = response.data.data.filter(
  //             (item) => item.__id !== _id
  //           );
  //           setRelatedNews(filtered);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching related news:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchRelatedNews();
  // }, [news]);

  return (
    <>
      <Navbar />
      <div className="w-full mx-auto bg-white dark:bg-gray-200 text-black p-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content (2/3) */}
          <div className="w-full md:w-2/3 space-y-4">
            {/* Image + Paragraph */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <img
                    // src={news?.imageUrl}
                    src="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                    alt="News Image"
                    className="rounded shadow-md"
                  />
                  <span className="absolute top-2 right-7 text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                    {news?.category?.categoryName}
                  </span>
                </div>
                <p className="text-xs mt-1 text-center text-black">
                  Representative image.
                </p>
              </div>

              {/* Text */}
              <div className="flex-1 text-sm">
                <p>
                  <span className="text-blue-700 dark:text-blue-400 text-lg font-semibold">
                    {news?.title}
                  </span>
                </p>
                <p className="text-lg">{news?.excerpt}</p>
                <div className="flex items-center text-sm text-black dark:text-black gap-1">
                  {/* Author with icon */}
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    <span>{news?.author || "Unknown"}</span>
                  </div>

                  {/* Comma separator */}
                  <span>,</span>

                  {/* Date and Time */}
                  <div className="text-xs">
                    {news?.publishedAt?.slice(0, 10)}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <p className="text-lg">
              {news?.description}
              <span>,</span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              distinctio repellat. Enim consequatur veritatis nulla aliqu_id
              consequuntur culpa aspernatur laboriosam labore ea voluptate ad,
              omnis numquam amet sequi accusamus itaque, reprehenderit, fuga
              eligendi. Cumque voluptatum impedit nam vero iusto veniam, nobis
              consequatur vel labore illo. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sapiente odio eligendi, amet
              consectetur in iure atque aut expedita molestiae tempore qu_idem
              sed ipsa velit autem ratione illum hic iste! Suscipit, quas
              assumenda temporibus laudantium magni, cum libero odio repellendus
              asperiores blanditiis repellat ipsam quaerat. Explicabo doloremque
              dignissimos eos cum quisquam asperiores voluptatem facilis
              doloribus alias sit dolore, voluptate perspiciatis, magni voluptas
              soluta eligendi exercitationem inc_idunt quibusdam similique
              officiis fuga mollitia consectetur? Dignissimos, earum dolore
              vitae animi excepturi numquam porro quod. Repellat consequuntur
              hic quam ullam doloribus beatae suscipit eveniet laborum
              doloremque est architecto, atque maxime. Delectus illum dolorem
              laudantium veniam? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ipsam praesentium nostrum hic rerum quasi enim,
              velit consequatur nihil maxime animi.
            </p>
          </div>

          {/* Sidebar (1/3) */}
          <aside className="w-full md:w-1/3 space-y-4">
            {/* Example S_idebar Content */}
            <div className="bg-white dark:bg-gray-200  p-4 rounded shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Related News</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>New visa rules for expats in 2025</li>
                <li>How Golden Visas benefit investors</li>
                <li>UAE economic reforms in focus</li>
              </ul>

              {relatedNews.length > 0 && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <h3 className="text-lg font-semibold mb-2">
                    More from {news?.category}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {relatedNews.map((item) => (
                      <li key={item.__id}>
                        <Link
                          to={`/news/${item.__id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="rounded-md text-center">
              <p className="text-sm font-medium">Advertisement</p>
              <Link to="#">
                <img
                  src="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                  alt="Image"
                  className="w-full h-auto object-contain rounded"
                />
              </Link>{" "}
            </div>

            <div className="bg-white dark:bg-gray-200 p-4 rounded shadow-lg">
              <h3 className="text-lg font-semibold mb-2">
                Note <span>:</span>
              </h3>
              <p className="text-xs text-black">
                Always verify news from official government portals before
                proceeding with applications.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleNews;
