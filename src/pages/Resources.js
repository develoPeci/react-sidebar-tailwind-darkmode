import React, { useState } from "react";
import Layout from "../components/Layout";
// import bannerResources from "../assets/images/ed20714b-e440-401a-813e-7b43964fa5b8 (1).jpeg";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { RiDownload2Line } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";

const Cardfile = ({ data, onOpenModal, activeTab }) => {
  const handleDownload = (fileUrl) => {
    window.open(fileUrl);
  };

  const handleDownloadVideo = (videoUrl, title) => {
    const anchor = document.createElement("a");
    anchor.href = videoUrl;
    anchor.download = title;
    anchor.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ">
      {data.map((card, index) => (
        <div
          key={index}
          className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="relative h-56">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black opacity-80"></div>
            </div>
            <div className="relative p-4">
              <h3 className="text-white text-xl font-bold">{card.title}</h3>
            </div>
          </div>
          <div className="p-4 w-80 h-24">
            <p className="text-gray-700 text-base whitespace-pre-wrap overflow-hidden break-words">
              {card.detail}
            </p>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {card.filename}
                </p>
                <p className="text-xs text-gray-500">{card.filesize}</p>
              </div>
              <div className="flex gap-2">
                <Tooltip placement="top" className="z-50" content="View">
                  <Button
                    onClick={() =>
                      onOpenModal(card.title, card.fileUrl, card.videoUrl)
                    }
                    className="inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-400 transition ease-in-out duration-150"
                  >
                    <IoEyeSharp className="text-xl" />
                  </Button>
                </Tooltip>
                <Tooltip placement="top" className="z-50" content="Download">
                  <Button
                    onClick={() => {
                      if (activeTab === "Files") {
                        handleDownload(card.fileUrl);
                      } else {
                        handleDownloadVideo(card.videoUrl, card.title);
                      }
                    }}
                    className="inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  >
                    <RiDownload2Line className="text-xl" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function SectionLink() {
  const datalink = [
    {
      titlelink: "title eelink",
      descriptionLink: "description link",
      urlLink: "https://flowbite.com/docs/components/tables/",
    },
    {
      titlelink: "title link",
      descriptionLink: "description link",
      urlLink: "https://flowbite.com/docs/components/tables/",
    },
    {
      titlelink: "title link",
      descriptionLink: "description link",
      urlLink: "https://flowbite.com/docs/components/tables/",
    },
  ];

  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title Link
            </th>
            <th scope="col" className="px-6 py-3">
              Description Link
            </th>
            <th scope="col" className="px-6 py-3">
              Link
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {datalink.map((link, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {link.titlelink}
              </th>
              <td className="px-6 py-4">{link.descriptionLink}</td>
              <td className="px-6 py-4">
                <a
                  href={link.urlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {link.urlLink}
                </a>
              </td>
              <td className="px-6 py-4">copy</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



const Resources = () => {
  const [activeTab, setActiveTab] = useState("Files");
  const [openShowModal, setOpenShowModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");

  const handleOpenModal = (title = "", url = "", video = "") => {
    setFileUrl(url);
    setVideoUrl(video);
    setDocumentTitle(title);
    setOpenShowModal(!openShowModal);
  };

  const data = [
    {
      label: "Files",
      value: "Files",
      icon: (<FaFileAlt/>),
      desc: (
        <Cardfile
          data={[
            {
              title: "Title File",
              imageUrl:
                "https://ryderconsulting.group/wp-content/uploads/2024/06/Blog-Photo-Week-3-Strong-Value-Proposition_PECI-1536x583.png",
              detail: "description file",
              filename: "Archivo1.pdf",
              filesize: "10 MB",
              fileUrl:
                "https://ryderconsulting.group/wp-content/uploads/2024/06/Value-Proposition-Template-and-Instructions-For-Website.pdf",
            },
            {
              title: "Title File",
              imageUrl:
                "https://ryderconsulting.group/wp-content/uploads/2024/05/Diseno-sin-titulo-7-1536x583.png",
              detail: "description fileffffffffffffffdsffffffffffffffffffffffffffffffffffffdsssssssssssssssssssssssssssss",
              filename: "Archivo2.pdf",
              filesize: "15 MB",
              fileUrl: "https://example.com/archivo2.pdf",
            },
            {
              title: "Title File",
              imageUrl:
                "https://ryderconsulting.group/wp-content/uploads/2024/05/Diseno-sin-titulo-7-1536x583.png",
              detail: "description file",
              filename: "Archivo2.pdf",
              filesize: "15 MB",
              fileUrl: "https://example.com/archivo2.pdf",
            },
          ]}
          onOpenModal={handleOpenModal}
          activeTab={activeTab}
        />
      ),
    },
    {
      label: "Videos",
      value: "Videos",
      icon: (<FaPlay/>),
      desc: (
        <Cardfile
          data={[
            {
              title: "Title Video",
              imageUrl:
                "https://ryderconsulting.group/wp-content/uploads/2024/06/Blog-Photo-Week-3-Strong-Value-Proposition_PECI-1536x583.png",
              detail: "description video",
              filename: "name video",
              filesize: "10 MB",
              videoUrl: "https://youtu.be/ODyWUaxcgj4",
            },
            {
              title: "Title Video",
              imageUrl:
                "https://ryderconsulting.group/wp-content/uploads/2024/05/Diseno-sin-titulo-7-1536x583.png",
              detail: "description video",
              filename: "name video",
              filesize: "15 MB",
              videoUrl: "https://youtu.be/TnR0PCgjX9s",
            },
            {
              title: "Title Video",
              imageUrl:
                "https://ryderconsulting.group/wp-content/uploads/2024/05/Diseno-sin-titulo-7-1536x583.png",
              detail: "description video",
              filename: "name video",
              filesize: "15 MB",
              videoUrl: "https://www.youtube.com/watch?v=UrlGZOFA32s",
            },
          ]}
          onOpenModal={handleOpenModal}
          activeTab={activeTab}
        />
      ),
    },
    {
      label: "Links",
      icon: (<IoLinkSharp/>),
      value: "Links",
      desc: <SectionLink />,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="my-3 mx-10 flex justify-between">
          <div>

          <p className="text-3xl text-zinc-600 dark:text-white text-center md:text-left font-semibold">
            Resources
          </p>
          <p className="text-xl text-zinc-400 dark:text-white text-center md:text-left font-semibold">
          All the Tools and Information You Need
          </p>
          </div>
         
        </div>
        <div className="my-3 mx-10 p-1 gap-2 flex justify-center flex-col items-center">
          {/* <div>
            <img
              className="rounded-md"
              src={bannerResources}
              alt="bannerResources"
            />
          </div> */}
          <div>
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                {data.map(({ label, value ,icon}) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-gray-900 flex justify-center items-center gap-2" : "flex justify-center items-center gap-2"}
                  >
                    <p
                      className={
                        activeTab === value ? " text-1xl font-bold flex justify-center items-center gap-2" : "text-1xl flex justify-center items-center gap-2"
                      }
                    >
                  {icon }{label}
                    </p>
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value} > 
                   {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
          {openShowModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="bg-white rounded-lg overflow-y-auto shadow-xl max-w-7xl w-full  h-full p-4 z-50">
                <div className="flex justify-between items-center border-b p-4">
                  <h3 className="text-lg font-semibold">{documentTitle}</h3>
                  <button
                    onClick={() => handleOpenModal()}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="py-4">
                  {activeTab === "Files" ? (
                    <iframe
                      src={fileUrl}
                      title="Document Viewer"
                      className="w-full h-screen"
                    />
                  ) : (
                    <div className="flex justify-center items-center">
                      <ReactPlayer url={videoUrl} controls />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
