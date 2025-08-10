import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const contacts = [
  {
    title: "Contact support",
    description: "We're ready to assist you.",
    email: "support@example.com",
    icon: (
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M20 19H18C16.8954 19 16 18.1046 16 17V15C16 13.8954 16.8954 13 18 13H20M20 19V13M20 19V19C20 20.6569 18.6569 22 17 22H11M4 13V17C4 18.1046 4.89543 19 6 19V19C7.10457 19 8 18.1046 8 17V15C8 13.8954 7.10457 13 6 13H4ZM4 13V10C4 5.58172 7.58172 2 12 2V2C16.4183 2 20 5.58172 20 10V13"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Visit us",
    description: "Come see us at our HQ.",
    email: "Get directions",
    icon: (
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Call us",
    description: "Weekdays, 8am – 5pm.",
    email: "+977 1234567890",
    icon: (
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-gray-200 text-black py-15">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto w-full lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-blue-500 text-center sm:text-5xl">
              Get in touch
            </h2>
            <p className="mt-6 text-lg leading-8 text-black text-center">
              Have any questions or need assistance? Feel free to reach out to
              us. We're here to connect with you and ensure all your queries are
              addressed.
            </p>
          </div>

          {/* Cards */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {contacts.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-y-12 rounded-2xl bg-white dark:bg-gray-200 borderb p-6 shadow-lg"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-pink-500 shadow-sm">
                  {item.icon}
                </div>
                <div className="flex flex-auto flex-col items-start">
                  <div className="flex-auto">
                    <h3 className="text-xl font-medium tracking-tight text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="mt-4 inline-block text-base font-semibold"
                  >
                    {item.email}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
