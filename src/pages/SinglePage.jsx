import React from "react";

const SinglePage = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white p-4 space-y-4 border border-gray-200 dark:border-gray-700 rounded-md">
      {/* Synopsis Section */}
      <div className="bg-red-50 dark:bg-red-100/10 p-4 rounded">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Synopsis
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          The UAE's Federal Authority for Identity, Citizenship, Customs and
          Port Security (ICP) has denied rumors that lifetime Golden Visas are
          being granted to certain nationalities. ICP clarified that Golden Visa
          categories and rules are clearly defined by law and available on
          official platforms. It also warned that only government channels
          handle applications, not any consultancy services.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image */}
        <div className="w-full md:w-1/3">
          <div className="relative">
            <img
              src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-123456,msid-12345678/magazines/panache/uae-golden-visa-update.jpg"
              alt="Golden Visa"
              className="rounded shadow-md"
            />
            <span className="absolute top-2 right-2 text-xs bg-gray-800 text-white px-2 py-0.5 rounded">
              Agencies
            </span>
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            Representative image.
          </p>
        </div>

        {/* Text */}
        <div className="flex-1 text-sm">
          <p>
            <span className="text-blue-700 dark:text-blue-400 font-semibold">
              UAE
            </span>
            's Federal Authority for Identity, Citizenship, Customs and Port
            Security (ICP) has denied the accuracy of rumours circulated by some
            local and international media outlets and websites regarding the
            country is granting lifetime Golden Visas to certain nationalities,
            said Emirates News Agency Wam.
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <p className="text-sm">
        ICP clarified that the categories, conditions, and regulations of the
        Golden Visa are clearly defined in accordance with official laws,
        legislations, and policies.
      </p>
    </div>
  );
};

export default SinglePage;
