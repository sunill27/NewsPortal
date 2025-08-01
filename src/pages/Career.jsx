import React from "react";
import { Link } from "react-router-dom";

const Career = () => {
  const headline = {
    title: "There is not just one Soham Parekh as moonlighting is far bigger",
    image: "logo.jpg",
  };

  const careerList = [
    "Hiring momentum shifts towards tier 2 cities",
    "A recurring pattern shows why India's big job-generation numbers may not really matter",
    "What might decide eventual winners of intensifying AI race",
    "71% of manufacturing MSMEs say govt-skill training schemes didn’t help: Report",
    "Nine in 10 Indian employees embracing GenAI tools, well ahead of global average: Report",
    "Indian employers need to adapt benefits strategies to focus on preventive care, long-term health planning: Survey",
  ];

  return (
    <section className="w-full mx-auto p-5 sm:p-10 md:p-16  grid grid-cols-1 md:grid-cols-3 gap-6 dark:bg-gray-600">
      <div className="col-span-full">
        <h2 className="text-xl font-bold border-b pb-2 mb-4 text-black dark:text-white w-full">
          Careers <span className="text-red-600">›</span>
        </h2>
      </div>

      <div className="md:col-span-1">
        <img
          src={headline.image}
          alt={headline.title}
          className="w-full h-auto rounded-md"
        />
        <h3 className="text-lg font-semibold mt-3 text-black dark:text-white">
          {headline.title}
        </h3>
        <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <Link to="#" className="hover:underline">
              CUET-UG Result to be out soon today: Here’s when, where and how to
              check scorecard
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:underline">
              Hyderabad, Chennai, Ahmedabad emerge as new salary hotspots:
              Report
            </Link>
          </li>
        </ul>
      </div>

      <div className="md:col-span-2 space-y-4">
        {careerList.map((item, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="min-w-[100px] h-[60px] bg-gray-300 rounded" />
            <Link to="#">
              <p className="text-sm text-gray-800 dark:text-gray-200 hover:underline cursor-pointer">
                {item}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Career;
