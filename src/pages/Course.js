import React from "react";
import Layout from "../components/Layout";
import { Tooltip, Button } from "@material-tailwind/react";
import { MdPlayCircleOutline } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

const CardCourse = () => {
  const dataCourse = [
    {
      name: "course1",
      title: "course1",
      description: "Lorem Ipsum is simply dummy.",
      imgUrl:
        "https://ryderconsulting.group/wp-content/uploads/2024/05/Diseno-sin-titulo-7-1536x583.png",
    },
    {
      name: "course2",
      title: "course1",
      description: "Lorem Ipsum is simply dummy.",
      imgUrl:
        "https://ryderconsulting.group/wp-content/uploads/2024/03/iStock-1610418910-scaled.jpg",
    },
    {
      name: "course3",
      title: "course1",
      description: "Lorem Ipsum is simply dummy.",
      imgUrl:
        "https://ryderconsulting.group/wp-content/uploads/2024/03/iStock-1334575820-scaled.jpg",
    },
    {
      name: "course4",
      title: "course1",
      description: "Lorem Ipsum is simply dummy.",
      imgUrl:
        "https://ryderconsulting.group/wp-content/uploads/2024/06/Diseno-sin-titulo-8-1536x583.png",
    },
    {
      name: "course5",
      title: "course1",
      description: "Lorem Ipsum is simply dummy.",
      imgUrl:
        "https://ryderconsulting.group/wp-content/uploads/2024/05/Diseno-sin-titulo-7-1536x583.png",
    },
    {
      name: "course6",
      title: "course1",
      description: "Lorem Ipsum is simply dummy.",
      imgUrl:
        "https://ryderconsulting.group/wp-content/uploads/2024/05/Diseno-sin-titulo-7-1536x583.png",
    },
    {
      name: "course7",
      title: "course1",
      description: "Lorem Ipsum is simply dummy.",
      imgUrl:
        "https://ryderconsulting.group/wp-content/uploads/2024/05/Diseno-sin-titulo-7-1536x583.png",
    },
    {
      name: "course8",
      title: "course1",
      description: "Lorem Ipsum is simply dummy.",
      imgUrl:
        "https://ryderconsulting.group/wp-content/uploads/2024/05/Diseno-sin-titulo-7-1536x583.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4 md:gap-y-6 ">
      {dataCourse.map((card, index) => (
        <div
          key={index}
          className="custom-width mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="relative h-56">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.imgUrl})` }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
          </div>

          <div className=" p-4 w-80 h-24">
            <p className="text-gray-800 text-xl font-bold">{card.title}</p>

            <p className="text-gray-700 text-base whitespace-pre-wrap overflow-hidden break-words">
              {card.description}
            </p>
          </div>
          <div className="px-4 pb-2 flex items-center justify-between ">
            <div className="flex items-center gap-1">
              <MdPlayCircleOutline />8
            </div>
            <div className="flex items-center gap-1">
              <FiClock /> 2 hr 30 min
            </div>
          </div>

          <div className=" py-4 border-t border-gray-200">
            <div className="flex items-center justify-end px-4">
              <div className="flex">
                  <Link to={`/course/${card.name}`}>
                    <Button className="w-auto  items-center p-3 border border-black text-sm font-medium rounded-3xl  text-black bg-white hover:text-white hover:bg-black focus:outline-none">
                      View Details
                    </Button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Course = () => {
  return (
    <Layout>
      <div>
        <div className="my-3 mx-10 flex justify-between">
          <div>
            <p className="text-3xl text-zinc-600 dark:text-white text-center md:text-left font-semibold">
              My Courses
            </p>
          </div>
        </div>
        <div>
          <CardCourse />
        </div>
      </div>
    </Layout>
  );
};

export default Course;
