import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import Logofondo from "../../../assets/images/banner.png";
// import Video from "../../../assets/ryder.mp4"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
const DetailCourse = () => {
  const [activeTab, setActiveTab] = useState("Description");

  const data = [
    {
      label: "Description",
      value: "Description",
      desc:
        "Loremd Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    },
    {
      label: "Course Content",
      value: "Course Content",
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    },
  ];

  return (
    <Layout>
      <div className="my-3 mx-4 md:mx-10">
        <p className="text-1xl text-zinc-600 dark:text-white text-center md:text-left font-semibold">
          <nav className="flex" aria-label="Breadcrumb">
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
                    Change Payment Method
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </p>
        <div>
          <div
            className="relative px-6 md:px-10 py-4 rounded-t-lg mt-4"
            style={{
              backgroundImage: `url(${Logofondo})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-60 rounded-t-lg"></div>
            <div className="relative z-10">
              <p className="text-white text-title">TITLE MODULE</p>
              <div className="w-full md:w-96 mt-2">
                <p className="text-white">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
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
                  {data.map(({ label, value }) => (
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
                  {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      {desc}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>
            <div className="col-span-1">
            {/* <video controls style={{ maxWidth: '100%' }}>
         <source src="../../../assets/ryder.mp4" type="video/mp4" />
         </video> */}

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailCourse;
