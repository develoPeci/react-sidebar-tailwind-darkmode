import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@material-tailwind/react";
import { MdPlayCircleOutline } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CardCourse = () => {
  const [dataCourse, setCursos] = useState([]);
  const { orden } = useSelector((state) => state.user);

  const obtenerCursos = async () => {
    try {
      const response = await fetch(`https://us-central1-ryder-consulting.cloudfunctions.net/app/cursos`);
      const result = await response.json();

      if (response.ok) {
        setCursos(result);
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error al obtener los cursos: ", error);
    }
  };

  useEffect(() => {
    obtenerCursos();
  }, []);


  const courseMap = dataCourse.reduce((map, course) => {
    map[course.id] = course;
    return map;
  }, {});

  console.info("courseMap: ",courseMap)
 
  const orderedCourses = orden
    .map((orderedCourse) => courseMap[orderedCourse.id])
    .filter((course) => course !== undefined);

  console.info("orderedCourses ",orderedCourses)

  if (dataCourse.length === 0 || orden.length === 0) {
    return <p>Cargando cursos...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-1 md:gap-y-6">
      {orderedCourses.map((card, index) => (
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

          <div className="p-4 w-80 h-24">
            <p className="text-gray-800 text-xl font-bold">{card.nombre}</p>

            <p className="text-gray-700 text-base whitespace-pre-wrap overflow-hidden break-words">
              {card.shortDescription}
            </p>
          </div>
          <div className="px-4 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MdPlayCircleOutline />{card.contentNum}
            </div>
            <div className="flex items-center gap-1">
              <FiClock /> {card.duration}
            </div>
          </div>

          <div className="py-4 border-t border-gray-200">
            <div className="flex items-center justify-end px-4">
              <div className="flex">
                <Link
                  to={`/course/${card.nombre}`}
                  state={{ data: card }}
                >
                  <Button className="w-auto items-center p-3 border border-black text-sm font-medium rounded-3xl text-black bg-white hover:text-white hover:bg-black focus:outline-none">
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
