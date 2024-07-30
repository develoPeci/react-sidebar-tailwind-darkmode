import React, { useState,useEffect } from "react";
import Toggle from "./ThemeToggle";
import { useSelector } from "react-redux";
 import ImgProfile from "../assets/images/imgnofound.png";
// import { ThemeContext } from '../components/ThemeContext'
// import Logo from '../assets/images/logo.svg'
import Appfirebase from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
// import { IoSearchOutline } from "react-icons/io5";
import AppFirebase from "../firebase-config";
import fetchUserData from "../components/data"
const auth = getAuth(Appfirebase);



const Navbar = ({ setLoading }) => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const {nombres,apellidos}=useSelector(state=>state.user)

  console.log("nombres"+nombres+"apellidos"+apellidos)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userAuth = auth.currentUser;
  //       console.log('userAuth', userAuth);

  //       if (userAuth) {
  //         const userData = await fetchUserData(userAuth.uid);
  //         console.log('userData', userData);
  //         setUsers(userData);
  //       } else {
  //         console.log('No hay usuario autenticado.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [auth]);
  
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      navigate("/");
      console.log('Sesion finalizada');
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };
  // const { theme } = useContext(ThemeContext)

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [dropdownNotification, setDropdownNotification] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
    // if (!dropdownOpen && dropdownNotification) {
    //   setDropdownNotification(false);
    // }
  };

  // const handleDropdownNotification = () => {
  //   setDropdownNotification(!dropdownNotification);
  //   if (!dropdownNotification && dropdownOpen) {
  //     setDropdownOpen(false);
  //   }

  // };
  return (
    <nav className="bg-white  top-0 left-0 w-auto  p-4   dark:bg-gray-800">
      <div className="container flex justify-between items-center mx-auto pt-3">
        <div className="flex items-center mx-auto justify-end"></div>

        <div className=" justify-end pr-4 hidden md:block">
          
          <div className="relative ">
          <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
          </div>
        </div>
        {/* <div className="flex justify-end pr-4">
          <button
            id="dropdownNotificationButton"
            onClick={handleDropdownNotification}
            data-dropdown-toggle="dropdownNotification"
            className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
            type="button"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 20"
            >
              <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
            </svg>

            <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
          </button>

          {dropdownNotification && (
            <div
              id="dropdownNotification"
              className="z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 absolute right-10 mt-9"
            >
              <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                Notifications
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                 <a
                  href="#"
                  className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full w-11 h-11"
                      src="/docs/images/people/profile-picture-1.jpg"
                      alt="Jese image"
                    />
                    <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                        <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      New message from{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Jese Leos
                      </span>
                      : "Hey, what's up? All set for the presentation?"
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      a few moments ago
                    </div>
                  </div>
                </a> 
                <a
                  href="#"
                  className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full w-11 h-11"
                      src="/docs/images/people/profile-picture-2.jpg"
                      alt="Joseph image"
                    />
                    <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Joseph Mcfall
                      </span>{" "}
                      and{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        5 others
                      </span>{" "}
                      started following you.
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      10 minutes ago
                    </div>
                  </div>
                </a> 
                 <a
                  href="#"
                  className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full w-11 h-11"
                      src="/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie image"
                    />
                    <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-red-600 border border-white rounded-full dark:border-gray-800">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.553A5.452 5.452 0 0 0 .5 5.429a8.511 8.511 0 0 0 .948 3.795 22.774 22.774 0 0 0 4.812 6.042 29.69 29.69 0 0 0 3.715 2.832 1 1 0 0 0 1.05 0 29.69 29.69 0 0 0 3.715-2.832 22.774 22.774 0 0 0 4.812-6.042 8.511 8.511 0 0 0 .948-3.795 5.452 5.452 0 0 0-1.353-3.376Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Bonnie Green
                      </span>{" "}
                      and{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        141 others
                      </span>{" "}
                      love your story. See it and view more stories.
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      44 minutes ago
                    </div>
                  </div>
                </a> 
                <a
                  href="#"
                  className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full w-11 h-11"
                      src="/docs/images/people/profile-picture-4.jpg"
                      alt="Leslie image"
                    />
                    <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-red-600 border border-white rounded-full dark:border-gray-800">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11 0h-1a5.06 5.06 0 0 0-5 5.045c0 .928-.029 1.856-.086 2.782a.504.504 0 0 1-.092.223L2.3 10.82a2.492 2.492 0 0 0-.3 2.49l1.6 3.594c.396.888.941 1.675 1.619 2.321V20h8v-1.775c.678-.646 1.223-1.433 1.62-2.321l1.598-3.594a2.492 2.492 0 0 0-.3-2.49l-3.522-2.77a.504.504 0 0 1-.092-.223 38.657 38.657 0 0 1-.086-2.782A5.06 5.06 0 0 0 11 0Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Leslie Livingston
                      </span>{" "}
                      mentioned you in a comment:{" "}
                      <span className="font-medium text-blue-600 dark:text-blue-500">
                        @bonnie.green
                      </span>{" "}
                      what do you say?
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      1 hour ago
                    </div>
                  </div>
                </a> 
                <a
                  href="#"
                  className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full w-11 h-11"
                      src="/docs/images/people/profile-picture-5.jpg"
                      alt="Robert image"
                    />
                    <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-red-600 border border-white rounded-full dark:border-gray-800">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm7-3a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2H9v2a1 1 0 1 1-2 0v-2H5a1 1 0 1 1 0-2h2V6a1 1 0 0 1 1-1Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Robert Brown
                      </span>{" "}
                      posted a new video:{" "}
                      <span className="font-medium text-blue-600 dark:text-blue-500">
                        A day in the life
                      </span>
                      .
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      3 hours ago
                    </div>
                  </div>
                </a> 
              </div>
             <a
                href="#"
                className="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <div className="inline-flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 14"
                  >
                    <path d="M10 0C4.486 0 0 3.355 0 7.5S4.486 15 10 15s10-3.355 10-7.5S15.514 0 10 0Zm0 13a9.128 9.128 0 0 1-8.855-5.882c1.165-2.176 4.06-3.618 8.855-3.618s7.69 1.442 8.855 3.618A9.128 9.128 0 0 1 10 13Zm0-10a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5ZM10 7a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 10 7Z" />
                  </svg>
                  View all
                </div>
              </a> 
            </div>
          )}
        </div> */}

        <div className="flex justify-end pr-4">
          <button
            id="dropdownAvatarNameButton"
            onClick={handleDropdownToggle}
            className="flex gap-2 items-center text-sm pe-1 font-medium text-gray-900 rounded-full dark:hover:text-blue-500 md:me-0  dark:focus:ring-gray-700 dark:text-white"
            type="button"
          >
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={ImgProfile} alt="Logo"/>

            <p className="">{nombres + " "+ apellidos}</p>
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              id="dropdownAvatarName"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-15 mt-9"
            >
              <div className="px-3 py-4 text-sm text-gray-900 dark:text-white">
                <div className="font-medium">Pro User</div>
                <div className="truncate">Jeffersubell@gmail.com</div>
              </div>

              <div className="py-2">
                <a
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
        {/* <div className="flex justify-end pr-4 py-0">
          <Toggle />
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
