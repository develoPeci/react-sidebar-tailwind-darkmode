import React, { useState, useRef, useEffect } from "react";
import Layout from '../components/Layout';
import { IoAddCircleOutline } from "react-icons/io5";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Tooltip,
  Button,
  button,
} from "@material-tailwind/react";
import { RiDownload2Line } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setContentGoals } from "../redux/slices/userData";


const Home = () => {
  const {uidUser,VisionStatement,PurposeStatement,CoreValues,CouncilMembers,Goals}=useSelector(state=>state.user)
  const dispatch=useDispatch()

  const [showButton, setShowButton] = useState({
    VisionStatement: false,
    PurposeStatement: false,
    CoreValues: false,
    CouncilMembers: false,
    Goals: false,
  });
  const buttonRef=useRef()
  const [isEditing, setIsEditing] = useState({
    VisionStatement: false,
    PurposeStatement: false,
    CoreValues: false,
    CouncilMembers: false,
    Goals: false,
  });

  const [content, setContent] = useState({
    VisionStatement: "",
    PurposeStatement: "",
    CoreValues: "",
    CouncilMembers: "",
    Goals: "",
  });

  const textareaRefs = {
    VisionStatement: useRef(null),
    PurposeStatement: useRef(null),
    CoreValues: useRef(null),
    CouncilMembers: useRef(null),
    Goals: useRef(null),
  
  };

  const buttonRefs = {
    VisionStatement: useRef(null),
    PurposeStatement: useRef(null),
    CoreValues: useRef(null),
    CouncilMembers: useRef(null),
    Goals: useRef(null),
  };

  const handleInputClick = (name) => {
    setShowButton(prevState => ({ ...prevState, [name]: true }));
    setIsEditing(prevState => ({ ...prevState, [name]: true }));
  };

  const handleContentChange = (name, value) => {
    setContent(prevContent => ({ ...prevContent, [name]: value }));
  };

  const handleClickOutside = (event, name) => {
    if (
      textareaRefs[name].current &&
      !textareaRefs[name].current.contains(event.target) &&
      (!buttonRefs[name].current || !buttonRefs[name].current.contains(event.target))
    ) {
      setIsEditing(prevState => ({ ...prevState, [name]: false }));
      setShowButton(prevState => ({ ...prevState, [name]: false }));
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      Object.keys(textareaRefs).forEach((key) => {
        handleClickOutside(event, key);
      });
    };

    document.addEventListener('mouseup', handleClick);
    return () => {
      document.removeEventListener('mouseup', handleClick);
    };
  }, []);


const putGoalsData = async (field) => {
  console.log('putGoalsData', field,content[field]);
  try {
    const response = await fetch(`https://us-central1-ryder-consulting.cloudfunctions.net/app/Goals/${uidUser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [field]: content[field],
      }),
    });

    // handleInputClick()

    if (response.ok) {

      console.log("Meta actualizada correctamente");
    } else {
      console.error("Error al actualizar la meta");
    }
  } catch (error) {
    console.error("Error al actualizar la meta: ", error);
  }
};






  useEffect(() => {
    const getGoalsData = async () => {
      const response = await fetch(`https://us-central1-ryder-consulting.cloudfunctions.net/app/getGoals/${uidUser}`);
      const data = await response.json();

      dispatch(setContentGoals({
        VisionStatement: data.VisionStatement,
        PurposeStatement: data.PurposeStatement,
        CoreValues: data.CoreValues,
        CouncilMembers: data.CouncilMembers,
        Goals: data.Goals,
      }));
    };

    getGoalsData();
  }, [putGoalsData]);


  useEffect(() => {
    setContent({
      VisionStatement: VisionStatement || "",
      PurposeStatement: PurposeStatement || "",
      CoreValues: CoreValues || "",
      CouncilMembers: CouncilMembers || "",
      Goals: Goals || "",
    });
  }, [VisionStatement, PurposeStatement, CoreValues, CouncilMembers, Goals]);

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




  function Hola() {
    return (
      <div>hola</div>

    )


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
      label: "Master planning",
      value: "Master planning",
      desc: (
        <Hola />

      ),
    },
    {
      label: "Team dynamics",
      value: "Team dynamics",
      desc: (
        <Hola />
      ),
    },
    {
      label: "Team Setup",
      value: "Team Setup",
      desc: <SectionLink />,
    },
    {
      label: "Financial Empowerment",
      value: "Financial Empowerment",
      desc: <SectionLink />,
    },
    {
      label: "Operational Efficiency",
      value: "Operational Efficiency",
      desc: <SectionLink />,
    },
    {
      label: "Target Market",
      value: "Target Market",
      desc: <SectionLink />,
    },
    {
      label: "Crafting Your Legacy",
      value: "Crafting Your Legacy",
      desc: <SectionLink />,
    },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 p-5">My Comprehensive Approach</h1>
      <div className="grid grid-cols-3 gap-4 p-5 bg-gray-100">
        <div className="bg-white p-4 rounded shadow-md card">
          <div className="flex justify-between"> <label className="block font-semibold mb-2">Vision Statement</label> </div>
         
          {isEditing.VisionStatement ? (
            <textarea
              ref={textareaRefs.VisionStatement}
              className="w-full p-2 border rounded"
              value={content.VisionStatement}
              onChange={(e) => handleContentChange("VisionStatement", e.target.value)}
            ></textarea>
          ) : (
            <p className="flex justify-center text-ellipsis overflow-hidden" onClick={() => handleInputClick('VisionStatement')}>
              {content.VisionStatement !== "" ? content.VisionStatement : <IoAddCircleOutline className="text-6xl text-center hover:cursor-pointer" />}
            </p>
          )}
          {showButton.VisionStatement && (
           <button ref={buttonRefs.VisionStatement} onClick={() => putGoalsData("VisionStatement")} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Submit</button>

          )}
        </div>
        <div className="bg-white p-4 rounded shadow-md card">  <div className="flex justify-between"> <label className="block font-semibold mb-2">Purpose Statement</label></div>
          {isEditing.PurposeStatement ? (
            <textarea
              ref={textareaRefs.PurposeStatement}
              className="w-full p-2 border rounded"
              value={content.PurposeStatement}
              onChange={(e) => handleContentChange("PurposeStatement", e.target.value)}
              onClick={() => handleInputClick("PurposeStatement")}
            ></textarea>
          ) : (
            <p className="flex justify-center text-ellipsis overflow-hidden" onClick={() => handleInputClick('PurposeStatement')}>
              {content.PurposeStatement !== "" ? content.PurposeStatement : <IoAddCircleOutline className="text-6xl text-center hover:cursor-pointer" />}
            </p>
          )}
          {showButton.PurposeStatement && (
             <button ref={buttonRefs.PurposeStatement} onClick={() => putGoalsData("PurposeStatement")} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          )}
        </div>
        <div className="bg-white p-4 rounded shadow-md card row-span-2">
          <label className="block font-semibold mb-2">Goals</label>
          {isEditing.Goals ? (
            <textarea
              ref={textareaRefs.Goals}
              className="w-full h-40 p-2 border rounded"
              value={content.Goals}
              onChange={(e) => handleContentChange("Goals", e.target.value)}
              onClick={() => handleInputClick("Goals")}
            ></textarea>
          ) : (
            <p className="flex justify-center text-ellipsis overflow-hidden" onClick={() => handleInputClick('Goals')}>
              {content.Goals !== "" ? content.Goals : <IoAddCircleOutline className="text-6xl content-center hover:cursor-pointer" />}
            </p>
          )}
          {showButton.Goals && (
           <button ref={buttonRefs.Goals} onClick={() => putGoalsData("Goals")} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          )}
        </div>
        <div className="bg-white p-4 rounded shadow-md card">
          <label className="block font-semibold mb-2">CoreValues</label>
          {isEditing.CoreValues ? (
            <textarea
              ref={textareaRefs.CoreValues}
              className="w-full p-2 border rounded"
              value={content.CoreValues}
              onChange={(e) => handleContentChange("CoreValues", e.target.value)}
              onClick={() => handleInputClick("CoreValues")}
            ></textarea>
          ) : (
            <p className="flex justify-center text-ellipsis overflow-hidden" onClick={() => handleInputClick('CoreValues')}>
              {content.CoreValues !== "" ? content.CoreValues : <IoAddCircleOutline className="text-6xl text-center hover:cursor-pointer" />}
            </p>
          )}
          {showButton.CoreValues && (
           <button ref={buttonRefs.CoreValues} onClick={() => putGoalsData("CoreValues")} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>

          )}
        </div>
        <div className="bg-white p-4 rounded shadow-md card">
          <label className="block font-semibold mb-2">CouncilMembers</label>
          {isEditing.CouncilMembers ? (
            <textarea
              ref={textareaRefs.CouncilMembers}
              className="w-full p-2 border rounded"
              value={content.CouncilMembers}
              onChange={(e) => handleContentChange("CouncilMembers", e.target.value)}
              onClick={() => handleInputClick("CouncilMembers")}
            ></textarea>
          ) : (
            <p className="flex justify-center text-ellipsis overflow-hidden" onClick={() => handleInputClick('CouncilMembers')}>
              {content.CouncilMembers !== "" ? content.CouncilMembers : <IoAddCircleOutline className="text-6xl text-center hover:cursor-pointer" />}
            </p>
          )}
          {showButton.CouncilMembers && (
            <button ref={buttonRefs.CouncilMembers} onClick={() => putGoalsData("CouncilMembers")} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          )}
        </div>
      </div>
      <div className="min-h-screen">
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
                {data.map(({ label, value, icon }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-gray-900 flex justify-center items-center gap-2 mt-4" : "flex justify-center items-center gap-2 mt-4"}
                  >
                    <p
                      className={
                        activeTab === value ? " text-1xl font-bold flex justify-center items-center gap-2" : "text-1xl flex justify-center items-center gap-2"
                      }
                    >
                      {icon}{label}
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
        </div>
      </div>



    </Layout>
  );
};

export default Home;
