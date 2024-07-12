import React, { useState } from "react";
import Logofondo from "../assets/images/fondo.webp";
import LogoHeader from "../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Account = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeLeft(20);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowSuccess(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div
      className="dark:text-white top-0 left-0 w-full bg-cover bg-center bg-no-repeat min-h-screen flex-col justify-center"
      style={{
        backgroundImage: `url(${Logofondo})`,
      }}
    >
      <div className="bg-white p-4 flex justify-center">
        <Link to="/">
          <img className="h-14" alt="logo"src={LogoHeader} />
        </Link>
      </div>

      <div className=" mt-14 md:mt-0 py-4 md:py-14 flex justify-center rounded-md">
        <form
          className="bg-white rounded-xl flex flex-col justify-center py-10 px-7 md:px-20 md:py-18 gap-4 w-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center">
            <label className="text-center text-2xl font-semibold">
              Reset Password
            </label>
            <label className="font-regular py-0 md:py-1 text-1xl md:text-title text-center mb-2">
              Enter the email address with your account
              <br />
              and we'll send an email with confirmation to
              <br />
              reset your password
            </label>
            <div className="relative flex">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                className="p-2 border border-gray-300 w-full rounded-full placeholder-gray-300 pl-10"
                type="text"
                required
                id="correo"
                placeholder="Example@gmail.com"
              />
            </div>
          </div>

          <button
            className="p-2 bg-black text-white rounded-xl transition"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
      {showSuccess && (
        <div
          role="alert"
          className="relative md:bottom-20  flex w-full max-w-screen-md px-4 py-4 text-base text-white bg-gray-900 rounded-lg font-regular mt-4"
        >
          <div className="shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-3 mr-12">
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
              Success
            </h5>
            <p className="block mt-2 font-sans text-base antialiased font-normal leading-relaxed text-white">
              If your email matches an existing account, we'll send you a
              username recovery email within minutes. If you have not received
              an email, please check your spam folder or contact Support.
            </p>
            <p className="block mt-2 font-sans text-base antialiased font-normal leading-relaxed text-white">
              This message will disappear in {timeLeft} seconds.
            </p>
          </div>
          <button
            className="absolute top-3 right-3 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30"
            type="button"
            onClick={() => setShowSuccess(false)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
