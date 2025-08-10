import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Politics = () => {
  return (
    <>
      <Navbar />
      <section className="px-4 md:px-10 py-8 bg-white dark:bg-gray-200">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-t font-semibold text-sm z-10">
              Politics
            </div>
            <div className="flex-grow border-b-2 border-blue-600"></div>
          </div>
        </div>

        {/* Grid: Left (News) + Right (Ad) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT SIDE: News Cards (3 cols) */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Repeatable Card */}
            {[
              {
                title: "बुद्धका कारण नेपाल विश्वभर चिनिएको छ : मन्त्री पाण्डे",
                img: "icon.png",
                time: "१ दिन पहिले",
              },
              {
                title:
                  "शेर्पा पर्यटन व्यवसायी संघ नेपालको वार्षिक साधारण सभा हुने",
                img: "/images/sherpa.jpg",
                time: "६ दिन पहिले",
              },
              {
                title: "जुलाईमा भित्रिए ७० हजार अन्तर्राष्ट्रिय पर्यटक",
                img: "/images/map.jpg",
                time: "६ दिन पहिले",
              },
              {
                title: "राष्ट्रिय पर्यटन परिषदको पहिलो बैठक सम्पन्न",
                img: "/images/meeting.jpg",
                time: "४ दिन पहिले",
              },
              {
                title:
                  "मान बहादुर शाहको नेतृत्वमा सोटि नेपालको नयाँ कार्यसमिति",
                img: "/images/group.jpg",
                time: "५ दिन पहिले",
              },
              {
                title: "मास्टर शेफ साहिले जनकपुरमा ‘फुड हाउस’ सुरु गरे",
                img: "/images/chef.jpg",
                time: "५ दिन पहिले",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    {item.time} -{" "}
                    <span className="text-green-600 font-semibold">
                      The Everest News
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: Ad or Latest Updates */}
          <div className="bg-gray-100 p-4 rounded-lg shadow h-fit">
            <h2 className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded">
              विज्ञापन
            </h2>
            <div className="mt-4 space-y-4">
              <div className="w-full h-40 bg-white rounded shadow overflow-hidden flex items-center justify-center">
                <img
                  src="icon.png"
                  alt="Ad Banner 1"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full h-40 bg-white rounded shadow overflow-hidden flex items-center justify-center">
                <img
                  src="ad2.png"
                  alt="Ad Banner 2"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full h-40 bg-white rounded shadow overflow-hidden flex items-center justify-center">
                <img
                  src="ad3.png"
                  alt="Ad Banner 3"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related section */}
      <section className="px-4 md:px-10 py-8 bg-white  dark:bg-gray-200">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-t font-semibold text-sm z-10">
              Related News
            </div>
            <div className="flex-grow border-b-2 border-blue-600"></div>
          </div>
        </div>

        {/* Grid: Left (News) + Right (Ad) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT SIDE: News Cards (3 cols) */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Repeatable Card */}
            {[
              {
                title: "बुद्धका कारण नेपाल विश्वभर चिनिएको छ : मन्त्री पाण्डे",
                img: "/images/buddha.jpg",
                time: "१ दिन पहिले",
              },
              {
                title:
                  "शेर्पा पर्यटन व्यवसायी संघ नेपालको वार्षिक साधारण सभा हुने",
                img: "/images/sherpa.jpg",
                time: "६ दिन पहिले",
              },
              {
                title: "जुलाईमा भित्रिए ७० हजार अन्तर्राष्ट्रिय पर्यटक",
                img: "/images/map.jpg",
                time: "६ दिन पहिले",
              },
              {
                title: "राष्ट्रिय पर्यटन परिषदको पहिलो बैठक सम्पन्न",
                img: "/images/meeting.jpg",
                time: "४ दिन पहिले",
              },
              {
                title:
                  "मान बहादुर शाहको नेतृत्वमा सोटि नेपालको नयाँ कार्यसमिति",
                img: "/images/group.jpg",
                time: "५ दिन पहिले",
              },
              {
                title: "मास्टर शेफ साहिले जनकपुरमा ‘फुड हाउस’ सुरु गरे",
                img: "/images/chef.jpg",
                time: "५ दिन पहिले",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    {item.time} -{" "}
                    <span className="text-green-600 font-semibold">
                      Bitta Today
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* <!-- Right Section: Latest Updates --> */}
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <h2 class="bg-green-500 text-white text-lg font-semibold p-3">
              ताजा अपडेट
            </h2>
            <ul class="divide-y divide-gray-200">
              <li>
                <a
                  href="#"
                  class="block p-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  तिलोत्तमालाई विश्व सम्पदा सूचीमा राख्न पुरा प्रयास गर्नुपर्ने
                  - मन्त्री पौडे...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block p-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  इन्द्रजात्रा काठमाडौंमा भव्य रुपमा सम्पन्न
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block p-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  पर्यटन व्यवसायमा सेमिनार आयोजना हुँदै
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block p-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  देशभर वर्षा हुने सम्भावना
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Politics;
