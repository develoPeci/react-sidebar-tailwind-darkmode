import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { Link, useLocation } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import Logofondo from "../../../assets/images/banner.png";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const DetailCourse = (props) => {
  const location = useLocation();
  const { data } = location.state || {};
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    if (!data) {
      console.error("No se recibieron datos del curso.");
    }
  }, [data]);

  const tabsData = [
    {
      label: "Description",
      value: "Description",
      desc: data?.description || "No description available.",
    },
    {
      label: "Course Content",
      value: "Course Content",
      desc: data?.content || "No content available.",
    },
  ];

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    return ampersandPosition !== -1
      ? `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`
      : `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <Layout>
      <div className="my-3 mx-4 md:mx-10">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li>
              <div className="flex justify-center items-center">
                <Link
                  to="/course"
                  className="ms-1 text-ti md:text-1xl flex items-center justify-center gap-1 font-medium text-gray-400 hover:text-black md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  <FaUserGraduate className="h-5 text-gray-400" />
                  My Course
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-1xl font-medium text-gray-800 md:ms-2 dark:text-gray-400">
                  {data?.title || "Course Title"}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div
          className="relative pb-10 px-6 md:px-10 py-4 rounded-t-lg mt-4 align-center pt-10"
          style={{ backgroundImage: `url(${Logofondo})` }}
        >
          <div className="absolute inset-0 bg-black opacity-60 rounded-t-lg"></div>
          <div className="relative z-10">
            <p className="text-white text-title text-2xl md:text-3xl font-bold">
              {data?.title || "Course Title"}
            </p>
            <div className="w-full md:w-96 mt-2">
              <p className="text-white">
                {data?.shortDescription || "No short description available."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-3 mx-1">
          <div className="col-span-3">
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-4 border-gray-900 shadow-none rounded-none",
                }}
              >
                {tabsData.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={
                      activeTab === value
                        ? "text-gray-900 flex justify-center items-center gap-2"
                        : "flex justify-center items-center gap-2"
                    }
                  >
                    <p
                      className={
                        activeTab === value
                          ? "text-1xl font-bold flex justify-center items-center gap-2"
                          : "text-1xl flex justify-center items-center gap-2"
                      }
                    >
                      {label}
                    </p>
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {tabsData.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    <div>
                      <h1 style={{ fontSize: 20, fontWeight: 600 }}>
                        {value === "Description" ? "Course Description" : "Course Content"}
                      </h1>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: desc,
                        }}
                      />
                    </div>
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>

          <div className="row-span-2 h-100 relative -mt-12">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="relative w-full">
                {data?.videoUrl ? (
                  <iframe
                    width="100%"
                    height="130"
                    src={getYouTubeEmbedUrl(data.videoUrl)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                ) : (
                  <p className="text-gray-600">No video available.</p>
                )}
              </div>
              <div className="mt-4">
                {/* <p className="text-xl font-semibold text-gray-800">
                  {data?.price || "$0.00"}
                </p> */}
                <p className="text-sm text-gray-600">
                  {data?.courseFormat || "Course Format Details"}
                </p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Start Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailCourse;
