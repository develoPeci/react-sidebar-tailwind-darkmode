import React, { useState,useEffect } from "react";
import Layout from "../components/Layout";
import ProfileImg from "../assets/images/imgnofound.png";
import { IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import AppFirebase from "../firebase-config";
import fetchUserData from "../components/data"

const Account = () => {
  const auth = getAuth(AppFirebase);

  const [profileImg, setProfileImg] = useState(ProfileImg);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [dropdownOpenModal, setDropdownOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  
  const fetchData = async () => {
    try {
      const userAuth = auth.currentUser;
      console.log('userAuth', userAuth.uid);

      if (userAuth) {
        const userData = await fetchUserData(userAuth.uid);
        console.log('userData', userData);
        setUsers({ ...userData, uid: userAuth.uid });
      } else {
        console.log('No hay usuario autenticado.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  useEffect(() => {
  
    fetchData();
  }, []);


  // const maskPassword = (password)=>{
  //   return'*'.repeat(password.length)
  // };

//FunctionOpenDropdown
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
//Fuction openModal
  const handleModal = () => {
    setDropdownOpenModal(!dropdownOpenModal);
    setDropdownOpen(false);
  };
  //Function add img
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div id="profile" role="tabpanel">
            <div className="flex justify-end">
              
            </div>
            <div className="-mx-3 md:flex mb-6 ">
              
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="namepersonal"
                  disabled
                  type="text"
                  value={users.nombres}
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="Lastname"
                  disabled
                  type="text"
                  value={users.apellidos}
                />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Account Id
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  disabled
                  type="text"
                  value={users.uid}

                />
              </div>
              <div className="md:w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email Addres
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="email"
                  type="email"
                  disabled
                  required
                  Value={users.correo}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Phone Number
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="timeZone"
                  disabled
                  type="text"
                  value={users.telefono}
                />
              </div>
              <div className="md:w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Time Zone
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="timezone"
                  type="number"
                  disabled
                  required
                  value={users.timezona}
                />
              </div>
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div id="dashboard" role="tabpanel">
            <div className="bg-black px-4 py-8 rounded-xl flex flex-col  ">
              <p className="text-white text-3xl mb-8 font-semibold text-center md:text-left">
                Payment Method
              </p>
              <div className="flex flex-col  md:flex-row md:justify-between  py-0">
                <div className="flex flex-col gap-0 ">
                  <div>
                    <p className="text-white text-title font-semibold">
                      Payment Type
                    </p>
                    <p className="text-white">Visa</p>
                  </div>
                  <div>
                    <p className="text-white text-title font-semibold">
                      Account Number
                    </p>
                    <p className="text-white">*** *** *** 585</p>
                  </div>
                </div>

                <div className="bg-dorado flex flex-col justify-center items-center rounded-xl px-6 py-4">
                  <div className="py-5 px-4 text-2xl font-semibold">
                    <p>Next Payment Date</p>
                  </div>
                  <div className="text-center text-xl font-medium">
                    <p>05/08/2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <Link
                to="/MyAccount/PaymentMethod"
                className="flex justify-between border-b p-4 hover:bg-zinc-100"
              >
                <p className="text-title text-gray-500 font-semibold">
                  Change Payment Method
                </p>
                <IoArrowForwardOutline className="ml-2" />
              </Link>
              <Link
                to="/MyAccount/PastInvoices"
                className="flex justify-between p-4 hover:bg-zinc-100"
              >
                <p className="text-title text-gray-500 font-semibold">Past Invoices</p>
                <IoArrowForwardOutline className="ml-2" />
              </Link>
            </div>
          </div>
        );
      case "settings":
        return (
          <div id="settings" role="tabpanel">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Settings tab's associated content
              </strong>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div>
        <div className="my-3 mx-10">
          <p className="text-3xl text-zinc-600 dark:text-white text-center md:text-left font-semibold">
            My Account
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mx-4 gap-6">
     
          <div className="bg-white shadow-md dark:bg-slate-600 flex flex-col w-auto mb-12 px-6 rounded-2xl md:col-span-1">
            <div className="flex flex-col justify-center items-center">
              <img
                className="inline-block h-40  w-40 rounded-full mt-4"
                src={profileImg}
                alt="Profile"
              />
              <label
                htmlFor="profileImgInput"
                className="mt-2 text-blue-500 cursor-pointer"
              >
                Change Image
              </label>
              <input
                id="profileImgInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div>
                <p className="text-2xl  font-semibold mt-2 mb-2">
              {users.nombres + " "+ users.apellidos}         
             </p>
              </div>
            </div>

            <div className="my-12 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="border-b border-400">
                  <p className="text-1xl text-zinc-500 font-semibold dark:text-white">
                    Email Address
                  </p>
                </div>
                <div>
                  <p className="text-1xl text-zinc-400 dark:text-white">
                  {users.correo}

                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="border-b border-400 flex justify-between items-center">
                  <p className="text-1xl text-zinc-500 font-semibold dark:text-white">
                    Password
                  </p>
                  <div>
                    <button
                      id="dropdownMenuIconButton"
                      onClick={handleDropdownToggle}
                      data-dropdown-toggle="dropdownDots"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 4 15"
                      >
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div
                        id="dropdownDots"
                        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600  absolute md:top-120 md:left-auto"
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownMenuIconButton"
                        >
                          <li>
                            <button
                              data-modal-target="authentication-modal"
                              onClick={handleModal}
                              data-modal-toggle="authentication-modal"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Update Password
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                    {dropdownOpenModal && (
                      <div
                        id="authentication-modal"
                        tabIndex="-1"
                        aria-hidden={!dropdownOpenModal}
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
                      >
                        <div className="fixed inset-0 bg-darkGray opacity-60"></div>
                        <div className="relative p-4 w-full max-w-md max-h-full">
                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                              <h3 className="text-title font-semibold text-black dark:text-white">
                                Update Password
                              </h3>
                              <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={handleModal}
                              >
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="p-4 md:p-5">
                              <form className="space-y-4" action="#">
                                <div>
                                  <label
                                    htmlFor="New Password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    New Password
                                  </label>
                                  <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="*********"
                                    required
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Confirm password
                                  </label>
                                  <input
                                    type="password"
                                    name="password"
                                  
                                    placeholder="*********"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                  />
                                </div>

                                <button
                                  type="submit"
                                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                  Update
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-1xl text-zinc-400 dark:text-white">
                  {users.password}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md dark:bg-slate-600 flex flex-col w-auto mb-12 px-6 rounded-2xl md:col-span-2">
            <div className="mb-4 border-b border-gray-100 dark:border-gray-700">
              <ul
                className="flex flex-row -mb-px text-sm font-medium text-center"
                id="default-tab"
                role="tablist"
              >
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block md:px-8 py-5 border-b-2 w-full rounded-t-lg transition-all duration-400 ease-in-out ${
                      activeTab === "profile"
                        ? "border-black text-black font-bold dark:text-blue-300 scale-105 "
                        : "border-transparent opacity-70"
                    }`}
                    id="profile-tab"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected={activeTab === "profile"}
                    onClick={() => setActiveTab("profile")}
                  >
                    Personal Information
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block md:px-8 py-5 border-b-2 w-full rounded-t-lg transition-all duration-400 ease-in-out ${
                      activeTab === "dashboard"
                        ? "border-black text-black font-bold dark:text-blue-300 scale-105"
                        : "border-transparent opacity-70"
                    }`}
                    id="dashboard-tab"
                    type="button"
                    role="tab"
                    aria-controls="dashboard"
                    aria-selected={activeTab === "dashboard"}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    Billing Information
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block md:px-8 py-5 border-b-2 rounded-t-lg transition-all duration-400 ease-in-out ${
                      activeTab === "settings"
                        ? "border-black text-black font-bold dark:text-blue-300 scale-105"
                        : "border-transparent opacity-70"
                    }`}
                    id="settings-tab"
                    type="button"
                    role="tab"
                    aria-controls="settings"
                    aria-selected={activeTab === "settings"}
                    onClick={() => setActiveTab("settings")}
                  >
                    Subscription Information
                  </button>
                </li>
              </ul>
            </div>
            <div className="my-2">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
