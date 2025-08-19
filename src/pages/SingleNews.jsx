import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SingleNews = () => {
  const { _id } = useParams();
  const [news, setNews] = useState(null);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);
  const [error, setError] = useState(null);

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

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/news/${_id}/comments`
      );
      if (response.status === 200) {
        setComments(response.data.data);
      }
    } catch (error) {
      {
        console.error("Error fetching news:", error);
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchComments();
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

  const onCommentAdded = (updatedComments) => {
    setComments(updatedComments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission reload
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/news/${_id}/comments`,
        { username, text }
      );

      if (response.status === 201) {
        onCommentAdded(response.data.data); // callback to refresh comments list
        setUsername("");
        setText("");
      }
    } catch (err) {
      setError("Failed to post comment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/news/${_id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await res.json();
      if (res.ok) {
        // Remove deleted comment from UI (assuming you use useState)
        setComments((prevComments) =>
          prevComments.filter((c) => c._id !== commentId)
        );
      } else {
        console.error("Delete failed:", result.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting.");
    }
  };

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
                  तस्बिर : {news?.author || "Bitta Today"}
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

            {/* Comments Section */}
            <div className="bg-gray-100 p-4 shadow-lg rounded-md">
              <h2 className="text-md font-semibold text-center mb-3 text-blue-500">
                Comments
              </h2>

              <div className="flex flex-col space-y-3">
                <div>
                  {loading && <p className="text-sm">Loading comments...</p>}
                  {!loading && comments.length === 0 && (
                    <p className="text-gray-500 text-sm">No comments yet.</p>
                  )}
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-white p-2 rounded-md shadow-sm mb-3 flex flex-col"
                    >
                      <h3 className="text-sm font-semibold">
                        {comment.username || "Anonymous"}
                      </h3>
                      <p className="text-black text-sm mt-0.5">
                        {comment.text}
                      </p>
                      <div className="mt-1 self-end">
                        <span
                          onClick={() => handleDeleteComment(comment._id)}
                          className="cursor-pointer text-red-500 text-sm mr-2 font-semibold"
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-3 rounded-md shadow-sm"
                >
                  <h3 className="text-md font-semibold mb-2 text-blue-500">
                    Add a comment
                  </h3>

                  <div className="mb-2">
                    <label
                      className="block text-black text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm text-gray-300 focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      className="block text-black text-sm font-medium mb-1"
                      htmlFor="comment"
                    >
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows="2"
                      required
                      placeholder="Your comment"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm text-gray-300 focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-semibold text-sm px-3 py-1.5 rounded focus:outline-none focus:shadow-outline"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>

                  {error && (
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Right: Advertisement Section */}
          <div className="w-full lg:w-[25%] bg-gray-100 p-4 rounded-lg shadow h-fit">
            <h2 className="bg-green-600 text-white text-sm  text-center font-semibold px-3 py-2 rounded">
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
