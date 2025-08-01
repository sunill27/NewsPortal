import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Career from "./Career";

const Home = () => {
  const mainNews = {
    title: "Indian electronics firms look to ditch the Dragon for deals",
    image: "https://via.placeholder.com/600x350",
    subheadings: [
      "US 'very close' to cracking trade deal with India",
      "Adani’s ₹12,600 cr offer for Jaypee Group co",
      "Global biggies line up for CDPQ’s India InvIT",
      "Trump ups pressure on trade allies with Aug deadline",
    ],
  };

  const corporate = [
    "As GenAI puts traditional BPO on life support, survival demands a makeover",
    "India Inc is ditching dollar loans. Waning debt appetite or rising faith in rupee?",
    "Do bank stress tests continue to serve their intended purpose?",
  ];

  const trending = [
    "Stock markets open flat ahead of RBI meet",
    "India’s electric car ambitions face delay",
    "AI startups dominate this year’s unicorn list",
  ];

  const headline = {
    title: "There is not just one Soham Parekh as moonlighting is far bigger",
    image: "https://i.ibb.co/pzLcSPg/career-main.jpg",
  };

  const newsList = [
    "Hiring momentum shifts towards tier 2 cities",
    "A recurring pattern shows why India's big job-generation numbers may not really matter",
    "What might decide eventual winners of intensifying AI race",
    "71% of manufacturing MSMEs say govt-skill training schemes didn’t help: Report",
    "Nine in 10 Indian employees embracing GenAI tools, well ahead of global average: Report",
    "Indian employers need to adapt benefits strategies to focus on preventive care, long-term health planning: Survey",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        {/* Main Content Grid */}
        <main className="w-full mx-auto grid md:grid-cols-3 gap-8 px-20 py-10 dark:bg-gray-600 dark:text-white">
          {/* Left Column */}
          <section className="md:col-span-2 space-y-10">
            {/* Main News */}
            <article>
              <h3 className="text-xl font-semibold border-l-4 border-red-600 pl-3 mb-3">
                Main News
              </h3>
              <h4 className="text-2xl font-bold mb-2 ">{mainNews.title}</h4>
              <img src="logo.jpg" alt="newsImage" className="rounded-lg my-4" />
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-white">
                {mainNews.subheadings.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </article>

            {/* Finance */}
            <section>
              <h3 className="text-xl font-semibold border-l-4 border-red-600 pl-3 mb-3">
                Finance
              </h3>
              <ul className="space-y-3">
                {corporate.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 dark:text-white hover:underline cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </section>

          {/* Sidebar */}
          <aside className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold border-l-4 border-red-600 pl-3 mb-3">
                Corporate
              </h3>
              <ul className="space-y-3">
                {corporate.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 dark:text-white hover:underline cursor-pointer"
                  >
                    {item}
                  </li>
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
              <h3 className="text-xl font-semibold border-l-4 border-red-600 pl-3 mb-3">
                Trending Now
              </h3>
              <ul className="text-sm space-y-2">
                {trending.map((item, idx) => (
                  <li key={idx} className="hover:underline cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md text-center">
              <p className="text-sm font-medium">Advertisement</p>
              <Link to="#">
                <img src="news.jpg" alt="Image" />
              </Link>
            </div>
          </aside>
        </main>

        {/* Card */}
        <Card />

        {/* Career */}
        <Career />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
