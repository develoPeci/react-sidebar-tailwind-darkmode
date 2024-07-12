import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoFolderOutline,
  IoFolderSharp,
  IoSettingsOutline,
  IoSettings,
  IoHomeOutline,
  IoHome,
} from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import Logo from "../assets/images/logo.svg";
import { ThemeContext } from "../components/ThemeContext";
import HamburgerButton from "./HamburgerMenuButton/HamburgerButton";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const Menus = [
    {
      title: "Dashboard",
      path: "/home",
      src: <IoHomeOutline />,
      activeSrc: <IoHome />,
    },
    {
      title: "My Course",
      path: "/course",
      src: <FaUserGraduate />,
      activeSrc: <FaUserGraduate />,
    },
    {
      title: "Resources",
      path: "/resources",
      src: <IoFolderOutline />,
      activeSrc: <IoFolderSharp />,
    },
    {
      title: "My Account",
      path: "/MyAccount",
      src: <IoSettingsOutline />,
      activeSrc: <IoSettings />,
    },
  ];

  return (
    <>
      <div className="fixed z-40 top-0 left-0 h-full w-60 hidden sm:block bg-blanco border-r border-gray-100 dark:border-gray-600 p-5 dark:bg-slate-800">
        <Link to="/home">
          <div className="flex gap-x-4 items-center">
            <img
              src={theme === "dark" ? Logo : Logo}
              alt="Logo"
              className="pl-8 h-14"
            />
          </div>
        </Link>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:scale-105 transition duration-100 ease-in-out
                        ${menu.gap ? "mt-9" : "mt-2"} ${
                  location.pathname.startsWith(menu.path) &&
                  "bg-dorado hover:bg-dorado dark:bg-gray-700"
                }`}
              >
                <span className="text-2xl ">
                  {location.pathname.startsWith(menu.path)
                    ? menu.activeSrc
                    : menu.src}
                </span>
                <span
                  className={`origin-left hover:block ${
                    location.pathname.startsWith(menu.path) ? "font-bold" : ""
                  }`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerButton setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
      </div>
      <div className="sm:hidden z-50">
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } transition-all:0.5s; absolute z-50 flex-col items-center self-end py-14 mt-20 space-y-6 font-bold sm:w-10 left-0 right-0 dark:text-white bg-gray-50 dark:bg-slate-800 drop-shadow-md `}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname.startsWith(menu.path) &&
                  "bg-gray-200 dark:bg-gray-700"
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
